---
entry_date: 2026-03-28
author: Lucas Challamel
focus_area: 4-language translations, DNS migration, contact form debugging, CTA standardisation
status: complete
session_duration: ~6 hours (ongoing)
tags: [i18n, italian, translations, dns, cloudflare, resend, turnstile, cta, opera-fix, visual-assets, diagrams, css]
---

## Why (High-Level Context)

Day 2 of development. The FR content was complete from the previous session. This session focused on making the site fully quadrilingual, resolving DNS/email infrastructure, debugging the contact form end-to-end, and standardising the CTA banners across all pages.

**Session Objectives**:

- Add Italian as 4th language
- Translate all enriched FR content to DE, EN, IT
- Complete DNS migration from Infomaniak to Cloudflare
- Debug and fix the contact form (Resend + Turnstile)
- Add phone number and LinkedIn to all CTA banners
- Fix cross-browser rendering issue (Opera)

**Related Work**:

- Previous entry: 2026-03-27-content-scaffolding-palette-teal.md
- ADR-002: Cloudflare full stack
- ADR-003: Resend + Turnstile

---

## How (The Journey)

### 1. Italian Language Addition

Added Italian as 4th language across the entire stack:

- `astro.config.mjs`: added `'it'` to locales array
- `src/i18n/it.json`: full translation of all UI strings, nav labels, form fields, podcast descriptions
- `src/i18n/index.ts`: updated languages map, `getLangFromUrl()`, route map with IT slugs
- `BaseLayout.astro`: updated section map for IT slug normalisation, language regex
- Route structure: `/it/`, `/it/servizi/`, `/it/chi-sono/`, `/it/contatto/`, `/it/blog/`, `/it/pubblicazioni/`, `/it/note-legali/`
- 10 Italian pages created (home, services x4, blog, publications, about, contact, legal)
- Podcast descriptions added in Italian for all 5 series
- Language switcher: `FR | DE | EN | IT`

**Translation style**: formal "voi" form for Italian, Swiss German spelling (ss not sz) for German, British/Australian English.

### 2. About Page Enhancements

- Updated positioning: "Trilingue, triculturel, global"
- Added France, Australie, Suisse narrative
- Added offshore team leadership experience: Ukraine, Vietnam, Malaysia
- Anonymised references: "Infostrates" -> "Agence digitale", "Process Creative" -> "Societe de conseil en e-commerce"
- Anonymised quotes: removed personal names, kept roles ("Le Directeur General", "Le CEO")
- UBank quotes kept with full names (Rohan Anderson, Lee Hatton) - public references

### 3. White Paper Cover Image

- Imported `wp_ai_sovereignty_ch.webp` (54 KB) as publications cover
- Replaced placeholder SVG/emoji on FR, DE, EN publications pages
- Astro Image component with quality 90, width 500

### 4. Complete Content Translation (DE/EN/IT)

Deployed a background agent to translate all 8 FR content pages to 3 languages (24 target files):

**Pages translated**:
- Home (103 lines) - all 3 languages identical structure
- About (434 lines) - portrait, career timeline, case studies, methodology, values
- Services index - enriched descriptions with methodology names
- AI Governance (319 lines) - sovereignty spectrum, FinOps, DADA framework, certifications, packages
- Team Performance (313 lines) - Coach-Craft, SDD pyramid, pain points, MetricBar charts, packages
- Executive Coaching (282 lines) - role evolution, strategic questions, NAB results, packages
- Publications - white paper cover, upcoming essays, blog/Substack CTA
- Legal - placeholder content

**Translation quality decisions**:
- German: Swiss spelling throughout (ss not sz)
- Italian: formal voi form consistently
- English: British/Australian spelling (organisation, programme)
- Brand names, technical terms, CHF amounts unchanged
- Original English quotes from UBank kept unchanged across all languages
- All href links point to correct language-specific routes

**Result**: 40 pages total (10 per language), 2560 lines added

### 5. DNS Migration (Infomaniak -> Cloudflare)

**Problem**: nameservers were still pointing to Infomaniak despite previous configuration attempt.

**Root cause**: DNSSEC was enabled at Infomaniak, preventing clean delegation. Also, the nameservers had not been changed in the Infomaniak registrar settings (only the DNS zone was modified).

**Fix**:
1. Disabled DNSSEC at Infomaniak
2. Changed nameservers via Infomaniak registrar: `nsany1.infomaniak.com` -> `nova.ns.cloudflare.com` + `osmar.ns.cloudflare.com`
3. Waited for propagation (confirmed via `dig NS valeris.fr`)
4. Connected custom domain in Cloudflare Pages (Workers & Pages > valeris-website > Custom domains)
5. Cloudflare created CNAME `@` -> `valeris-website.pages.dev` (CNAME flattening)
6. Added `www.valeris.fr` as second custom domain
7. Set `autoconfig` and `autodiscover` CNAME records to DNS only (grey cloud) for KSuite email compatibility

**Email preservation**: MX records (`mta-gw.infomaniak.ch`), SPF, DKIM, DMARC all preserved. KSuite email continues to work.

**Result**: `valeris.fr` and `www.valeris.fr` now serve the site via Cloudflare Pages with automatic SSL.

### 6. Resend Domain Verification

**Problem**: contact form returning 403 "domain not verified" from Resend API.

**Root cause**: Resend's DKIM record (`resend._domainkey`) was not resolving because legacy NS records for `_domainkey` subdomain were delegating to Infomaniak nameservers, overriding the TXT record in Cloudflare.

**Fix**:
1. Deleted NS records for `_domainkey` -> `nsany1/nsany2.infomaniak.com` in Cloudflare DNS
2. TXT record `resend._domainkey` became visible
3. Resend verification progressed: Domain added -> DNS verified -> Verifying domain

**Also fixed**: erroneous secret `re_DzrktzGM_...` that was stored as a secret name instead of RESEND_API_KEY value. Deleted it and re-configured correctly.

### 7. Contact Form Debugging

**Issue 1**: Turnstile token `timeout-or-duplicate` error.
- Cause: token expires after 5 minutes, or is used twice
- Fix: added `turnstile.reset()` after every submission attempt (success, error, and catch blocks)
- Also added detailed error responses from Worker for debugging

**Issue 2**: Resend returning 403 "domain not verified".
- Cause: see section 6 above
- Fix: DNS records corrected, domain verification in progress

**Improvements to Worker** (`functions/api/contact.ts`):
- Added Turnstile error codes in response (`details` field)
- Added Resend error status and body in response
- Better console.error logging for server-side debugging

### 8. Opera Browser Compatibility Fix

**Problem**: List component text not visible in Opera - only checkmark icons shown, no text beside them.

**Cause**: complex Tailwind v4 `@apply` selectors (`[&_li]:flex [&_li]:items-start [&_li]:gap-2 [&_svg]:h-6`) not generating correctly in some browsers.

**Fix**: replaced all `@apply` in `List.astro` with native CSS (flexbox, gap, sizing). Works consistently across all browsers.

### 9. CTA Banner Standardisation

**Problem**: 28 pages had inline CTA banners with duplicated code, no phone number, no LinkedIn link.

**Solution**:
- Created `src/components/CtaBanner.astro` shared component
- Includes: phone `+41 78 222 31 59` (tel: link, Cerebri Sans Bold), LinkedIn button, Contact button
- Language-aware: accepts `lang` prop, generates correct contact page link
- Python script replaced all 28 inline CTA sections with `<CtaBanner lang="xx" />`
- Result: -584 lines removed, +379 lines added (net -205 lines of duplication)

**ContactForm header** also updated with phone and LinkedIn.

---

## Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Italian as 4th language | Added IT with /it/ prefix | Cover Tessin, demonstrate Swiss coverage |
| Formal voi for Italian | Not tu | Professional consulting context |
| Anonymise non-public refs | "Agence digitale", "Le CEO" | Privacy, avoid naming without permission |
| Keep UBank names | Rohan Anderson, Lee Hatton | Public references, on LinkedIn |
| Shared CtaBanner component | Replace 28 inline CTAs | DRY, single place to update phone/LinkedIn |
| Native CSS for List component | Not @apply with variants | Opera compatibility |
| Disable DNSSEC before NS change | Then re-enable in Cloudflare | Prevent resolver rejection during transition |
| Delete _domainkey NS records | Remove Infomaniak delegation | Allow Cloudflare to serve Resend DKIM directly |

### 10. Visual Assets - Sprint A & B

Audit complet du site (7 pages FR) pour identifier les gaps visuels, puis inventaire de 91 assets existants dans 3 repertoires source (white papers sovereignty + governance, OCSIN coaching assets). Document de recommandations produit a `Website/01_visual_assets_recommendations.md`.

**Sprint A (CSS/SVG, implemente)** :
- Icones service (shield, chart, academic-cap) sur les 3 cartes home page (SVG inline)
- Diagramme "3 altitudes" pyramide teal (CSS Tailwind) sur `/services/`
- Pipeline protection donnees 4 etapes (CSS grid) sur `/services/gouvernance-ia/`
- Pyramide inversee Specs/Tests/Code (CSS) sur `/services/performance-equipes/`
- Evolution role CTO Orchestrateur -> Ingenieur Systeme (CSS 2 cartes + fleche) sur `/services/coaching-executif/`
- Logos clients NAB, UBank, Infostrates, Process Creative (PNG grayscale) sur `/a-propos/`
- Placeholder couverture livre blanc (SVG + gradient teal) sur `/publications/`

**Sprint B (composants + enrichissements, implemente)** :
- Composant reutilisable `MetricBar.astro` (barres de progression avant/apres)
- Spectre souverainete (gradient 3 zones : bleu/teal/teal fonce) sur `/services/gouvernance-ia/`
- Barres MetricBar x4 (Infostrates : tests, regressions, lead time, dette) sur `/services/performance-equipes/`
- Barres MetricBar x4 (NAB : engagement, productivite, turnover, time to market) sur `/services/coaching-executif/`
- Timeline carriere avec badges pays FR/AU/CH (CSS couleur par geographie) sur `/a-propos/`

**Sprint C (images de diffusion, en cours)** :
- Prompts Midjourney/DALL-E affines pour hero home page et couverture livre blanc
- Style cible : hexagones + lignes topographiques + points roses sur fond creme
- Lucas prepare les visuels de diffusion en parallele

**Reference DADA supprimee** : l'acronyme ne correspondait pas aux 4 etapes (D-T-A-A). Pipeline de protection des donnees conserve sans nom de marque.

---

## Final State & Next Steps

**Current State**:

- 40 pages in 4 languages (FR/DE/EN/IT), all with real translated content
- Site live at `valeris.fr` and `www.valeris.fr` via Cloudflare Pages
- Contact form: Turnstile working, Resend domain verification in progress
- Phone +41 78 222 31 59 and LinkedIn on every CTA banner and contact page
- KSuite email preserved (MX, SPF, DKIM, DMARC intact)

**Immediate Next Steps**:

- [ ] Integrer les visuels de diffusion generes par Lucas (hero home, couverture livre blanc)
- [ ] Verify Resend domain is fully verified, test contact form end-to-end
- [ ] Test email delivery (send test submission, check inbox)
- [ ] Mobile hamburger menu (nav hidden on mobile)
- [ ] Cal.com booking widget integration
- [ ] Legal page real content (nDSG, CGU)
- [ ] Lighthouse optimisation (target 95+)
- [ ] Professional photo retouching
- [ ] German translation review by native Swiss-German speaker
- [ ] Italian translation review by native speaker

**Knowledge Captured**:

- Infomaniak DNSSEC must be disabled before changing nameservers to Cloudflare
- Infomaniak legacy NS records for subdomains (e.g. `_domainkey`) can override Cloudflare TXT records - must be deleted
- Cloudflare Turnstile tokens are single-use and expire after 5 minutes - always call `turnstile.reset()` after submission
- Resend domain verification requires DKIM (TXT), SPF (TXT on `send` subdomain), and MX (on `send` subdomain)
- Complex `@apply` selectors in Tailwind v4 scoped styles can fail silently in some browsers - prefer native CSS for critical layout
- Python scripts are effective for bulk CTA replacement across 28+ files
- Background agent translation of 24 pages took ~18 minutes with 57 tool uses
- Visual asset audits should be done systematically (page by page, section by section) before creating anything
- CSS/Tailwind diagrams (pyramides, spectres, barres) sont suffisants pour la plupart des visualisations - pas besoin d'images
- MetricBar component is highly reusable across service pages
- For diffusion images: be very specific in prompts (hex colours, reference artists, negative constraints), iterate heavily
- Existing OCSIN/white paper figures (X2, X3, X4) are directly adaptable with palette swap

---

**Session Summary**: Made the site quadrilingual (FR/DE/EN/IT), completed DNS migration to Cloudflare, debugged contact form infrastructure, standardised CTA banners with phone and LinkedIn across all 40 pages. Implemented visual assets Sprint A+B (CSS diagrams, MetricBar component, client logos, spectre souverainete, timeline badges).

**Estimated Impact**: Very High

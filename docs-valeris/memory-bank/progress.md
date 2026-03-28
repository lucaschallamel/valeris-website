# Progress - Valeris Coaching Website

## Completed Milestones

### 2026-03-27 - Project Inception & Scaffolding
- [x] Architecture brainstorming, stack decision (Astro + Cloudflare Pages)
- [x] ADR-001, ADR-002, ADR-003
- [x] Astro 6.x, i18n, Foxi components, Tailwind v4, brand assets
- [x] Blog (31 articles from Substack, 5 podcast filters)
- [x] Contact form (Resend + Turnstile)
- [x] Teal palette + warm stone neutrals

### 2026-03-27 - Sprint 1: Real FR Content
- [x] About page: photo, career narrative, key numbers, timeline, certifications, references, methodology, values
- [x] AI Governance: 7-axis maturity model, sovereignty, AI FinOps, DADA, 4 packages
- [x] Team Performance: Coach-Craft, "Code is Cattle", SDD, SDLC Assessment, 5 packages
- [x] Executive Coaching: Vantaset Performance-OS, Augmented Scrum, 4 packages
- [x] Services index: enriched descriptions with methodology names

### 2026-03-28 - Sprint 2: Quadrilingual + Infrastructure
- [x] Italian added as 4th language (10 pages, full i18n)
- [x] All FR content translated to DE, EN, IT (30 translated pages, 2560 lines)
- [x] DNS migrated from Infomaniak to Cloudflare (nameservers, DNSSEC, custom domain)
- [x] Site live at valeris.fr and www.valeris.fr
- [x] KSuite email preserved (MX, SPF, DKIM, DMARC intact)
- [x] Resend DNS records fixed (deleted legacy _domainkey NS delegation)
- [x] Turnstile reset fix (token single-use handling)
- [x] Opera browser fix (List component native CSS)
- [x] White paper cover image on publications pages
- [x] About page: trilingue/triculturel, offshore teams, anonymised references
- [x] CtaBanner shared component: phone +41 78 222 31 59 + LinkedIn on all 28 pages
- [x] Worker error logging improved (Turnstile + Resend details)
- [x] 40 pages total, all building in ~2s

## Upcoming

### Sprint 3: Launch Polish (April 2026 Week 1)
- [ ] Test contact form end-to-end (Resend domain verification)
- [ ] Mobile hamburger menu
- [ ] Cal.com booking widget on contact page
- [ ] Legal page content (nDSG, CGU)
- [ ] Lighthouse optimisation (target 95+)
- [ ] Privacy-respecting analytics (Plausible/Fathom)

### Sprint 4: Review & Launch (April 2026 Week 2)
- [ ] German translation review by native speaker
- [ ] Italian translation review by native speaker
- [ ] Professional photo retouching
- [ ] Mobile responsive testing across devices
- [ ] Launch announcement
- [ ] Substack cross-promotion

## Technical Debt
- DE service pages slightly shorter than FR (agent kept existing partial content)
- 26 Foxi components not yet Tailwind v4 adapted (fix when used)
- Substack podcast mapping is manual (src/lib/podcasts.ts)
- No mobile navigation menu (hamburger) - critical for launch
- Publications lead capture flow not yet built (D1 + R2 + Resend)

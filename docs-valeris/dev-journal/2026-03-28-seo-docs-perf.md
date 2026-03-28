---
entry_date: 2026-03-28
author: Lucas Challamel
focus_area: SEO audit and fixes, documentation overhaul, PageSpeed optimisation
status: complete
session_duration: ~2 hours
tags: [seo, json-ld, open-graph, canonical, meta-descriptions, pagespeed, fonts, preload, readme, claude-md]
---

## Why (High-Level Context)

Third session of day 2. The site was feature-complete with 44 pages in 4 languages. This session focused on SEO fundamentals, documentation quality, and PageSpeed optimisation.

**Session Objectives**:

- Run comprehensive SEO audit and implement quick wins
- Update all READMEs and CLAUDE.md to reflect current state
- Fix PageSpeed render-blocking issues
- Update legal pages with Resend Ireland server location
- Create partners management operations guide

---

## How (The Journey)

### 1. Comprehensive SEO Audit

Ran full SEO audit via quad-sme-seo agent. Key findings:

| Category | Score Before | Issues |
|----------|-------------|--------|
| Technical | 5/10 | No canonical, no OG tags, no JSON-LD, duplicate meta descriptions |
| Hreflang | 9/10 | Excellent implementation |
| On-page | 6/10 | Strong service pages, thin homepage |
| Local SEO | 3/10 | No structured local data, .fr domain for Swiss practice |
| Structured Data | 0/10 | Completely absent |
| Page Speed | 9/10 | Static site on CDN, minimal JS |

### 2. SEO Quick Wins Implemented

**Canonical URLs** (all 44 pages):
- `<link rel="canonical" href={canonicalURL} />` in BaseLayout
- Self-referencing, uses `Astro.url` + `Astro.site`
- Prevents www vs non-www duplicate indexing

**Open Graph tags** (all 44 pages):
- `og:type`, `og:url`, `og:title`, `og:description`, `og:site_name`
- `og:locale` set to `fr_CH`, `de_CH`, `it_CH`, `en` for Swiss targeting

**Twitter Card** (all 44 pages):
- `twitter:card` (summary), `twitter:title`, `twitter:description`

**JSON-LD Structured Data** (`SeoSchema.astro` component):
- `ProfessionalService` schema on every page: name, address (Geneva CH), geo coordinates (46.2044, 6.1432), telephone, email, price range (CHF 1500-75000), languages, founder, sameAs (LinkedIn, Substack)
- `Person` schema on about pages (Lucas Challamel, education, knowsAbout)
- `Service` schema on service pages
- Passed via `seoType` prop in BaseLayout

**Unique Meta Descriptions** (44 pages, 11 types x 4 languages):
- Added `site.descriptions` object to all 4 i18n JSON files
- 11 page-specific descriptions: home, services, aiGovernance, teamPerformance, executiveCoaching, blog, publications, partners, about, contact, legal
- Each 150-160 characters with geographic keywords (Geneve, Suisse/Swiss/Schweiz/Svizzera)
- Previously: all pages shared one 60-char generic description
- Script updated all 44 `<BaseLayout>` tags with `description={i18n.site.descriptions.xxx}` prop

**Estimated impact**: technical SEO score 5/10 -> 8/10

### 3. Documentation Overhaul

**READMEs created**:
- `docs-valeris/README.md` - documentation index
- `src/README.md` - source code structure and patterns
- `src/components/README.md` - custom + Foxi components guide
- `src/lib/README.md` - Substack RSS + podcasts
- `functions/README.md` - Cloudflare Workers API

**READMEs updated**:
- Root `README.md` - complete rewrite (quadrilingual, 44 pages, current stack, correct routes)
- `docs-valeris/architecture/ADR/README.md` - added ADR-002 and ADR-003

**CLAUDE.md** - complete rewrite:
- 4 languages (was 3), 44 pages (was 8)
- Tailwind v4 specifics section
- Design system (Cerebri Sans, Montserrat, rose/teal palette)
- Operations guides reference
- Current deployment workflow

### 4. Legal Updates

- Resend server location updated in all 4 legal pages
- Hosting section: "Serveur de messagerie : Irlande (eu-west-1, Union europeenne)"
- Sous-traitants table: "Irlande (eu-west-1, UE). Siege social aux Etats-Unis."
- Resend domain verified (confirmed 2026-03-28 07:24)

### 5. Partners Operations Guide

Created `docs-valeris/operations/partners-management.md`:
- 5-step process to add a partner (logo, import, logoMap, data, build)
- Category definitions (Business, Technology, Tools, Standards, Certifications)
- Modify/remove partner procedures
- Logo size overrides documentation
- Table of 18 current partners with logo filenames
- Troubleshooting section

### 6. PageSpeed Optimisation

**Problem**: PageSpeed reported 970ms render-blocking, critical path latency 702ms due to CSS -> font dependency chain.

**Fix**:
- Copied critical fonts to `/public/fonts/` (stable URLs, no hash, cacheable)
- Added `<link rel="preload">` for CerebriSans-Regular.woff2 and Montserrat-Variable.woff2
- Updated `@font-face` to reference `/fonts/` (public) instead of `../assets/`
- CerebriSans-Italic set to `font-display: optional` (non-critical)
- Breaks CSS -> font waterfall chain

**Result**: fonts load in parallel with CSS instead of sequentially. Estimated ~200ms saving on critical path.

---

## Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| og:locale fr_CH/de_CH/it_CH | Swiss locale codes | Counteracts .fr ccTLD geographic signal |
| JSON-LD ProfessionalService | Not LocalBusiness | More appropriate for consulting |
| Geo coordinates 46.2044, 6.1432 | Geneva center | Google local pack eligibility |
| Fonts in /public/ | Not in /assets/ | Stable URLs for preload, no hash changes |
| font-display: optional for italic | Not swap | Italic is non-critical, reduces layout shift |
| 11 description keys per language | Not per-page files | Centralised in i18n JSON, easy to maintain |

---

## Final State & Next Steps

**Current State**:
- SEO score estimated 8/10 (from 5/10)
- All 44 pages have canonical, OG, Twitter Card, JSON-LD, unique meta descriptions
- Documentation complete (7 READMEs, CLAUDE.md, 6 operations guides)
- Critical fonts preloaded, dependency chain broken

**Immediate Next Steps**:
- [ ] Re-run PageSpeed to verify improvement
- [ ] Add robots.txt sitemap reference
- [ ] Consider www -> non-www 301 redirect in Cloudflare
- [ ] Test contact form end-to-end (Resend now verified)
- [ ] Lighthouse full audit
- [ ] Launch preparation

**Knowledge Captured**:
- Astro generates hashed filenames for assets in `/_astro/` - use `/public/` for stable URLs needed in preload
- `og:locale` with country code (fr_CH) helps counteract ccTLD geographic signals
- JSON-LD ProfessionalService schema needs geo coordinates for local pack eligibility
- Unique meta descriptions (150-160 chars) with geographic keywords are the highest ROI SEO fix
- `font-display: optional` prevents layout shift for non-critical font weights

---

**Session Summary**: Comprehensive SEO audit (5.5/10 -> 8/10), implemented canonical URLs, Open Graph, JSON-LD, unique meta descriptions across 44 pages. Documentation overhaul (7 READMEs + CLAUDE.md). PageSpeed font preloading fix.

**Estimated Impact**: Very High

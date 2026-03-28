# Progress - Valeris Coaching Website

## Completed Milestones

### 2026-03-27 - Project Inception & Scaffolding
- [x] Architecture, stack, ADRs, Foxi components, blog, contact form, teal palette

### 2026-03-27 - Sprint 1: Real FR Content
- [x] About, services x4, publications - all with real content from CV and commercial offers

### 2026-03-28 - Sprint 2: Quadrilingual + Infrastructure
- [x] Italian 4th language, all content translated (DE/EN/IT), DNS migration, contact form debug

### 2026-03-28 - Sprint 3: Partners, Legal, Visuals
- [x] **Partners page**: 18 partners (Talan, RegData, Cloudflare, Resend, Infomaniak, Azure, Apple, Astro, OpenCode, Anthropic, NVIDIA, Ollama, Obsidian, TOGAF, ISO 42001, GAICC, IAPP, ICF)
- [x] 5 categories (Business, Technology, Tools, Standards, Certifications)
- [x] PartnersGrid shared component with logos, filters, 4 languages
- [x] 18 logos normalised and copied
- [x] All partner URLs verified
- [x] **Legal page**: Complete mentions legales (LCEN), politique de confidentialite (nLPD + RGPD), conditions d'utilisation, zero cookies declaration
- [x] SIRET 419 129 101 00038, 1 rue Jean Jaures, 74500 Evian-les-Bains
- [x] Legal page translated to DE, EN, IT
- [x] **Visual assets Sprint A**: Icons, 3-altitudes diagram, data protection pipeline, Specs/Tests/Code pyramid, CTO role evolution, client logos, WP cover placeholder
- [x] **Visual assets Sprint B**: MetricBar component, sovereignty spectrum, progress bars (Infostrates + NAB), career timeline with country badges
- [x] **Service enrichment**: AI FinOps, data protection pipeline, Coach-Craft 4 steps, "Code is Cattle", 4 legacy pain points, SDLC Assessment, Vantaset Performance-OS, system engineering insight, Augmented Scrum
- [x] **Reference DADA supprimee** (acronyme incoherent)

### 2026-03-28 - Sprint 3b: Mobile, Translations Audit, Polish
- [x] **Mobile hamburger menu**: slide-down panel, service sub-items, language switcher, active section highlighting
- [x] **DE/IT service pages completed to 100%**: systematic audit, all sections/diagrams/packages now match FR
- [x] **Watermark filigrane**: valeris-icon-black.svg, 2.5% opacity, centered, fixed
- [x] **Contact form**: whitepaper option (4 languages), Turnstile reset fix, error logging
- [x] **External links**: all open in new tab with rel="noopener noreferrer"
- [x] **Opera fix**: List component native CSS
- [x] **White paper cover**: wp_ai_sovereignty_ch.webp on FR/DE/EN publications
- [x] **About page**: trilingue/triculturel, offshore teams, anonymised references, removed logos
- [x] 44 pages, all deployed to valeris.fr

### 2026-03-28 - Sprint 3c: SEO, Documentation, PageSpeed
- [x] **SEO audit**: comprehensive analysis (score 5.5/10 before)
- [x] **Canonical URLs**: self-referencing on all 44 pages
- [x] **Open Graph**: og:type, og:url, og:title, og:description, og:site_name, og:locale (fr_CH/de_CH/it_CH/en)
- [x] **Twitter Card**: summary card on all pages
- [x] **JSON-LD**: ProfessionalService (address Geneva, geo, phone, price range, languages, founder)
- [x] **Person schema** on about pages, **Service schema** on service pages
- [x] **Unique meta descriptions**: 11 page types x 4 languages (150-160 chars with geographic keywords)
- [x] **SeoSchema.astro** component created
- [x] **Documentation**: 7 READMEs created/updated, CLAUDE.md complete rewrite
- [x] **Partners operations guide** created
- [x] **Resend Ireland** (eu-west-1) documented in legal pages (4 languages)
- [x] **PageSpeed**: critical fonts preloaded (/public/fonts/), CSS->font chain broken
- [x] Estimated SEO score: 5.5/10 -> 8/10

## Upcoming

### Sprint 4: Launch Polish (April 2026 Week 1)
- [ ] Test contact form end-to-end (Resend verified)
- [ ] Add robots.txt sitemap reference
- [ ] www -> non-www redirect in Cloudflare
- [ ] Lighthouse full audit
- [ ] Cal.com booking widget
- [ ] Privacy-respecting analytics (Plausible/Fathom)

### Sprint 5: Review & Launch (April 2026 Week 2)
- [ ] German translation review by native speaker
- [ ] Italian translation review by native speaker
- [ ] Mobile responsive testing across devices
- [ ] Launch announcement + Substack cross-promotion

## Technical Debt
- 26 Foxi components not yet Tailwind v4 adapted (fix when used)
- Substack podcast mapping is manual
- Publications lead capture flow not yet built (D1 + R2 + Resend)
- Some partner logos low-res
- robots.txt sitemap reference missing
- www vs non-www redirect not configured

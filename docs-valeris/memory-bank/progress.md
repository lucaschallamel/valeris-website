# Progress - Valeris Coaching Website

## Completed Milestones

### 2026-03-27 - Project Inception

- [x] Architecture brainstorming with 3 specialised agents
- [x] Stack decision: Astro + Cloudflare Pages
- [x] Architecture Decision Records (ADR-001, ADR-002)
- [x] UX structure defined (navigation, conversion strategy)
- [x] Business strategy alignment validated
- [x] Repository initialised with documentation framework
- [x] Memory bank populated

## Current Sprint

**Sprint 0: Scaffolding** (March 2026) - COMPLETE

- [x] Git repository initialised
- [x] CLAUDE.md, README.md written
- [x] Astro 6.x project initialised (TypeScript strict)
- [x] i18n configured (FR at root, DE/EN under prefix)
- [x] Cloudflare Pages connected and deploying
- [x] GitHub remote connected and pushing
- [x] DNS transferred from Infomaniak to Cloudflare
- [x] First commit: `064ef0b`

**Sprint 0.5: Design System + Integrations** (March 2026) - COMPLETE

- [x] Tailwind CSS v4, Sitemap, MDX integrations installed
- [x] Brand assets imported (logos SVG optimised, fonts WOFF2 converted)
- [x] Foxi component library imported (25+ UI components, 15+ blocks)
- [x] Foxi components adapted for Tailwind v4 (Section, Row, Col, Button)
- [x] Layout rebuilt with Tailwind utilities (header, footer, nav)
- [x] Services dropdown menu with 3 service links
- [x] Active section highlighting (rose pill)
- [x] Blog page with Substack RSS federation (20 articles, 5 podcast filters)
- [x] Blog/Publications pages created (FR/DE/EN)
- [x] Contact form built (trilingual, 9 fields, Turnstile captcha)
- [x] Cloudflare Pages Function for contact form (`/api/contact`)
- [x] Resend configured (API key, domain verified with DNS)
- [x] Cloudflare Turnstile configured (site key + secret key)
- [x] 30 pages building in ~1.3s

## Upcoming

### Sprint 1: Content + Launch (April 2026 Week 1-2)

- [ ] Deploy and test contact form end-to-end
- [ ] Custom domain valeris.fr connected
- [ ] Write real FR content (home hero, services x3, about, contact)
- [ ] Translate content to DE and EN
- [ ] Build publications page with lead capture (D1 + R2 + Resend)
- [ ] Mobile hamburger menu
- [ ] Cal.com booking widget on contact page

### Sprint 2: Polish & Launch (April 2026 Week 3)

- [ ] Professional headshot integration
- [ ] Mobile responsive testing
- [ ] Lighthouse optimisation (target 95+)
- [ ] SSL verification
- [ ] Privacy-respecting analytics (Plausible/Fathom)
- [ ] Launch

## Technical Debt

- 26 Foxi components with Tailwind v3 responsive `@apply` not yet adapted for v4 (only fix when used)
- Substack podcast mapping is manual (`src/lib/podcasts.ts`) - new articles need slug added
- No mobile navigation menu (hamburger) yet

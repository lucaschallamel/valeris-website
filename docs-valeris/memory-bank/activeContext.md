# Active Context - Valeris Coaching Website

## Current Phase

**Phase 2: Launch Preparation** (March-April 2026) - SEO optimised, documentation complete, ready for final polish

## Current Focus

- 44 pages live in 4 languages, all with full SEO (canonical, OG, JSON-LD, unique meta descriptions)
- Site live at valeris.fr via Cloudflare Pages
- Resend domain verified, contact form ready for e2e test
- PageSpeed: fonts preloaded, dependency chain broken
- Documentation complete (7 READMEs, CLAUDE.md, 6 operations guides, 8 dev journal entries)

## Recent Decisions

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-28 | JSON-LD ProfessionalService on all pages | Rich results, local pack eligibility |
| 2026-03-28 | og:locale fr_CH/de_CH/it_CH | Counteracts .fr ccTLD geographic signal |
| 2026-03-28 | 11 unique meta descriptions per language | 150-160 chars with geographic keywords |
| 2026-03-28 | Fonts in /public/ with preload | Stable URLs, breaks CSS->font chain |
| 2026-03-28 | Resend server Ireland (eu-west-1) documented | Legal compliance, EU data residency |

## Next Steps

1. ~~SEO quick wins~~ (done)
2. ~~Documentation overhaul~~ (done)
3. ~~PageSpeed fonts~~ (done)
4. ~~Cal.eu booking~~ (done)
5. ~~SVG icons on all CTA buttons~~ (done, 4 languages)
6. ~~Bio updates~~ (done: 30 years, Master, DEA, UBP, PACA, photo caption)
7. ~~"Pourquoi Valeris?" etymology section~~ (done, 4 languages)
8. Complete CalDAV connection with Infomaniak KSuite
8. Test contact form end-to-end
9. Add robots.txt sitemap reference
10. Configure www -> non-www redirect in Cloudflare
11. Lighthouse full audit
12. Privacy-respecting analytics (Plausible/Fathom)
13. German and Italian translation review by native speakers
14. Launch announcement

## Blockers

- None currently

## Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| .fr domain for Swiss practice | Medium | og:locale fr_CH, JSON-LD address Geneva, content signals |
| German translation quality | Medium | Professional review needed |
| Italian translation quality | Medium | Professional review needed |

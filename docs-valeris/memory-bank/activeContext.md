# Active Context - Valeris Coaching Website

## Current Phase

**Phase 1: Content & Polish** (March-April 2026) - Content scaffolded, entering real content writing phase

## Current Focus

- All 30 pages scaffolded with full section structure (FR/DE/EN)
- Teal secondary palette + warm stone neutrals applied
- Teal CTA rectangles, teal blog/contact banners, teal feature icons
- Reduced section padding (~40% reduction from Foxi defaults)
- Footer with legal + contact links on all pages
- Ready for real content injection (CV, proposals, white paper)

## Recent Decisions

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-27 | Astro over Next.js | Static-first, Cloudflare native, zero JS |
| 2026-03-27 | Defer Payload CMS (ADR-002) | Payload Cloud closed (Figma acquisition) |
| 2026-03-27 | Cloudflare full stack | Workers + D1 + R2 + Resend for forms and lead capture |
| 2026-03-27 | prefixDefaultLocale: false | FR pages at root, DE/EN under prefix |
| 2026-03-27 | Foxi components imported (not cloned) | Preserve existing i18n routing |
| 2026-03-27 | Stay on Tailwind v4 | Future-proof, adapt Foxi components |
| 2026-03-27 | Substack RSS federation for blog | No content duplication, zero cost |
| 2026-03-27 | Resend + Turnstile for contact | Best DX, free tier, privacy-respecting |
| 2026-03-27 | Teal secondary palette (variant B) | Complementary to rose, warm stone neutrals, premium feel |
| 2026-03-27 | Teal CTA rectangles (not full-width) | Contained design, consistent across all pages |
| 2026-03-27 | Section padding reduced to 3.5rem | Foxi defaults too generous for advisory site |
| 2026-03-27 | Bold uppercase altitude labels | GOUVERNANCE / EXÉCUTION / LEADERSHIP in teal bold |

## Next Steps

1. ~~Connect GitHub remote and push~~ (done)
2. ~~Set up Cloudflare Pages deployment~~ (done)
3. ~~Choose and integrate typography~~ (done - Cerebri Sans + Montserrat)
4. ~~Set up contact form with Resend + Turnstile~~ (done, pending deploy test)
5. ~~Federate blog from Substack~~ (done)
6. ~~Scaffold content for all pages~~ (done)
7. ~~Establish teal palette~~ (done)
8. ~~Propagate to DE/EN~~ (done)
9. Inject real content (CV, proposals, white paper)
10. Deploy and test contact form end-to-end
11. Add custom domain valeris.fr (DNS propagation)
12. Build publications lead capture flow (D1 + R2 + Resend)
13. Add mobile hamburger menu
14. Implement Cal.com booking widget
15. Professional headshot photography

## Blockers

- None currently

## Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Content quality without real client experience | Medium | Lead with credentials and methodology, not claims |
| German translation quality | Medium | Professional review by native Swiss-German speaker |
| 26 Foxi components not yet Tailwind v4 adapted | Low | Fix when actually used, not blocking builds |

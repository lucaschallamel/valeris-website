# Active Context - Valeris Coaching Website

## Current Phase

**Phase 1: MVP Build** (March-April 2026) - Design system in place, entering content writing phase

## Current Focus

- Professional design with Foxi components + Valeris branding (30 pages, ~1.3s build)
- Blog federating 20 Substack articles with 5 podcast filters
- Contact form with Resend + Cloudflare Turnstile (backend ready, pending first deploy)
- Cloudflare Pages deployment pipeline operational
- DNS transfer to Cloudflare in progress (valeris.fr)

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
| 2026-03-27 | Resend for email | Best DX, free tier, domain verified |
| 2026-03-27 | Cloudflare Turnstile for captcha | Free, privacy-respecting, native integration |
| 2026-03-27 | Domain is valeris.fr (not .ch) | Registered at Infomaniak, DNS at Cloudflare |

## Next Steps

1. ~~Connect GitHub remote and push~~ (done)
2. ~~Set up Cloudflare Pages deployment~~ (done)
3. ~~Choose and integrate typography~~ (done - Cerebri Sans + Montserrat)
4. ~~Set up contact form with Resend + Turnstile~~ (done, pending deploy test)
5. ~~Federate blog from Substack~~ (done)
6. Deploy and test contact form end-to-end
7. Add custom domain valeris.fr (DNS propagation)
8. Write real content for FR service pages
9. Translate content to DE and EN
10. Build publications page with lead capture flow (D1 + R2 + Resend)
11. Add mobile hamburger menu
12. Implement Cal.com booking widget
13. Professional headshot photography

## Blockers

- Cloudflare Pages API intermittent 504 (temporary, retrying)

## Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Content quality without real client experience | Medium | Lead with credentials and methodology, not claims |
| German translation quality | Medium | Professional review by native Swiss-German speaker |
| 26 Foxi components not yet Tailwind v4 adapted | Low | Fix when actually used, not blocking builds |

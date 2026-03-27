# Active Context - Valeris Coaching Website

## Current Phase

**Phase 0: Project Setup** (March 2026) - Scaffolding complete, entering content phase

## Current Focus

- Astro project initialised and building (25 pages, 542ms)
- Base layout with nav, footer, language switcher operational
- Stub pages in place for all 3 languages
- Ready for real content writing

## Recent Decisions

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-27 | Astro over Next.js | Static-first, Cloudflare native, zero JS, lower maintenance |
| 2026-03-27 | ~~Payload Cloud (free tier)~~ | ~~Zero maintenance CMS, SQLite, managed hosting~~ - superseded by ADR-002 |
| 2026-03-27 | Trilingual FR/DE/EN | FR for Romandie, DE for Swiss-German reach, EN for international |
| 2026-03-27 | MVP 8 pages per language | Minimal credibility anchor, no blog/case studies at launch |
| 2026-03-27 | prefixDefaultLocale: true | Even FR pages live at /fr/ - correct for a trilingual site |
| 2026-03-27 | Vanilla CSS with custom properties | No CSS framework yet, decision deferred until content is in place |
| 2026-03-27 | Defer Payload CMS (ADR-002) | Payload Cloud closed (Figma acquisition). Static content in repo for now |
| 2026-03-27 | Cloudflare full stack for forms | Workers + D1 + R2 + Resend for contact forms, lead capture, events |

## Next Steps

1. ~~Connect GitHub remote and push~~ (done)
2. Write real content for FR pages (hero complete, about, services)
3. Translate content to DE and EN
4. Implement full page sections (credibility strip, methodology, service detail blocks)
5. Integrate Cal.com booking widget on contact page
6. Choose and integrate typography (serif headings + Inter body)
7. Refine colour palette and responsive design
8. Set up Cloudflare Pages deployment
9. Set up Cloudflare Worker for contact form + Resend integration
10. Create lead capture flow for white papers (D1 + R2 + Resend)

## Blockers

- None currently

## Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Payload Cloud free tier limitations | Low | Self-hosted Railway fallback ($5/month) |
| Content quality without real client experience | Medium | Lead with credentials and methodology, not claims |
| German translation quality | Medium | Professional review by native Swiss-German speaker |

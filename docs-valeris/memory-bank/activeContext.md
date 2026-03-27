# Active Context - Valeris Coaching Website

## Current Phase

**Phase 0: Project Setup** (March 2026)

## Current Focus

- Project scaffolding and repository structure
- Architecture decisions documented
- Documentation framework in place

## Recent Decisions

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-27 | Astro over Next.js | Static-first, Cloudflare native, zero JS, lower maintenance |
| 2026-03-27 | Payload Cloud (free tier) | Zero maintenance CMS, SQLite, managed hosting |
| 2026-03-27 | Trilingual FR/DE/EN | FR for Romandie, DE for Swiss-German reach, EN for international |
| 2026-03-27 | MVP 8 pages per language | Minimal credibility anchor, no blog/case studies at launch |

## Next Steps

1. Initialise Astro project (`npm create astro@latest`)
2. Configure i18n routing (FR/DE/EN)
3. Set up Payload CMS schemas
4. Create base layout and components
5. Write content (FR first, then DE and EN)
6. Set up Cloudflare Pages deployment
7. Configure GitHub Actions webhook pipeline

## Blockers

- None currently

## Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Payload Cloud free tier limitations | Low | Self-hosted Railway fallback ($5/month) |
| Content quality without real client experience | Medium | Lead with credentials and methodology, not claims |
| German translation quality | Medium | Professional review by native Swiss-German speaker |

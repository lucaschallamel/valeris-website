---
entry_date: 2026-03-27
author: Lucas Challamel
focus_area: Architecture pivot (no CMS), i18n routing fix, first Cloudflare Pages deployment
status: complete
session_duration: ~60 min
tags: [architecture, cloudflare, deployment, i18n, adr]
---

## Why (High-Level Context)

Third session of the day. The Astro scaffolding was complete. This session needed to resolve the CMS question (Payload Cloud is closed) and get the site live on Cloudflare Pages.

**Session Objectives**:

- Decide on CMS strategy given Payload Cloud closure
- Deploy the site to Cloudflare Pages
- Fix the root redirect issue (302 on `/` to `/fr/`)
- Connect the custom domain `valeris.fr`

**Related Work**:

- ADR-002: Static content, Cloudflare full stack
- Previous entry: 2026-03-27-astro-init.md

---

## How (The Journey)

### Payload CMS - deferred

Payload was acquired by Figma in June 2025. New Payload Cloud signups are paused. Self-hosting Payload on Cloudflare Workers + D1 is possible (~$5/month) but overkill for 8 pages updated weekly at most.

**Decision**: Defer Payload CMS entirely. Content stays as static files in the repo (Markdown/JSON). Documented in ADR-002.

### Cloudflare full stack for dynamic features

Instead of a CMS, the architecture now uses Cloudflare's free tier stack for all dynamic needs:

- **Workers** - form handling (`/api/contact`, `/api/download`, `/api/register`)
- **D1** - lead storage (SQLite)
- **R2** - file storage (PDFs, white papers)
- **Resend** - transactional emails (confirmations, download links)

Total cost: ~CHF 1.50/month (domain only).

### First deployment to Cloudflare Pages

- Installed Wrangler as devDependency
- Connected via `wrangler login`
- Created Pages project: `wrangler pages project create valeris-website`
- Built and deployed: 24 pages uploaded in < 2 seconds
- Added `npm run deploy` script for one-command deploys

### i18n routing pivot - FR at root

The original setup used `prefixDefaultLocale: true`, meaning all French pages lived under `/fr/`. This caused a 302 redirect on the root URL, which is poor UX for the primary audience (Romandie).

**Changes**:

- `astro.config.mjs`: `prefixDefaultLocale: false`
- Moved all `src/pages/fr/*` to `src/pages/` (root level)
- Deleted `src/pages/fr/` directory
- Updated `src/i18n/index.ts`: route map now has FR paths without prefix
- Updated `getLangFromUrl()` to detect `de`/`en` segments, default to `fr`
- Updated BaseLayout hreflang: `x-default` points to root `/`

**Result**: `/` serves French content directly, `/de/` German, `/en/` English.

### Domain setup

- Domain is `valeris.fr` (not `.ch` as originally planned)
- Infomaniak does not support CNAME at zone root
- Transferred DNS nameservers from Infomaniak to Cloudflare (CNAME flattening)
- Propagation in progress

### Validation

- [x] `npm run build` passes: 24 pages in 479ms
- [x] Root `/` serves FR content directly (no redirect)
- [x] hreflang tags correct (fr -> `/`, de -> `/de/`, en -> `/en/`, x-default -> `/`)
- [x] Language switcher works across all pages
- [x] Site live at `valeris-website.pages.dev`
- [x] `npm run deploy` works end-to-end

---

## Final State & Next Steps

**Current State**:

- Site deployed on Cloudflare Pages (production URL active)
- 24 pages (8 FR at root + 8 DE + 8 EN)
- DNS transfer to Cloudflare in progress (valeris.fr)
- No CMS - content in static files
- Deploy pipeline: `npm run deploy`

**Immediate Next Steps**:

- [ ] Add `valeris.fr` as custom domain in Cloudflare Pages (once DNS propagates)
- [ ] Explore Astro themes, integrations, and styling options
- [ ] Write real content for FR pages
- [ ] Choose and integrate design system / CSS framework
- [ ] Set up Cloudflare Worker for contact form

**Knowledge Captured**:

- Payload Cloud closed since Figma acquisition (June 2025) - no new signups
- Payload can self-host on Cloudflare Workers + D1, but requires Workers Paid (~$5/month)
- Infomaniak does not allow CNAME at zone root - must transfer DNS to Cloudflare for CNAME flattening
- Astro `prefixDefaultLocale: false` is the right choice when one language dominates traffic
- `wrangler pages deploy dist/` is all that's needed to deploy static Astro to Cloudflare Pages

---

**Session Summary**: Pivoted architecture away from Payload CMS, deployed site to Cloudflare Pages, fixed i18n routing so French content serves at root.

**Estimated Impact**: High

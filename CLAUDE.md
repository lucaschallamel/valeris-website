# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Valeris Coaching Website** - a quadrilingual (FR/DE/EN/IT) static website for a premium solo technology advisory practice based in Geneva, Switzerland.

| Attribute | Value |
|-----------|-------|
| Owner | Lucas Challamel |
| Domain | valeris.fr (registrar: Infomaniak, DNS: Cloudflare) |
| Stack | Astro 6.x + Tailwind CSS v4 + Foxi components + Cloudflare Pages |
| Status | Phase 2: Polish & Launch |
| Pages | 44 (11 per language) |
| License | MIT |

## Architecture

```
Content (static files in repo)
  |
  | npm run deploy (astro build + wrangler pages deploy)
  v
Cloudflare Pages (static, global CDN)
  valeris.fr/*     (French, primary - root level)
  valeris.fr/de/*  (German)
  valeris.fr/en/*  (English)
  valeris.fr/it/*  (Italian)

Cloudflare Pages Functions (/api/*)
  └── POST /api/contact  (Turnstile + Resend email)

Resend         -> transactional emails (contact@valeris.fr)
Turnstile      -> captcha (site key: 0x4AAAAAACw1vy6U50c8ODeg)
Substack RSS   -> blog federation (build-time fetch)
```

### Key Decisions

- **Astro over Next.js**: Static-first, zero JS by default, native Cloudflare Pages adapter
- **No CMS**: Content as static files. Payload CMS deferred (Figma acquisition). See ADR-002
- **Cloudflare full stack**: Pages (hosting) + Workers (forms) + Turnstile (captcha). Free tier
- **Resend for email**: Domain valeris.fr verified. Free tier (100 emails/day)
- **Foxi components**: Adapted for Tailwind v4. See ADR-003
- **Substack RSS**: Blog federated from thecamelhall.substack.com at build time

### Architecture Decision Records

- ADR-001: `docs-valeris/architecture/ADR/ADR-001-astro-payload-cloudflare.md` (partially superseded)
- ADR-002: `docs-valeris/architecture/ADR/ADR-002-static-content-no-cms-cloudflare-stack.md`
- ADR-003: `docs-valeris/architecture/ADR/ADR-003-foxi-components-substack-resend-turnstile.md`

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | Astro | 6.x |
| Styling | Tailwind CSS (Vite plugin) | 4.x |
| Components | Foxi (adapted for TW v4) | - |
| Hosting | Cloudflare Pages | Free |
| Forms/API | Cloudflare Pages Functions | Free |
| Captcha | Cloudflare Turnstile | Free |
| Email | Resend | Free |
| Blog | Substack RSS federation | Free |
| DNS/SSL | Cloudflare | Free |
| Language | TypeScript | 5.x |
| Icons | astro-icon + Heroicons | - |

## Project Structure

```
valeris-website/
├── src/
│   ├── components/               # Shared components (CtaBanner, BlogGrid, ContactForm, PartnersGrid)
│   │   ├── ui/                   # Foxi UI primitives (Section, Row, Col, Button, List...)
│   │   └── blocks/               # Foxi page blocks (Hero, CTA, Features...)
│   ├── layouts/                  # BaseLayout (header, mobile menu, footer, i18n)
│   ├── pages/                    # FR pages (root) + /de/ + /en/ + /it/
│   │   ├── services/             # FR service pages
│   │   ├── de/                   # German pages
│   │   ├── en/                   # English pages
│   │   └── it/                   # Italian pages
│   ├── i18n/                     # fr.json, de.json, en.json, it.json + index.ts (routing)
│   ├── lib/                      # substack.ts (RSS), podcasts.ts (categorisation)
│   ├── data/                     # partners.ts (18 partners, 5 categories)
│   ├── assets/                   # Logos, fonts (WOFF2), images
│   ├── styles/                   # global.css (Tailwind v4 theme, fonts, watermark)
│   ├── config/                   # Site config, nav, analytics
│   └── icons/                    # Custom SVG icons
├── functions/api/                # Cloudflare Workers (contact.ts)
├── public/                       # Favicon (SVG/ICO/PNG), webmanifest
├── docs-valeris/                 # Documentation
│   ├── architecture/ADR/         # Architecture Decision Records
│   ├── dev-journal/              # Development session logs
│   ├── memory-bank/              # AI context (activeContext, progress)
│   └── operations/               # Technical guides (DNS, Resend, Turnstile, deployment, Substack)
└── .serena/                      # Serena code intelligence (versioned)
```

## Code Principles

- **[SF]** Simplicity First - 44-page static site, not a SaaS platform
- **[RP]** Readability Priority - clear, maintainable code
- **[DM]** Dependency Minimalism - minimal npm packages
- **[CA]** Clean Architecture - components, layouts, pages separation
- **[DRY]** Shared components (CtaBanner, BlogGrid, ContactForm, PartnersGrid) across all languages

## Content & i18n

- **4 languages**: French (primary, root), German (/de/), English (/en/), Italian (/it/)
- `prefixDefaultLocale: false` - FR pages at root, others under prefix
- Route map with localised slugs in `src/i18n/index.ts`
- UI strings in `src/i18n/{fr,de,en,it}.json`
- Language switcher: `FR | DE | EN | IT` in header (desktop) and mobile menu
- Active section highlighting: rose pill on current nav item
- German: Swiss spelling (ss not sz)
- Italian: formal "voi" form
- English: British/Australian spelling (en-AU)

## Development Commands

```bash
npm run dev          # Start Astro dev server (localhost:4321)
npm run build        # Build for production (44 pages, ~2s)
npm run deploy       # Build + deploy to Cloudflare Pages
npm run check        # Astro type checking
npm run format       # Prettier formatting
```

## Deployment

- `npm run deploy` builds and deploys to Cloudflare Pages
- Secrets configured via `wrangler pages secret put`
- Preview URL generated for each deployment

## Design System

### Typography
- Body: Cerebri Sans (WOFF2, subset Latin)
- Headings: Montserrat Variable (WOFF2, subset Latin)
- CSS: `font-sans` (Cerebri Sans), `font-headings` (Montserrat)

### Colour Palette
- Primary: rose/pink (`--color-primary-50` to `--color-primary-950`, base #FFA6C9)
- Secondary: teal (`--color-secondary-50` to `--color-secondary-950`, base #2d7a7a)
- Neutral: warm stone tones
- Watermark: valeris-icon-black.svg at 2.5% opacity

### Tailwind v4 Specifics
- `@reference "../../styles/global.css"` required in scoped `<style>` blocks
- Responsive `@apply` (lg:, md:, dark:) does NOT work in scoped styles - use native `@media`
- Dynamic class names not detected - use CSS custom properties (see Col.astro)
- Complex @apply selectors can fail in some browsers - prefer native CSS

### Content Rules
- Always use "I" language, never "we" (solo practice)
- CTA: phone +41 78 222 31 59, LinkedIn, "Reserver un echange"
- Price ranges on service pages (CHF, signals confidence)
- No em dashes or en dashes - use hyphens only

## British English

Use British/Australian English spelling (en-AU) throughout all documentation and English-language content.

## Directory Tree Formatting

When creating README files with directory tree structures, use box-drawing characters:
- `├──` for branch connections
- `│` for vertical lines
- `└──` for final branches

## Memory Bank

Documentation lives in `docs-valeris/memory-bank/`. Read ALL files at session start for full context. See `docs-valeris/memory-bank/README.md` for the file hierarchy and usage protocol.

## Operations Guides

Technical guides in `docs-valeris/operations/`:
- DNS & domain setup (Infomaniak/Cloudflare)
- Resend email configuration
- Cloudflare Turnstile captcha
- Substack RSS integration
- Deployment guide with secrets management

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Valeris Coaching Website** - a trilingual (FR/DE/EN) static website for a premium solo technology advisory practice based in Geneva, Switzerland.

| Attribute | Value |
|-----------|-------|
| Owner | Lucas Challamel |
| Domain | valeris.ch (Infomaniak) |
| Stack | Astro + Payload CMS 3.x + Cloudflare Pages |
| Status | MVP Development (Phase 0) |
| License | MIT |

## Architecture

```
Payload CMS (Payload Cloud, SQLite, headless)
  |
  | webhook on publish
  v
GitHub Actions -> astro build -> fetch content from Payload REST API
  |
  v
Cloudflare Pages (static, global CDN)
  valeris.ch/fr/*  (French, primary)
  valeris.ch/de/*  (German, secondary)
  valeris.ch/en/*  (English, tertiary)
```

### Key Decisions

- **Astro over Next.js**: Static-first, zero JS by default, native Cloudflare Pages adapter. Next.js SSR on Cloudflare Workers is experimental and unnecessary.
- **Payload Cloud (free tier)**: Managed hosting, SQLite, zero maintenance. Self-hosted fallback on Railway if needed.
- **Cloudflare Pages (free tier)**: Unlimited bandwidth, atomic deploys, automatic SSL.
- **No server-side rendering**: Content changes at most weekly. Static generation is sufficient.

### Architecture Decision Record

Full ADR at: `docs-valeris/architecture/ADR/ADR-001-astro-payload-cloudflare.md`

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | Astro | 5.x |
| CMS | Payload CMS | 3.x |
| Hosting | Cloudflare Pages | - |
| DNS/SSL | Cloudflare | - |
| CI/CD | GitHub Actions | - |
| Language | TypeScript | 5.x |
| Styling | TBD (Tailwind or vanilla CSS) | - |
| Analytics | Plausible or Fathom | - |
| Booking | Cal.com | - |

## Project Structure

```
valeris-website/
├── src/                          # Astro source code
│   ├── components/               # Reusable Astro components
│   ├── layouts/                  # Page layouts
│   ├── pages/                    # Route pages
│   │   ├── fr/                   # French pages (primary)
│   │   ├── de/                   # German pages (secondary)
│   │   ├── en/                   # English pages (tertiary)
│   │   └── index.astro           # Root redirect -> /fr/
│   ├── i18n/                     # Translation strings
│   │   ├── fr.json
│   │   ├── de.json
│   │   └── en.json
│   ├── styles/                   # Global styles
│   └── assets/                   # Images, fonts
├── public/                       # Static assets (favicon, robots.txt)
├── docs-valeris/                 # Project documentation
│   ├── memory-bank/              # AI context management
│   ├── architecture/ADR/         # Architecture Decision Records
│   └── dev-journal/              # Development session logs
├── astro.config.mjs              # Astro configuration
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── CLAUDE.md                     # This file
├── README.md                     # Project README
└── CHANGELOG.md                  # Version history
```

## Code Principles

- **[SF]** Simplicity First - this is an 8-page static site, not a SaaS platform
- **[RP]** Readability Priority - clear, maintainable code
- **[DM]** Dependency Minimalism - minimal npm packages
- **[CA]** Clean Architecture - components, layouts, pages separation

## Content & i18n

- French is the primary authoring language
- German and English are translated mirrors
- URL structure: `/fr/services/gouvernance-ia/`, `/de/services/ki-governance/`, `/en/services/ai-governance/`
- UI strings in `src/i18n/fr.json`, `src/i18n/de.json`, and `src/i18n/en.json`
- Content from Payload CMS uses localised fields, fetched per-locale at build time
- Astro built-in i18n routing for hreflang tags and language switching
- Language switcher: `FR | DE | EN` in header, no flag icons

## Development Commands

```bash
npm run dev          # Start Astro dev server
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run astro        # Run Astro CLI commands
```

## Deployment

- Push to `main` branch triggers Cloudflare Pages deployment
- Payload CMS webhook triggers GitHub Actions build on content publish
- Preview deployments on pull requests (Cloudflare Pages feature)

## Design Direction

### Typography
- Headings: serif typeface (gravitas)
- Body: clean sans-serif (Inter or similar)
- Large type sizes, generous whitespace (Swiss design tradition)

### Colour Palette
- Primary: deep navy or charcoal
- Background: warm white / light warm grey
- Accent: one colour only (muted gold, deep teal, or burgundy)
- Text: near-black (#1a1a1a)

### Content Rules
- Always use "I" language, never "we" (solo practice)
- No stock photos - professional headshot + Geneva imagery
- No blog until 3+ quality articles exist
- CTA: "Reserver un echange" / "Book a conversation"
- Price ranges on service pages (signals confidence)

## British English

Use British/Australian English spelling (en-AU) throughout all documentation and English-language content.

## Directory Tree Formatting

When creating README files with directory tree structures, use box-drawing characters:
- `├──` for branch connections
- `│` for vertical lines
- `└──` for final branches

## Memory Bank

Documentation lives in `docs-valeris/memory-bank/`. Read ALL files at session start for full context. See `docs-valeris/memory-bank/README.md` for the file hierarchy and usage protocol.

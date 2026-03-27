# Valeris Coaching - Website

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> Technology leadership that delivers.

Trilingual (FR/DE/EN) website for **Valeris Coaching**, a premium solo technology advisory practice based in Geneva, Switzerland.

## Stack

| Component | Technology | Cost |
|-----------|-----------|------|
| Frontend | Astro 5.x (static) | Free |
| CMS | Payload CMS 3.x (headless) | Free tier |
| Hosting | Cloudflare Pages | Free tier |
| DNS/SSL | Cloudflare | Free |
| CI/CD | GitHub Actions | Free |
| **Monthly total** | | **~CHF 1.50** (domain only) |

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
valeris-website/
├── src/
│   ├── components/               # Reusable Astro components
│   ├── layouts/                  # Page layouts
│   ├── pages/
│   │   ├── fr/                   # French pages (primary)
│   │   ├── de/                   # German pages (secondary)
│   │   ├── en/                   # English pages (tertiary)
│   │   └── index.astro           # Root redirect -> /fr/
│   ├── i18n/                     # Translation strings
│   ├── styles/                   # Global styles
│   └── assets/                   # Images, fonts
├── public/                       # Static assets
├── docs-valeris/                 # Project documentation
│   ├── memory-bank/              # AI context management
│   ├── architecture/ADR/         # Architecture Decision Records
│   └── dev-journal/              # Development logs
├── astro.config.mjs
├── package.json
├── CLAUDE.md                     # AI assistant guidance
├── CHANGELOG.md
└── README.md                     # This file
```

## Pages

| # | Route (FR) | Route (DE) | Route (EN) | Purpose |
|---|-----------|-----------|-----------|---------|
| 1 | `/fr/` | `/de/` | `/en/` | Home |
| 2 | `/fr/services/` | `/de/leistungen/` | `/en/services/` | Services overview |
| 3 | `/fr/services/gouvernance-ia/` | `/de/leistungen/ki-governance/` | `/en/services/ai-governance/` | AI Activation & Governance |
| 4 | `/fr/services/performance-equipes/` | `/de/leistungen/team-performance/` | `/en/services/team-performance/` | Engineering Team Performance |
| 5 | `/fr/services/coaching-executif/` | `/de/leistungen/executive-coaching/` | `/en/services/executive-coaching/` | Technical Executive Coaching |
| 6 | `/fr/a-propos/` | `/de/ueber-mich/` | `/en/about/` | About Lucas / Methodology |
| 7 | `/fr/contact/` | `/de/kontakt/` | `/en/contact/` | Contact + Booking |
| 8 | `/fr/mentions-legales/` | `/de/impressum/` | `/en/legal/` | Legal / Privacy |

## Deployment

Push to `main` triggers automatic deployment via Cloudflare Pages. Content changes in Payload CMS trigger rebuilds via webhook.

## Documentation

- **Architecture decisions**: `docs-valeris/architecture/ADR/`
- **Memory bank**: `docs-valeris/memory-bank/`
- **Development journal**: `docs-valeris/dev-journal/`

## Licence

MIT - See [LICENSE](LICENSE)

---

**Valeris Coaching** - Geneva, Switzerland

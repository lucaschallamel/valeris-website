# Valeris Coaching - Website

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> Technology leadership that delivers.

Quadrilingual (FR/DE/EN/IT) website for **Valeris Coaching**, a premium solo technology advisory practice based in Geneva, Switzerland.

**Live**: [valeris.fr](https://valeris.fr)

## Stack

| Component | Technology | Cost |
|-----------|-----------|------|
| Frontend | Astro 6.x + Tailwind CSS v4 + Foxi components | Free |
| Hosting | Cloudflare Pages | Free tier |
| Forms/API | Cloudflare Pages Functions | Free tier |
| Email | Resend (transactional) | Free tier |
| Captcha | Cloudflare Turnstile | Free |
| Blog | Substack RSS federation (build-time) | Free |
| DNS/SSL | Cloudflare | Free |
| **Monthly total** | | **~CHF 1.50** (domain only) |

## Quick Start

```bash
npm install        # Install dependencies
npm run dev        # Start dev server (localhost:4321)
npm run build      # Build for production (44 pages, ~2s)
npm run deploy     # Build + deploy to Cloudflare Pages
```

## Project Structure

```
valeris-website/
├── src/
│   ├── components/           # Shared Astro components
│   │   ├── ui/               # Foxi UI components (Section, Row, Col, Button...)
│   │   ├── blocks/           # Foxi page blocks (Hero, CTA, Features...)
│   │   ├── BlogGrid.astro    # Substack RSS with podcast filters
│   │   ├── ContactForm.astro # Contact form (Turnstile + Resend)
│   │   ├── CtaBanner.astro   # Shared CTA with phone + LinkedIn
│   │   └── PartnersGrid.astro# Partners with category filters
│   ├── layouts/              # BaseLayout (header, footer, i18n nav)
│   ├── pages/                # FR pages (root) + /de/ + /en/ + /it/
│   ├── i18n/                 # Translation strings (fr/de/en/it.json)
│   ├── lib/                  # Substack RSS parser, podcast mapping
│   ├── data/                 # Partners data (18 partners, 5 categories)
│   ├── assets/               # Logos, fonts (WOFF2), images
│   ├── styles/               # Tailwind v4 theme + brand tokens
│   └── config/               # Site config, analytics, nav
├── functions/api/            # Cloudflare Workers (contact form)
├── public/                   # Favicon, icons, webmanifest
├── docs-valeris/             # Project documentation
│   ├── architecture/ADR/     # Architecture Decision Records (3)
│   ├── dev-journal/          # Development session logs (7 entries)
│   ├── memory-bank/          # AI context (activeContext, progress)
│   └── operations/           # DNS, Resend, Turnstile, deployment guides
└── .serena/                  # Serena code intelligence memories
```

## Pages (44 total - 11 per language)

| Page | FR (root) | DE | EN | IT |
|------|-----------|----|----|-----|
| Home | `/` | `/de/` | `/en/` | `/it/` |
| Services | `/services/` | `/de/leistungen/` | `/en/services/` | `/it/servizi/` |
| AI Governance | `/services/gouvernance-ia/` | `/de/leistungen/ki-governance/` | `/en/services/ai-governance/` | `/it/servizi/governance-ia/` |
| Team Performance | `/services/performance-equipes/` | `/de/leistungen/team-performance/` | `/en/services/team-performance/` | `/it/servizi/performance-team/` |
| Exec Coaching | `/services/coaching-executif/` | `/de/leistungen/executive-coaching/` | `/en/services/executive-coaching/` | `/it/servizi/coaching-dirigenti/` |
| Blog | `/blog/` | `/de/blog/` | `/en/blog/` | `/it/blog/` |
| Publications | `/publications/` | `/de/publikationen/` | `/en/publications/` | `/it/pubblicazioni/` |
| Partners | `/partenaires/` | `/de/partner/` | `/en/partners/` | `/it/partner/` |
| About | `/a-propos/` | `/de/ueber-mich/` | `/en/about/` | `/it/chi-sono/` |
| Contact | `/contact/` | `/de/kontakt/` | `/en/contact/` | `/it/contatto/` |
| Legal | `/mentions-legales/` | `/de/impressum/` | `/en/legal/` | `/it/note-legali/` |

## Deployment

```bash
npm run deploy     # Build + deploy to Cloudflare Pages
```

Secrets (configured via `wrangler pages secret put`):
- `RESEND_API_KEY` - Email delivery
- `TURNSTILE_SECRET_KEY` - Captcha verification
- `CONTACT_EMAIL` - Form submissions destination

## Documentation

- **Architecture decisions**: [`docs-valeris/architecture/ADR/`](docs-valeris/architecture/ADR/)
- **Operations guides**: [`docs-valeris/operations/`](docs-valeris/operations/)
- **Development journal**: [`docs-valeris/dev-journal/`](docs-valeris/dev-journal/)
- **Memory bank**: [`docs-valeris/memory-bank/`](docs-valeris/memory-bank/)

## Licence

MIT - See [LICENSE](LICENSE)

---

**Valeris Coaching** - Geneva, Switzerland | [valeris.fr](https://valeris.fr)

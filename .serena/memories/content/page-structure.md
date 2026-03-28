# Valeris Website - Page Structure (March 2026)

## Pages: 44 total (11 per language x 4 languages)

| Page | FR Route | Status |
|------|---------|--------|
| Home | `/` | Real content, service icons, teal CTA |
| Services index | `/services/` | 3 pillars + altitude diagram + cross-selling |
| AI Governance | `/services/gouvernance-ia/` | Full: maturity model, FinOps, sovereignty spectrum, data protection pipeline, certifications, 4 packages |
| Team Performance | `/services/performance-equipes/` | Full: Coach-Craft, SDD pyramid, 4 pain points, MetricBars, SDLC Assessment, 5 packages |
| Executive Coaching | `/services/coaching-executif/` | Full: Vantaset, role evolution diagram, strategic questions, MetricBars, 4 packages |
| About | `/a-propos/` | Photo B&W, career timeline with country badges, 3 references with logos + quotes, methodology, values |
| Partners | `/partenaires/` | NEW: 18 partners, 5 categories, filterable cards, logos grayscale/hover |
| Publications | `/publications/` | White paper cover, 2 upcoming essays |
| Blog | `/blog/` | 31 articles, Substack RSS + manual, podcast filters |
| Contact | `/contact/` | Teal banner, 9-field form, Turnstile |
| Legal | `/mentions-legales/` | COMPLETE: nLPD + RGPD + LCEN, SIRET, zero cookies |

## Partners (18)
- Business: Talan SA, RegData
- Technology: Cloudflare, Resend, Infomaniak, Microsoft Azure, Apple, Astro
- Tools: OpenCode, Anthropic Claude, NVIDIA, Ollama, Obsidian
- Standards: TOGAF, ISO 42001
- Certifications: GAICC, IAPP AIGP, ICF

## Components Created
- `PartnersGrid.astro`: shared across 4 languages, teal banner + filters + cards
- `MetricBar.astro`: reusable before/after progress bars
- `CtaBanner.astro`: shared CTA with phone + LinkedIn

## Visual Assets (CSS/SVG, no bitmaps)
- 3-altitudes pyramid (services index)
- Data protection pipeline (4-step grid, gouvernance-ia)
- Sovereignty spectrum (gradient 3 zones, gouvernance-ia)
- Specs/Tests/Code inverted pyramid (performance-equipes)
- CTO role evolution cards + arrow (coaching-executif)
- MetricBar x4 (performance-equipes + coaching-executif)
- Career timeline with FR/AU/CH country badges (a-propos)
- Service icons (shield, chart, academic-cap SVG, home)

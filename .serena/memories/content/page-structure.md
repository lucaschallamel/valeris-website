# Valeris Website - Page Structure & Content Status

## Pages (30 total: 10 FR + 10 DE + 10 EN)

### Fully Scaffolded (structure + placeholder content)
| Page | FR Route | Sections |
|------|---------|----------|
| Home | `/` | Hero + 3 service cards + teal CTA rectangle |
| Services index | `/services/` | Hero + 3 pillars (alternating layout) + cross-selling CTA |
| AI Governance | `/services/gouvernance-ia/` | Hero + Problem + Approach (4 features) + Packages (2 cards) + Audience + CTA |
| Team Performance | `/services/performance-equipes/` | Same 6-section structure |
| Executive Coaching | `/services/coaching-executif/` | Same 6-section structure |
| About | `/a-propos/` | Hero + Portrait + Narrative + Credentials + Methodology (3-step) + Values + CTA |
| Publications | `/publications/` | Hero + White paper (featured) + 2 essays (upcoming) + Blog link CTA |
| Blog | `/blog/` | Teal banner + podcast filters + Substack article grid |
| Contact | `/contact/` | Teal banner + 9-field form with Turnstile |
| Legal | `/mentions-legales/` | Stub |

### Content TODOs
- Real career narrative (from CV and experience)
- Professional headshot photo
- Real certifications list
- White paper content (AI sovereignty)
- Service pages: enrich with real examples from commercial proposals
- Legal page: nDSG/CGU content

### Design Patterns
- Altitude labels: `text-sm font-bold uppercase tracking-widest text-secondary-500`
- Entry-point cards: `border-2 border-secondary-200 bg-secondary-50/30`
- CTA rectangles: `rounded-xl bg-secondary-600` with `style="white" variation="outline"` buttons
- Teal banners (blog, contact): full-width `bg-secondary-600` with white text
- Section padding: `py-8` / `3.5rem` desktop (reduced from Foxi default)
- Footer: copyright + legal + contact links, teal hover

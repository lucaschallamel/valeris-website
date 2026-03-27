# System Patterns - Valeris Coaching Website

## Architecture Pattern

**Static Site Generation (SSG) with Cloudflare Full Stack**

```
Content (static files in repo)
    |
    | git push to main
    v
Cloudflare Pages auto-build (Astro SSG)
    |
    v
Edge delivery (Cloudflare Pages CDN)
    valeris.fr/*     (FR at root)
    valeris.fr/de/*  (German)
    valeris.fr/en/*  (English)

Cloudflare Workers (/api/*)
    POST /api/contact  (Resend + Turnstile)
```

### Why This Pattern

- **Zero runtime dependencies**: site works even if external services are down
- **Maximum performance**: pre-rendered HTML, no server-side processing
- **Minimal attack surface**: no database, no server, no login on production
- **Near-zero cost**: all Cloudflare free tier
- **Low maintenance**: nothing to patch, nothing to monitor

## Design Patterns

### Component Architecture (Astro + Foxi)

```
src/
├── components/
│   ├── ui/              # Foxi primitives (Section, Row, Col, Button, Feature, List, etc.)
│   ├── blocks/          # Foxi composite blocks (hero, CTA, features, pricing, etc.)
│   ├── BlogGrid.astro   # Substack RSS + podcast filters
│   └── ContactForm.astro # Trilingual form with Turnstile
├── layouts/
│   └── BaseLayout.astro  # Header, nav, footer, hreflang, lang switcher
└── pages/
    ├── services/         # FR service pages (at root)
    ├── de/               # German pages
    ├── en/               # English pages
    └── index.astro       # FR home
```

### i18n Pattern

- Directory-based routing: FR at root, DE/EN under prefix
- `prefixDefaultLocale: false` in Astro config
- UI strings: JSON files per locale (`src/i18n/fr.json`, `de.json`, `en.json`)
- Route map in `src/i18n/index.ts` for cross-language navigation
- Language switcher: `FR | DE | EN` in header, no flag icons
- hreflang tags + x-default on every page

### Colour System

```
Primary (rose):    Action colour - CTA buttons, active nav, form focus
Secondary (teal):  Authority colour - labels, icons, CTA sections, banners
Neutral (stone):   Foundation - backgrounds, text, borders (warm, not cold)
```

| Role | Element | Colour |
|------|---------|--------|
| CTA button | "Réserver un échange" | `bg-primary-500` (rose) |
| Altitude label | "GOUVERNANCE" | `text-secondary-500 font-bold` (teal) |
| Feature icon (square) | Heroicons | `bg-secondary-400` (lighter teal) |
| CTA section | Bottom of pages | `rounded-xl bg-secondary-600` (dark teal) |
| Blog/Contact banner | Full-width header | `bg-secondary-600` |
| Entry-point card | "Point d'entrée" | `border-secondary-200 bg-secondary-50/30` |
| Checklist markers | List items | `text-secondary-500` |
| Page background | Sections | `bg-neutral-50` (warm stone) |
| Body text | Paragraphs | `text-neutral-600` (warm) |
| Headings | H1-H3 | `text-neutral-900` (warm near-black) |

### Service Page Template

All 3 service detail pages follow the same 6-section structure:
1. **Hero** - altitude label + H1 (from i18n) + tagline
2. **Problem** - empathy block, 3 paragraphs in 2nd person
3. **Approach** - description + 4 Feature cards with icons
4. **Packages** - 2-column: entry point (teal border) + full journey
5. **Audience** - 4 buyer profiles in 2x2 grid
6. **CTA** - teal rounded rectangle with white outline button

### Content Fetching Pattern

Currently all content is static (hardcoded in pages + i18n JSON). No runtime API calls. Blog content fetched from Substack RSS at build time only.

## Coding Conventions

- TypeScript throughout (Astro supports it natively)
- Tailwind v4 with custom `@theme` for brand colours
- Component-scoped styles in Astro (`<style>` blocks)
- Semantic HTML5 elements (nav, main, article, section, footer)
- Accessibility: WCAG 2.1 AA minimum
- British English spelling in EN content (en-AU convention)
- German formal "Sie" in DE content

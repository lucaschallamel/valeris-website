# System Patterns - Valeris Coaching Website

## Architecture Pattern

**Static Site Generation (SSG) with Headless CMS**

```
Content authoring (Payload CMS)
    |
    | REST API at build time
    v
Static generation (Astro)
    |
    | HTML/CSS/JS output
    v
Edge delivery (Cloudflare Pages CDN)
```

### Why This Pattern

- **Zero runtime dependencies**: site works even if CMS is down
- **Maximum performance**: pre-rendered HTML, no server-side processing
- **Minimal attack surface**: no database, no server, no login on production
- **Near-zero cost**: free tiers cover all needs
- **Low maintenance**: nothing to patch, nothing to monitor

## Design Patterns

### Component Architecture (Astro)

```
src/
├── components/
│   ├── common/          # Header, Footer, Nav, LanguageSwitcher
│   ├── home/            # Hero, ServiceCards, CredibilityStrip
│   ├── services/        # ServiceHero, ProblemBlock, EngagementOptions
│   ├── about/           # Portrait, CareerNarrative, Methodology
│   └── contact/         # BookingWidget, ContactInfo
├── layouts/
│   └── BaseLayout.astro # Common HTML structure, meta, i18n
└── pages/
    ├── fr/              # French route tree
    ├── de/              # German route tree
    ├── en/              # English route tree
    └── index.astro      # Root redirect
```

### i18n Pattern

- Directory-based routing: `/fr/`, `/de/`, `/en/`
- UI strings: JSON files per locale (`src/i18n/fr.json`, `de.json`, `en.json`)
- Content: Payload CMS localised fields, fetched per-locale at build time
- Language switcher: equivalent page in other language (not redirect to home)
- hreflang tags on every page

### Content Fetching Pattern

```typescript
// At build time only (getStaticPaths)
const response = await fetch(`${CMS_URL}/api/pages?locale=${locale}`);
const content = await response.json();
// Generates static HTML - no runtime fetch
```

## Coding Conventions

- TypeScript throughout (Astro supports it natively)
- CSS: component-scoped styles in Astro (or Tailwind if adopted)
- No JavaScript shipped to client unless explicitly required (Astro islands)
- Semantic HTML5 elements (nav, main, article, section, footer)
- Accessibility: WCAG 2.1 AA minimum

## Integration Patterns

### CMS to Site (Build-time)

```
Payload CMS --[webhook]--> GitHub Actions --[build]--> Cloudflare Pages
```

### Booking (Client-side)

```
Cal.com embedded widget (iframe or JS embed)
Styled to match site aesthetic
```

### Analytics (Privacy-first)

```
Plausible or Fathom (no cookies, no consent banner needed)
Script loaded async, does not block rendering
```

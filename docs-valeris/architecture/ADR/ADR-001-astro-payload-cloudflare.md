# ADR-001: Astro + Payload CMS + Cloudflare Pages

## Status

**Accepted** - 2026-03-27 | **Partially superseded** by ADR-002 (Payload CMS deferred)

## Context

Valeris Coaching needs a website that is:

- Simple to build (developer is the business owner)
- Cheap to run (solo practice, revenue from advisory not SaaS)
- Easy to maintain (< 8 hours/year)
- Trilingual (FR/DE/EN)
- Performant (Swiss enterprise audience expects quality)
- Premium in appearance (signals credibility)

Two main architectural approaches were evaluated:

1. **Astro (static) + Payload CMS (headless) + Cloudflare Pages**
2. **Next.js App Router + Payload CMS (integrated) + Vercel or Cloudflare**

## Decision

We chose **Astro + Payload CMS (headless on Payload Cloud) + Cloudflare Pages**.

## Rationale

### Astro over Next.js

| Factor | Astro | Next.js |
|--------|-------|---------|
| Cloudflare deployment | Native Pages adapter, zero config | Experimental via @opennextjs/cloudflare |
| JavaScript shipped | Zero by default | React hydration overhead |
| i18n | Built-in routing since Astro 4 | Requires next-intl or manual config |
| Build complexity | Low | Medium-high (Payload plugin, DB connection) |
| Maintenance | Minimal (non-breaking updates) | Frequent breaking updates |
| CMS integration | Headless API fetch at build time | Can embed Payload but needs Node.js runtime |
| Performance | 100/100 Lighthouse guaranteed | Good but heavier |

Next.js's strengths (dynamic pages, real-time features, integrated CMS) are irrelevant for an 8-page static site with weekly content changes at most.

### Payload CMS over alternatives

- **TypeScript-native**: matches the project language
- **Free tier on Payload Cloud**: managed hosting, SQLite, zero maintenance
- **Localised fields**: native support for FR/DE/EN content
- **REST + GraphQL API**: clean integration with Astro's build-time fetching
- **Self-hostable**: no vendor lock-in, Railway/Fly.io fallback at $5/month

### Cloudflare Pages over Vercel/Netlify

- **Truly unlimited bandwidth** on free tier
- **Swiss-proximate edge nodes** (Zurich, Frankfurt)
- **DNS management included** (simplifies Infomaniak domain setup)
- **Atomic deploys** with instant global cache invalidation

### SQLite over PostgreSQL

Single user (Lucas), single admin session, fewer than 100 content records. SQLite eliminates a separate database service and reduces cost to zero.

## Consequences

### Positive

- Monthly cost: ~CHF 1.50 (domain only)
- Maintenance: ~7 hours/year
- Performance: < 500ms load time globally
- No runtime dependencies on production
- No vendor lock-in (Astro outputs plain HTML)

### Negative

- Content changes require a rebuild (30-60 seconds)
- No draft preview without additional mechanism
- Adding dynamic features (contact form) requires a Cloudflare Worker
- Astro ecosystem is smaller than Next.js (fewer plugins, smaller community)

### Neutral

- Developer experience is excellent for both frameworks
- Both have strong TypeScript support

## Alternatives Considered

| Alternative | Reason Rejected |
|------------|-----------------|
| WordPress | Maintenance burden, security surface, hosting cost |
| Hugo | No TypeScript, less CMS integration options |
| Plain HTML | No i18n routing, no CMS, harder to maintain |
| Squarespace/Wix | No control, vendor lock-in, not developer-friendly |
| Next.js + Vercel | Overkill, higher cost path, experimental Cloudflare support |

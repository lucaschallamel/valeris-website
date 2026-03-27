# Tech Context - Valeris Coaching Website

## Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Frontend framework | Astro | 5.x | Static site generation |
| CMS | Payload CMS | 3.x | Headless content management |
| CMS hosting | Payload Cloud | Free tier | Managed CMS with SQLite |
| CMS database | SQLite | - | Single user, simple content |
| Site hosting | Cloudflare Pages | Free tier | Global CDN, atomic deploys |
| DNS | Cloudflare | - | From Infomaniak nameservers |
| SSL | Cloudflare | Auto | Full (Strict) mode |
| CI/CD | GitHub Actions | - | Webhook-triggered builds |
| Language | TypeScript | 5.x | Type safety |
| Booking | Cal.com | - | Embedded scheduling widget |
| Analytics | Plausible or Fathom | - | Privacy-respecting, cookieless |

## Dependencies (Minimal)

### Production

- `astro` - Core framework
- `@astrojs/cloudflare` - Cloudflare Pages adapter (if SSR needed later)
- Payload CMS SDK (for typed content fetching, optional)

### Development

- `typescript` - Type checking
- `prettier` - Code formatting
- `@astrojs/check` - Astro-specific linting

## Configuration

### DNS (Infomaniak -> Cloudflare)

1. Change nameservers at Infomaniak to Cloudflare's assigned nameservers
2. A record for root domain pointing to Cloudflare Pages
3. CNAME for www pointing to Cloudflare Pages deployment
4. SSL/TLS: Full (Strict) - automatic, free

### Environment Variables

```bash
# .env.example
PUBLIC_SITE_URL=https://valeris.ch
PAYLOAD_CMS_URL=https://your-project.payloadcms.app
PAYLOAD_API_KEY=your-api-key-here
```

### Astro Config

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://valeris.ch',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'de', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  output: 'static',
});
```

## Performance Constraints

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 95+ |
| First Contentful Paint | < 1.2s |
| Total page weight | < 500KB including images |
| JavaScript shipped | Zero (unless island) |
| Build time | < 60s |

## Infrastructure Costs

| Service | Monthly (CHF) |
|---------|---------------|
| Infomaniak domain (valeris.ch) | ~1.50 |
| Cloudflare (Pages + DNS + SSL) | 0 |
| Payload Cloud (free tier) | 0 |
| GitHub (free tier) | 0 |
| Plausible (~) | 0-9 (self-hosted = 0) |
| **Total** | **1.50 - 10.50** |

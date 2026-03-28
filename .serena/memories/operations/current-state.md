# Operations - Current State (2026-03-28 late evening)

## Site
- **URL**: https://valeris.fr (+ www.valeris.fr)
- **Pages**: 44 (11 per language: FR/DE/EN/IT)
- **Build**: ~1.9 seconds, zero errors
- **Deploy**: `npm run deploy`
- **SEO score**: ~8/10 (from 5.5/10)

## SEO (implemented 2026-03-28)
- Canonical URLs on all pages
- Open Graph (og:type, url, title, description, site_name, locale fr_CH/de_CH/it_CH/en)
- Twitter Card (summary)
- JSON-LD ProfessionalService (address Geneva, geo, phone, price range, founder)
- Person schema on about pages, Service schema on service pages
- 11 unique meta descriptions per language (150-160 chars, geographic keywords)
- SeoSchema.astro shared component

## PageSpeed
- Critical fonts preloaded from /public/fonts/ (stable URLs)
- CerebriSans-Regular + Montserrat preloaded in head
- font-display: swap (critical) / optional (italic)
- CSS->font dependency chain broken

## Infrastructure
- Cloudflare Pages + Workers (contact form)
- DNS at Cloudflare (nova/osmar.ns.cloudflare.com)
- Resend: domain valeris.fr verified (Ireland eu-west-1)
- Turnstile: configured, token reset on error
- Secrets: RESEND_API_KEY, TURNSTILE_SECRET_KEY, CONTACT_EMAIL

## Documentation
- 7 READMEs (root, docs-valeris, src, components, lib, functions, ADR index)
- CLAUDE.md fully up to date
- 6 operations guides (DNS, Resend, Turnstile, Substack, Partners, Deployment)
- 8 dev journal entries
- 3 ADRs

## Remaining
- Contact form e2e test needed
- robots.txt sitemap reference
- www -> non-www redirect
- Cal.com booking widget
- Analytics (Plausible/Fathom)
- Translation review (DE, IT)

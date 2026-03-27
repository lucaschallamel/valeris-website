# Valeris Website - Current State (March 2026)

## What Works
- 30 pages building in ~1.2s (FR/DE/EN)
- Cloudflare Pages deployment pipeline
- Substack blog federation with podcast filters
- Contact form (Resend + Turnstile, pending deploy test)
- Teal + warm stone colour palette applied everywhere
- Footer with legal + contact on all pages
- Language switcher FR/DE/EN

## What's Missing
- Real content (pages have scaffolded structure but placeholder text)
- Professional headshot
- Mobile hamburger menu
- Cal.com booking widget
- Privacy-respecting analytics
- Publications lead capture flow (D1 + R2)
- Legal/privacy page content

## Pending Deploy/Test
- Contact form end-to-end (Workers function exists but untested in prod)
- Custom domain valeris.fr (DNS propagation)

## Technical Debt
- 26 Foxi components not yet Tailwind v4 adapted (fix when used)
- Substack podcast mapping is manual (src/lib/podcasts.ts)
- No mobile navigation

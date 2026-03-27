# Valeris Website - Stack & Architecture

## Stack
- **Frontend**: Astro 6.x (static SSG) + Tailwind CSS v4 + Foxi component library
- **Hosting**: Cloudflare Pages (free tier, global CDN)
- **Forms**: Cloudflare Workers + Resend + Turnstile captcha
- **Blog**: Substack RSS federation (20 articles, 5 podcast filters)
- **Domain**: valeris.fr (Infomaniak, DNS at Cloudflare)
- **No CMS**: Content as static files. Payload CMS deferred (Figma acquisition). See ADR-002.

## Key Architecture Decisions
- ADR-001: Astro over Next.js (partially superseded)
- ADR-002: Static content, no CMS, Cloudflare full stack
- ADR-003: Foxi components, Substack federation, Resend + Turnstile
- FR pages at root (`/services/`), DE/EN under prefix (`/de/leistungen/`, `/en/services/`)
- Tailwind v4 (not v3) for future-proofing

## Colour Palette (March 2026)
- **Primary**: Rose/pink (#f06aa8) - CTA buttons, active nav, form focus
- **Secondary**: Teal (#52bcbc @400, scale 50-950) - altitude labels, feature icons, CTA sections, checklist markers
- **Neutrals**: Warm stone (replacing cold slate) - #faf8f6 to #1c1917
- Study archived: `Website/design-studies/2026-03-27-palette-comparison.astro`

## Build
- 30 pages, ~1.2s build time
- Fonts: Cerebri Sans (body) + Montserrat (headings)

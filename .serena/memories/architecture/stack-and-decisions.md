# Architecture - Stack and Decisions

## Stack
- **Frontend**: Astro 6.x + Tailwind CSS v4 (Vite plugin) + Foxi component library (adapted)
- **CMS**: None (static files in repo, Payload CMS deferred - Figma acquisition)
- **Hosting**: Cloudflare Pages (free tier)
- **DNS**: Cloudflare (migrated from Infomaniak, CNAME flattening for root domain)
- **Domain**: valeris.fr (registrar: Infomaniak, nameservers: Cloudflare)
- **Email (transactional)**: Resend (free tier, domain valeris.fr verified)
- **Email (business)**: Infomaniak KSuite (MX preserved)
- **Captcha**: Cloudflare Turnstile (managed mode, site key: 0x4AAAAAACw1vy6U50c8ODeg)
- **Blog**: Substack RSS federation (thecamelhall.substack.com/feed, build-time fetch)
- **Icons**: astro-icon + @iconify-json/heroicons + custom SVGs

## Key ADRs
- ADR-001: Astro over Next.js (static-first, Cloudflare native)
- ADR-002: No CMS, Cloudflare full stack (Workers + D1 + R2 + Resend)
- ADR-003: Foxi components, Substack federation, Resend, Turnstile

## i18n Architecture
- 4 languages: FR (root), DE (/de/), EN (/en/), IT (/it/)
- prefixDefaultLocale: false (FR at root)
- Route map in src/i18n/index.ts with localised slugs per language
- Language switcher: FR|DE|EN|IT in header
- Active section detection normalises DE/EN/IT slugs to FR equivalents

## Tailwind v4 Specifics
- @reference directive required in all scoped component styles
- Responsive @apply (lg:, md:) does not work in scoped styles - use native @media
- Dynamic class names not detected - use CSS custom properties (Col component)
- Complex @apply selectors can fail in some browsers - prefer native CSS

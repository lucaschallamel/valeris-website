# Operations - Current State (2026-03-29)

## Site
- **URL**: https://valeris.fr (+ www.valeris.fr)
- **Pages**: 44 (11 per language: FR/DE/EN/IT)
- **Build**: ~2 seconds
- **SEO score**: ~9/10
- **Dev journal**: 12 entries, 3 days

## SEO - Complete
- Google Search Console: verified (DNS), sitemap submitted
- Bing Webmaster Tools: verified (BingSiteAuth.xml), sitemap submitted
- robots.txt: `public/robots.txt` with `Sitemap:` directive
- Sitemap hreflang: `@astrojs/sitemap` configured with `fr-CH`, `de-CH`, `it-CH`, `en`
- HTML hreflang: all 44 pages (BaseLayout, primary signal for Google)
- Canonical URLs: all 44 pages
- JSON-LD: ProfessionalService + Person + Service schemas
- OG image: `public/og-image.jpg` (1200x630, rose-to-teal gradient, logo + tagline)
- Twitter card: `summary_large_image`
- Meta descriptions: unique per page per language (11 keys x 4 languages)

## Key Content
- Hero: "Un leadership technologique qui fait la difference."
- Coaching tagline: "Le role a change. Votre methode devrait changer aussi."
- Coaching diagram: Technical Lead -> Context Engineer
- EN methodology: Diagnostic, Scoping, Delivery & Transfer
- EN etymology: "you will thrive"
- No separator dashes anywhere
- Services index: fully clickable content blocks
- Home: clickable service cards with icons left of title

## Remaining for Launch
- CalDAV Infomaniak connection for Cal.eu
- Contact form e2e test
- Lighthouse audit
- Analytics (Plausible/Fathom)
- Launch announcement

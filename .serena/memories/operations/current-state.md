# Operations - Current State (2026-04-10)

## Site
- **URL**: https://valeris.fr (+ www.valeris.fr)
- **Pages**: 44 (11 per language: FR/DE/EN/IT)
- **Build**: ~2 seconds
- **SEO score**: ~9/10
- **Dev journal**: 14 entries

## Blog
- **31 articles** rendered on all 4 language blog pages
- Hybrid data source: live Substack RSS (20 most recent) + `manualPosts` safety net (all 31 protected)
- Latest post: `ai-love-and-the-llm-harness` (2026-04-10, The AIM)
- Rollover-safe: every article in the archive has a `manualPosts` entry in `src/lib/substack.ts`
- Maintenance routine documented in `docs-valeris/operations/substack-integration.md` (proactive, add at publish time)
- See Serena memory `architecture/blog-rollover-safety` for the full architecture

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

## Optional hardening
- Wire the pre-deploy blog audit into `npm run predeploy` so a deploy cannot proceed with an at-risk blog article

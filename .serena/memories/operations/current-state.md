# Operations - Current State (2026-04-10)

## Site
- **URL**: https://valeris.fr (+ www.valeris.fr)
- **Pages**: 44 (11 per language: FR/DE/EN/IT)
- **Build**: ~2 seconds
- **SEO score**: ~9/10
- **Dev journal**: 14 entries

## Home positioning (2026-04-10 update)
- Hero subheadline addresses **both private enterprises and public sector organisations**, no longer Swiss-only
- Full text in all 4 languages captured in Serena memory `content/home-hero-positioning`
- Hardcoded in `src/pages/{,de/,en/,it/}index.astro` line 23, NOT sourced from i18n JSON
- Deep pages (services, publications, legal) remain Swiss-targeted by design

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
- Meta descriptions: unique per page per language (11 keys x 4 languages) - still mention "Swiss enterprises" for SEO targeting, not synced to broadened home positioning

## Key Content
- Hero headline (H1): "Un leadership technologique qui fait la difference."
- Hero subheadline: "J'aide les entreprises et les administrations publiques a reussir leur transformation technologique. Pas seulement la strategie, mais l'execution." (+ 3 other languages)
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
- Consider syncing meta descriptions in `src/i18n/*.json` to the broadened home positioning if the public sector push becomes a formal SEO priority

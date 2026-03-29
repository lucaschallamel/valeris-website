---
entry_date: 2026-03-29
author: Lucas Challamel
focus_area: Search engine submission, SEO completion, robots.txt, OG social image
status: complete
session_duration: ~1 hour
tags: [seo, google-search-console, bing-webmaster, sitemap, robots-txt, og-image, hreflang]
---

## Why (High-Level Context)

Post-launch SEO submission session. Site was already deployed and SEO-ready (score 8/10 from previous session). This session focused on registering with search engines, fixing remaining SEO gaps, and completing the social sharing image.

**Session Objectives**:

- Submit site to Google Search Console and Bing Webmaster Tools
- Add robots.txt with sitemap reference
- Fix sitemap hreflang (was missing `<xhtml:link>` alternate entries)
- Create and wire up OG social sharing image

---

## How (The Journey)

### 1. Bing Webmaster Tools Verification

Bing required an XML verification file at `https://valeris.fr/BingSiteAuth.xml`.

**Fix**: File was incorrectly placed in `src/` (processed by Astro pipeline). Moved to `public/` so it is served as-is at the root URL.

Key learning: in Astro, `src/` files are processed by the build pipeline. Verification files and static assets meant to be served at exact URLs belong in `public/`.

### 2. Google Search Console

Google automatically validated via DNS record (CNAME). No file upload needed.

### 3. Sitemap Submission

- Google Search Console: submitted `sitemap-index.xml`
- Bing Webmaster Tools: submitted `sitemap-index.xml` (required removing `www.` prefix - site verified as `valeris.fr` not `www.valeris.fr`)

### 4. robots.txt

Created `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://valeris.fr/sitemap-index.xml
```

The `Sitemap:` directive allows all crawlers (Googlebot, Bingbot, Yandex, etc.) to discover the sitemap automatically without manual submission. State of the art for static sites.

### 5. Sitemap Hreflang Fix

**Problem**: `sitemap()` integration was called with no config - the sitemap had the correct `xmlns:xhtml` namespace declared but NO `<xhtml:link>` alternate entries. Search engines could not understand the language relationship between pages.

**Fix**: Passed i18n config to the sitemap integration in `astro.config.mjs`:

```js
sitemap({
  i18n: {
    defaultLocale: 'fr',
    locales: {
      fr: 'fr-CH',
      de: 'de-CH',
      en: 'en',
      it: 'it-CH',
    },
  },
}),
```

Using `fr-CH` / `de-CH` / `it-CH` rather than bare `fr` / `de` / `it` signals Swiss market targeting, counteracting the `.fr` ccTLD geographic signal.

**Result**: Pages with shared slugs (`/`, `/blog/`, `/contact/`, etc.) now have full 4-language `<xhtml:link rel="alternate">` entries. Pages with localised slugs (`/a-propos/` vs `/ueber-mich/`) are not automatically matched by Astro's sitemap plugin (known limitation of slug-based matching), but the HTML hreflang tags in BaseLayout already cover all 44 pages correctly and are treated as the primary signal by Google.

### 6. OG Social Sharing Image

**Problem**: No `og:image` or `twitter:image` - link previews on LinkedIn, Twitter/X, Slack, WhatsApp showed no image.

**Solution**:
- Generated 1200x630px branded image via Google Nano Banana diffusion
- Content: Valeris flower+leaves logo, "valeris" wordmark, "Technology Leadership & AI Governance | Geneva, Switzerland"
- Gradient: rose (#FFA6C9) to deep teal (#2d7a7a) - brand palette
- File: `public/og-image.jpg`

**Meta tags added to BaseLayout**:
```html
<meta property="og:image" content="https://valeris.fr/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/jpeg" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://valeris.fr/og-image.jpg" />
```

Note: upgraded `twitter:card` from `summary` to `summary_large_image` - this displays the full-width image in Twitter/X link previews instead of a small square thumbnail. OG image URL must be absolute (not relative) for social platform crawlers.

---

## Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| BingSiteAuth.xml location | `public/` not `src/` | Astro processes `src/` files; `public/` serves as-is |
| robots.txt Sitemap directive | Yes | Automatic crawler discovery, no manual re-submission needed |
| Sitemap i18n locales | `fr-CH`, `de-CH`, `it-CH` | Swiss market signal, counteracts `.fr` ccTLD |
| OG image dimensions | 1200x630 | Standard for all major platforms (Facebook, LinkedIn, Twitter, Slack) |
| twitter:card type | `summary_large_image` | Full-width preview vs small thumbnail - significantly better visual |
| Single OG image | One image for all 44 pages | Shared image is correct - page title/description already localised |

---

## Final State

**SEO checklist - complete**:
- [x] Google Search Console verified and sitemap submitted
- [x] Bing Webmaster Tools verified and sitemap submitted
- [x] robots.txt with sitemap reference
- [x] Sitemap hreflang (partial - shared slugs)
- [x] HTML hreflang (all 44 pages - complete, primary signal)
- [x] Canonical URLs (all 44 pages)
- [x] JSON-LD structured data (ProfessionalService, Person, Service)
- [x] OG meta tags (title, description, locale, image)
- [x] Twitter Card (summary_large_image with image)
- [x] Unique meta descriptions per page per language
- [x] Font preloading

**Still remaining (non-SEO)**:
- [ ] CalDAV Infomaniak connection for Cal.eu
- [ ] Contact form e2e test
- [ ] Lighthouse audit
- [ ] Analytics (Plausible/Fathom)
- [ ] Launch announcement

---

**Session Summary**: Search engine registration complete (Google + Bing). Added robots.txt, fixed sitemap hreflang, created and deployed OG social sharing image (1200x630). SEO checklist now fully complete.

**Estimated Impact**: High - site is now fully discoverable and will display correctly in search results and social link previews.

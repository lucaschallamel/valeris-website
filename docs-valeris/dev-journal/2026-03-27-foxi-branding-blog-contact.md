---
entry_date: 2026-03-27
author: Lucas Challamel
focus_area: Foxi theme integration, brand assets, blog federation, contact form
status: complete
session_duration: ~3 hours
tags: [foxi, tailwind, branding, rss, substack, resend, turnstile, contact-form]
---

## Why (High-Level Context)

Fourth session of the day. The Astro project was deployed on Cloudflare Pages with a basic layout. This session's goal was to give the site a professional look with the Foxi component library, integrate brand assets, federate blog content from Substack, and build a contact form with email delivery.

**Session Objectives**:

- Integrate Foxi Astro theme components into the existing project
- Import and optimise Valeris brand assets (logos, fonts)
- Federate blog content from The Camel Hall Substack
- Build a contact form with Resend email delivery and Turnstile captcha

**Related Work**:

- ADR-002: Static content, Cloudflare full stack
- Previous entry: 2026-03-27-architecture-pivot-cloudflare-deploy.md

---

## How (The Journey)

### 1. Tailwind, Sitemap, MDX Integrations

Installed three Astro integrations via `npx astro add`:

- **Tailwind CSS v4** (via `@tailwindcss/vite`) - Vite plugin approach, not the deprecated `@astrojs/tailwind`
- **@astrojs/sitemap** - auto-generates sitemap-index.xml at build
- **@astrojs/mdx** - MDX support for future content

### 2. Brand Assets Import and Optimisation

**Logos** (from kDrive branding archive):
- Copied 6 SVG logos to `src/assets/logos/`
- Optimised all SVGs with SVGO multipass (17-47% reduction)
- Created `valeris-icon-primary.svg` - the rose flower recoloured in solid `#f06aa8` (primary-500) for header and favicon
- Original gradient versions preserved

**Fonts** (TTF to WOFF2 conversion):
- Cerebri Sans Regular/Bold/Italic: 97KB -> 14KB each (86% reduction)
- Montserrat Variable: 385KB -> 52KB (87% reduction)
- Subsetting to Latin character range via `pyftsubset` + brotli
- Required installing `brotli` Python package for WOFF2 encoding

**CSS Design Tokens** (Tailwind v4 `@theme`):
- Primary palette: 11 shades from rose brand colours (#FFA6C9 base)
- Neutral palette: slate tones (matching Foxi's system)
- Font families: `--font-sans` (Cerebri Sans), `--font-headings` (Montserrat)
- Animations: dropdown, fadeUp, fadeInShadow (from Foxi)

### 3. Foxi Component Library Integration

**Strategy**: Import Foxi components into the existing project (not clone and adapt).

**Tailwind v3 -> v4 incompatibilities**:
- Foxi uses Tailwind v3 with `tailwind.config.mjs` + PostCSS
- Valeris uses Tailwind v4 with Vite plugin + `@theme`
- `@apply` with responsive variants (`lg:`, `md:`, `dark:`) does not work in scoped `<style>` blocks in Tailwind v4
- Solution: added `@reference "../../styles/global.css"` to all component style blocks
- Converted responsive `@apply` to native CSS `@media` queries in Section, Row, Col components
- Dynamic class generation (`'col-span-' + span`) replaced with CSS custom properties (`--col-span`)

**Components imported**:
- UI layer (25+): Section, Row, Col, Button, Card, Badge, Accordion, Modal, Form fields, etc.
- Block layer: Hero, Features, CTA, Contact, FAQ, Blog, Testimonials, Pricing
- Scripts: LocalScripts, ModeSwitcher, analytics stubs
- Installed `astro-icon` + `@iconify-json/heroicons` for icon support

**Components adapted for Tailwind v4**:
- `Col.astro` - CSS custom properties for grid span instead of dynamic classes
- `Row.astro` - native `@media` queries for responsive grid
- `Section.astro` - native CSS for responsive padding and mode variants

**Not yet adapted** (will fix when used):
- NavigationBar, Footer, Toast, Modal, form elements, pricing tables (26 files with responsive `@apply`)

### 4. Layout Rebuild

Replaced the old scoped-CSS layout with Tailwind utility classes:

- **Header**: sticky, blur backdrop, rose icon + "valeris" in Montserrat, responsive nav
- **Footer**: neutral-50 background, centred content
- **Active navigation**: current section highlighted with rose pill (`bg-primary-500 text-white`)
- **Services dropdown**: hover-activated submenu with 3 services, chevron rotation, invisible bridge for hover gap
- **All pages**: use Section/Row/Col for consistent centering (full container width)

### 5. Navigation Enhancements

**Menu structure updated**:
- Services (dropdown: 3 service pages)
- Blog (new)
- Publications (new)
- A propos
- Contact

**Active section detection**:
- `isActiveSection()` function normalises DE/EN slugs to FR equivalents
- Rose pill with white text on active section
- Works across all 3 languages

### 6. Blog - Substack RSS Federation

**Architecture**:
- `src/lib/substack.ts` fetches RSS from `thecamelhall.substack.com/feed` at build time
- 20 articles parsed (title, date, excerpt, image, link)
- No runtime cost - content baked into static HTML

**Podcast categorisation** (5 podcasts from The Camel Hall):
- The AIM (AI/technology)
- Drive & Thrive (ethical leadership)
- The Switch (mindset)
- Sustain.ics (sustainable living)
- Kind Mind (personal growth)

**Implementation**:
- `src/lib/podcasts.ts` - manual slug-to-podcast mapping + keyword fallback detection
- Trilingual podcast descriptions (FR/DE/EN)
- `BlogGrid.astro` shared component for all 3 language pages
- Client-side filter buttons with podcast description that updates dynamically
- Badge on each article card showing the podcast name
- Articles link to Substack (open in new tab)

**RSS parsing fixes**:
- `stripHtml()` enhanced to decode numeric HTML entities (&#127897; etc.)
- Emoji and special Unicode stripped from excerpts for clean display
- Named entities decoded (&rsquo;, &mdash;, &hellip;, etc.)
- `cleanTitle()` for title-specific entity handling

### 7. Contact Form with Resend + Turnstile

**Frontend** (`ContactForm.astro` shared component):
- Service interest (select: 3 services + no preference)
- First name, last name (required)
- Email (required)
- Phone, company, job title, organisation size (optional)
- Message (optional textarea)
- Cloudflare Turnstile captcha widget (site key: `0x4AAAAAACw1vy6U50c8ODeg`)
- Honeypot field (hidden, anti-bot)
- Client-side validation before submission
- Success/error messages
- Trilingual labels (FR/DE/EN)

**Backend** (`functions/api/contact.ts` - Cloudflare Pages Function):
- Validates required fields and email format
- Checks honeypot
- Verifies Turnstile token with Cloudflare API
- Sends formatted HTML email via Resend API
- CORS headers for allowed origins
- Reply-to set to submitter's email
- Email subject: `[Valeris] FirstName LastName - Service Name`

**External services configured**:
- Resend: account created, API key generated (sending access), domain `valeris.fr` verified with DNS records (MX, TXT, CNAME in Cloudflare)
- Cloudflare Turnstile: site created, site key + secret key generated
- Secrets configured via `wrangler pages secret put`: RESEND_API_KEY, TURNSTILE_SECRET_KEY, CONTACT_EMAIL

### 8. New Pages Created

- `/blog/` (FR/DE/EN) - Substack RSS with podcast filters
- `/publications/` (FR/DE/EN) - stub, future white papers with lead capture
- All existing stubs updated with Section/Row/Col centering
- DE/EN home pages rebuilt with Foxi components

---

## Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Foxi components imported, not theme cloned | Import into existing project | Preserve i18n routing, avoid fighting Foxi's structure |
| Stay on Tailwind v4 | Adapt Foxi components | More future-proof, despite migration effort |
| Rose icon + text for logo | valeris-icon-primary.svg + Montserrat | Full logo too dense at small size |
| Solid rose (#f06aa8) for icon | Not gradient | Gradient too pale on white backgrounds |
| Substack RSS federation | Build-time fetch, cards with Substack links | No content duplication, zero cost, rebuilds bring new articles |
| Manual podcast mapping | JSON mapping + keyword fallback | Substack RSS has no category metadata |
| Resend for email | Not SendGrid/Mailgun | Best DX, free tier sufficient, modern API |
| Cloudflare Turnstile | Not reCAPTCHA | Free, privacy-respecting, native Cloudflare integration |
| Honeypot + Turnstile | Defence in depth | Honeypot catches basic bots, Turnstile handles the rest |

---

## Final State & Next Steps

**Current State**:

- Professional design with Foxi components + Valeris branding
- 30 pages building (10 FR + 10 DE + 10 EN)
- Blog federating 20 Substack articles with podcast filters
- Contact form with Turnstile captcha ready (backend configured, needs first deploy)
- Cloudflare Pages API intermittently returning 504 (temporary outage)

**Immediate Next Steps**:

- [ ] Deploy when Cloudflare Pages API recovers
- [ ] Test contact form end-to-end (submit -> Resend -> email)
- [ ] Add custom domain `valeris.fr` when DNS propagates
- [ ] Write real content for FR service pages
- [ ] Build publications page with lead capture flow
- [ ] Add mobile hamburger menu (nav hidden on mobile currently)
- [ ] Professional headshot photography

**Remaining Foxi v4 Adaptations** (fix when needed):

- 26 components with responsive `@apply` not yet converted
- NavigationBar.astro (not used - custom i18n nav)
- Footer.astro (not used - custom i18n footer)
- Form elements, pricing tables, modals

**Knowledge Captured**:

- Tailwind v4 `@apply` in scoped Astro `<style>` blocks does not support responsive variants (`lg:`, `md:`). Use native `@media` queries or move styles to global CSS
- Tailwind v4 requires `@reference` directive in component `<style>` blocks to resolve utility classes
- Dynamic Tailwind class names (`'col-span-' + variable`) are not detected by Tailwind v4's JIT. Use CSS custom properties instead
- SVGO multipass achieves 17-47% SVG reduction
- `pyftsubset` with WOFF2 + Latin subset achieves ~86% font size reduction
- Substack RSS exposes full HTML content but no category/section metadata
- Cloudflare Pages Functions live in `/functions/` directory and auto-deploy as Workers
- Cloudflare Turnstile is free and invisible - strongly preferred over reCAPTCHA for Swiss/EU sites

---

**Session Summary**: Transformed the site from basic scaffolding to a professional, branded experience with Foxi components, Substack blog federation, and a contact form backed by Resend and Turnstile.

**Estimated Impact**: Very High

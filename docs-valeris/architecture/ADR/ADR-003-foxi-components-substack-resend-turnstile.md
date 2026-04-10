# ADR-003: Foxi Component Library, Substack Federation, Resend, Turnstile

## Status

**Accepted** - 2026-03-27

## Context

With the Astro + Cloudflare Pages stack in place (ADR-001, ADR-002), the site needed:

1. A professional design system beyond basic CSS
2. Blog content without writing from scratch (existing Substack publication with 20+ articles)
3. A contact form with email delivery and anti-spam protection

## Decision

### 1. Foxi Component Library (imported, not cloned)

**Choice**: Import Foxi Astro theme components into the existing project, adapt them for Tailwind v4.

**Rationale**: Foxi provides 25+ production-ready UI components (Section, Row, Col, Button, Card, Accordion, Modal, Form fields) and 15+ page blocks (Hero, Features, CTA, Contact, FAQ). Rather than building these from scratch or cloning the entire theme (which would force us to rebuild the i18n routing), we imported the components directory and adapted them.

**Key adaptation**: Foxi uses Tailwind v3 with `tailwind.config.mjs`. Valeris uses Tailwind v4 with the Vite plugin and `@theme`. Responsive `@apply` variants (`lg:`, `md:`, `dark:`) do not work in scoped Astro `<style>` blocks with Tailwind v4. Solution: `@reference` directives + native CSS `@media` queries.

### 2. Substack RSS Federation for Blog

**Choice**: Fetch the RSS feed from `thecamelhall.substack.com/feed` at build time. Display article cards on the blog page. Click-through to Substack for full reading.

**Rationale**: Lucas already maintains a Substack publication (The Camel Hall) with 5 podcast series and 20+ articles. Federating avoids content duplication, leverages existing audience, and costs nothing. Articles are categorised into 5 podcasts via a manual mapping (Substack RSS has no category metadata).

**Alternatives rejected**: Content duplication on valeris.fr (SEO duplicate risk), Substack API (no public API for content), manual copy-paste (maintenance burden).

### 3. Resend for Transactional Email

**Choice**: Resend (free tier, 100 emails/day) for sending contact form notifications.

**Rationale**: Modern TypeScript API, excellent developer experience, free tier more than sufficient (< 10 emails/day expected). Domain `valeris.fr` verified with DNS records (MX, SPF, DKIM) for professional sender identity.

**Alternatives rejected**: SendGrid (legacy API, complex setup), Mailgun (trial limitations), SES (overkill, AWS dependency).

### 4. Cloudflare Turnstile for Captcha

**Choice**: Cloudflare Turnstile (managed mode) for anti-spam on the contact form.

**Rationale**: Free (unlimited), privacy-respecting (no Google tracking cookies), invisible when possible, native integration with Cloudflare Workers for server-side verification. Compatible with Swiss DPA (nDSG) requirements.

**Alternatives rejected**: reCAPTCHA v3 (Google tracking, cookie consent needed), hCaptcha (less integrated with Cloudflare), no captcha (honeypot alone is insufficient for targeted spam).

## Consequences

### Positive

- Professional design with minimal custom CSS effort
- Blog content available immediately (20 articles)
- Contact form operational with email delivery and captcha
- Zero additional monthly cost (all free tiers)
- Privacy-compliant (no Google services on the site)

### Negative

- 26 Foxi components not yet adapted for Tailwind v4 (tech debt, fix when needed)
- Substack podcast categorisation requires manual mapping maintenance
- Blog content is in English only (Substack publication language)
- Contact form depends on 2 external services (Resend, Turnstile)

### Neutral

- Foxi components can be replaced incrementally if a custom design system emerges
- Substack federation can be replaced with local MDX content later
- Resend can be swapped for any email API (standard REST interface)

## Update 2026-04-10: RSS rollover risk and the dual-array safety net

### Context

Substack's public RSS feed serves only the **20 most recent posts**. Articles published after that threshold silently disappear from the feed. The original implementation of `fetchSubstackPosts()` in `src/lib/substack.ts` assumed this was acceptable because older articles could be added to a `manualPosts` fallback array.

In practice, `manualPosts` was seeded once in 2024 with 11 early episodes and then never maintained. By April 2026, every article published since mid-2024 lived **only** in the RSS feed, with no safety net. Each new publication silently dropped the oldest article in the feed from `valeris.fr/blog`.

### Hardening

1. **Backfilled `manualPosts`** with full `SubstackPost` entries for every article currently in the live RSS feed (20 articles as of 2026-04-10). The merge logic in `fetchSubstackPosts()` (line 233) deduplicates by slug and prefers RSS when both sources have the same article, so descriptions and images stay fresh while `manualPosts` acts as the permanent archive.

2. **Clarified the dual-array pattern** in `docs-valeris/operations/substack-integration.md`:

   | Array | File | Purpose |
   |-------|------|---------|
   | `manualPosts` | `src/lib/substack.ts` | Safety net. Full post data. Survives RSS rollover. |
   | `manualMapping` | `src/lib/podcasts.ts` | Categoriser only. Slug -> podcast slug. Does NOT bring articles back. |

   Adding a slug to `manualMapping` alone is insufficient to preserve an article. Only `manualPosts` does that.

3. **Reframed the maintenance routine as proactive**: every new article must be added to `manualPosts` at publication time, not "when you notice it rolled off". Reactive workflows rely on human vigilance that fails silently.

4. **Pre-deploy audit snippet** documented in the operations guide, printing any slug currently in RSS that is missing from `manualPosts`. Catches gaps before they cost an article.

### Decision revision

The original decision (ADR-003 point 2) remains correct: Substack RSS federation is still the right choice for blog content. The update does not supersede the ADR; it hardens the implementation and documents the constraint that was implicit before.

**Status**: Still **Accepted**, with the hardening above applied.

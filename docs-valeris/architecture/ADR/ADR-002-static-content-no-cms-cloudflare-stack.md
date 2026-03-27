# ADR-002: Static Content without CMS, Cloudflare Full Stack for Forms and Lead Capture

## Status

**Accepted** - 2026-03-27

**Supersedes**: ADR-001 (partially) - Payload CMS is deferred, not rejected. The Astro + Cloudflare Pages decision from ADR-001 remains unchanged.

## Context

ADR-001 selected Payload CMS (hosted on Payload Cloud free tier) as the headless CMS. Since then, two things have changed:

1. **Payload Cloud signups are paused**: Payload was acquired by Figma in June 2025. New Payload Cloud accounts are no longer available. The message on their site reads: "We're joining Figma! During this transition, new signups are paused."

2. **Business requirements have evolved**: Beyond static pages, Valeris needs:
   - Contact forms (lead capture)
   - White paper downloads gated by email collection
   - Webinar/event registration pages
   - Transactional emails (confirmations, download links)

Self-hosting Payload on Cloudflare Workers + D1 is technically possible (~$5/month), but adds complexity and maintenance for a site with 8 pages that change at most weekly.

## Decision

1. **Defer Payload CMS** - manage content as static files (Markdown, JSON, Astro components) in the git repository. Re-evaluate when Figma launches a replacement service or when content volume justifies a CMS.

2. **Use the full Cloudflare stack** for dynamic features:
   - **Cloudflare Workers** - serverless functions for form handling and API endpoints
   - **Cloudflare D1** - SQLite database for leads, form submissions, event registrations
   - **Cloudflare R2** - object storage for PDFs (white papers, resources)
   - **Cloudflare Pages** - static site hosting (unchanged from ADR-001)

3. **Use Resend** for transactional emails (confirmations, download links, event reminders).

## Rationale

### Static content over CMS

| Factor | Static files in repo | Payload on Cloudflare Workers |
|--------|---------------------|-------------------------------|
| Cost | $0 | ~$5/month |
| Setup complexity | None | Moderate (D1 adapter, Workers config) |
| Maintenance | Zero | Worker runtime, DB migrations |
| Content editing | Edit Markdown/JSON, git push | Admin UI in browser |
| Content frequency | Weekly at most | Weekly at most |
| Build pipeline | Unchanged | Unchanged |
| Rollback | git revert | CMS versioning |

For 8 pages updated rarely by the site owner (who is also the developer), a CMS adds cost and complexity without meaningful benefit.

### Cloudflare Workers for forms over SaaS form services

| Factor | Cloudflare Workers | Formspree / Typeform |
|--------|-------------------|---------------------|
| Cost | $0 (free tier: 100k requests/day) | $0-50/month |
| Data ownership | D1 database, full control | Third-party storage |
| Customisation | Unlimited | Limited |
| Privacy (Swiss DPA) | Data stays in Cloudflare, configurable regions | Third-party data processing |
| Vendor lock-in | Low (standard JS/Workers API) | Medium |

### Resend for email over alternatives

| Factor | Resend | SendGrid | Mailgun |
|--------|--------|----------|---------|
| Free tier | 100 emails/day | 100 emails/day | 1,000/month (trial) |
| DX | Modern API, TypeScript SDK | Legacy API | Adequate |
| Setup | API key + Worker call | Complex | Adequate |
| Sufficient for Valeris | Yes (< 10 emails/day) | Yes | Yes |

Resend was chosen for its developer experience and simplicity. The volume is minimal - a few contact form confirmations and white paper download links per week.

## Architecture

```
Site Astro (Cloudflare Pages)              Cloudflare Workers (/api/*)
├── /fr/contact/                           ├── POST /api/contact
├── /fr/ressources/whitepaper-xxx/         ├── POST /api/download
├── /fr/evenements/webinaire-xxx/          └── POST /api/register
├── /de/... (mirrors)
└── /en/... (mirrors)                      External Services
                                           ├── Resend (transactional email)
Cloudflare D1                              └── Cal.com (booking widget)
└── leads, submissions, registrations

Cloudflare R2
└── /pdfs/whitepaper-xxx.pdf
```

### Form handling flow

```
Visitor submits form (static HTML, zero JS required)
    |
    v
Cloudflare Worker receives POST
    ├── Validates input (server-side)
    ├── Stores lead in D1
    ├── Sends confirmation email via Resend
    └── Returns redirect to thank-you page

No client-side JavaScript required for basic forms.
Progressive enhancement with JS for validation UX.
```

### Content management flow

```
Lucas edits Markdown/JSON in repo
    |
    v
git push to main
    |
    v
Cloudflare Pages auto-builds
    |
    v
Site live in < 60 seconds
```

## Consequences

### Positive

- **Cost unchanged**: ~CHF 1.50/month (domain only), all Cloudflare services on free tier
- **No external CMS dependency**: no account to manage, no service to monitor
- **Full data ownership**: leads stored in D1, PDFs in R2, all within Cloudflare
- **Swiss DPA compliance**: no third-party form processors, Cloudflare data regions configurable
- **Simplicity**: fewer moving parts, fewer things to break

### Negative

- **No visual content editor**: content changes require editing files and pushing to git
- **No content preview**: must build locally or wait for Cloudflare preview deploy
- **Translation management**: manual sync between FR/DE/EN files (no CMS-enforced parity)
- **Workers Paid may be needed later**: if bundle size exceeds 1 MB free tier limit (unlikely for simple form handlers)

### Neutral

- Payload CMS can be added later without architectural changes (Astro fetches content at build time regardless of source)
- D1 data can be exported/migrated if moving to a CMS with its own database

## Alternatives Considered

| Alternative | Reason Deferred/Rejected |
|------------|--------------------------|
| Payload on Cloudflare Workers + D1 | ~$5/month, moderate setup, overkill for 8 pages |
| Payload on Railway | ~$5/month, separate infra to manage |
| Strapi / Directus | Same problem - needs hosting, adds complexity |
| Astro Content Collections (Markdown only) | Good for pages, but does not solve forms/lead capture |
| Netlify Forms | Vendor lock-in to Netlify, not using Cloudflare |
| Google Forms embedded | Poor UX, brand mismatch, privacy concerns |

## Review Trigger

Re-evaluate this decision when:
- Figma launches a Payload Cloud replacement
- Content volume exceeds 20 pages
- A non-developer needs to edit content
- Lead volume exceeds 100/month (may need a proper CRM)

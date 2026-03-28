# Cloudflare Pages Functions

Server-side API endpoints deployed as Cloudflare Workers alongside the static site.

## Endpoints

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/contact` | POST | Contact form submission (validates Turnstile, sends email via Resend) |

## Secrets

Configured via `npx wrangler pages secret put <NAME> --project-name valeris-website`:

- `RESEND_API_KEY` - Resend email delivery API key
- `TURNSTILE_SECRET_KEY` - Cloudflare Turnstile captcha verification
- `CONTACT_EMAIL` - Destination email for form submissions

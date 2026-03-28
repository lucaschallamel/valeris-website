# Operations - Current State (2026-03-28)

## Deployment
- **Production URL**: https://valeris.fr (+ www.valeris.fr)
- **Pages URL**: https://valeris-website.pages.dev
- **Deploy command**: `npm run deploy` (astro build + wrangler pages deploy)
- **Build**: 40 pages in ~2 seconds
- **CI/CD**: manual deploy via wrangler, GitHub push for source control

## DNS (Cloudflare)
- Nameservers: nova.ns.cloudflare.com, osmar.ns.cloudflare.com
- CNAME @ -> valeris-website.pages.dev (proxied, CNAME flattening)
- CNAME www -> valeris-website.pages.dev (proxied)
- MX valeris.fr -> mta-gw.infomaniak.ch (priority 5) - KSuite email
- MX send -> feedback-smtp.eu-west-1.amazonses.com (priority 10) - Resend
- TXT resend._domainkey (DKIM for Resend)
- TXT send (SPF for Resend)
- CNAME autoconfig/autodiscover -> infomaniak.com (DNS only, for KSuite)
- DNSSEC: disabled (was causing issues during migration)

## Secrets (Cloudflare Pages)
- RESEND_API_KEY: configured
- TURNSTILE_SECRET_KEY: configured
- CONTACT_EMAIL: configured

## Known Issues
- Resend domain verification in progress (was blocked by legacy _domainkey NS records, now fixed)
- DE service pages slightly shorter than FR (partial translations from earlier session)
- No mobile hamburger menu yet
- Publications lead capture not yet built

## Lessons Learned
- Always disable DNSSEC before changing nameservers
- Delete legacy NS records for subdomains when migrating DNS providers
- Turnstile tokens are single-use: always call turnstile.reset() after submission
- Tailwind v4 @apply with responsive variants fails in scoped styles: use native CSS
- Resend needs DKIM, SPF (on send subdomain), and MX (on send subdomain) to verify domain

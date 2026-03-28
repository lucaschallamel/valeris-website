# Operations - Current State (2026-03-28 evening)

## Site
- **URL**: https://valeris.fr (+ www.valeris.fr)
- **Pages**: 44 (11 per language: FR/DE/EN/IT)
- **Build**: ~2 seconds, zero errors
- **Deploy**: `npm run deploy`

## Pages (11 per language)
Home, Services index, AI Governance, Team Performance, Executive Coaching,
Blog (Substack RSS), Publications, Partners (18 partners), About, Contact, Legal

## Infrastructure
- Cloudflare Pages (hosting) + Workers (contact form)
- DNS at Cloudflare (migrated from Infomaniak, DNSSEC disabled)
- KSuite email preserved (MX to mta-gw.infomaniak.ch)
- Resend: domain valeris.fr verified (DKIM fixed by deleting legacy _domainkey NS records)
- Turnstile: site key 0x4AAAAAACw1vy6U50c8ODeg
- Secrets: RESEND_API_KEY, TURNSTILE_SECRET_KEY, CONTACT_EMAIL

## Recent Completions
- Mobile hamburger menu (lg breakpoint, slide-down, service sub-items, language switcher)
- DE/IT service pages audited and completed to 100% match with FR
- Watermark filigrane (2.5% opacity, valeris-icon-black.svg)
- Whitepaper option in contact form (4 languages)
- External links: all open in new tab (rel=noopener noreferrer)
- Opera fix: List component native CSS
- About: trilingue/triculturel, offshore teams, anonymised references

## Technical Debt
- 26 Foxi components not Tailwind v4 adapted (fix when used)
- Substack podcast mapping manual
- Publications lead capture not built
- Some partner logos low-res

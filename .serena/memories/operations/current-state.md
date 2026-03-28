# Operations - Current State (2026-03-28 end of day final)

## Site
- **URL**: https://valeris.fr (+ www.valeris.fr)
- **Pages**: 44 (11 per language: FR/DE/EN/IT)
- **Build**: ~2 seconds
- **SEO score**: ~8/10

## About Page Structure
- "Pourquoi Valeris?" etymology (Latin valeo -> valeris) with logo + warm stone bg
- "Lucas Challamel" teal rounded banner (bg-secondary-600)
- Portrait + narrative, key numbers, career timeline, references, methodology, values
- Diplomas: Master Finance (not MBA), Ingenieur & DEA (not just Ingenieur)
- Bio: 30 years, CTO/CIO Advisory, Region PACA, Top 1% performer

## CTA Buttons (all with SVG icons)
- Calendar icon: "Reserver un echange" -> cal.eu/valeris/30min-meet-and-greet
- Envelope icon: "Contact" -> /contact/
- LinkedIn icon: LinkedIn profile
- Phone icon: +41 78 222 31 59
- Download icon: "Recevoir le livre blanc" on publications

## Infrastructure
- Cloudflare Pages + Workers, DNS at Cloudflare
- Resend verified (Ireland eu-west-1), Turnstile configured
- Cal.eu (EU-hosted, GDPR), CalDAV in progress
- 4 ADRs, 9 dev journal entries, 7 READMEs, 6 ops guides

## Remaining for Launch
- CalDAV Infomaniak connection
- Contact form e2e test
- robots.txt sitemap reference
- www -> non-www redirect
- Analytics, translation review, launch

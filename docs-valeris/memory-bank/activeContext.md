# Active Context - Valeris Coaching Website

## Current Phase

**Phase 2: Polish & Launch** (March-April 2026) - Content complete in 4 languages, infrastructure operational

## Current Focus

- 40 pages live in 4 languages (FR/DE/EN/IT) with full translated content
- Site live at valeris.fr via Cloudflare Pages
- Contact form: Turnstile working, Resend domain verification in progress
- Phone and LinkedIn on all CTA banners
- Next: test contact form e2e, mobile menu, legal content, launch polish

## Recent Decisions

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-28 | Italian as 4th language | Cover Tessin, demonstrate full Swiss coverage |
| 2026-03-28 | Shared CtaBanner component | DRY, phone + LinkedIn in single place across 28 pages |
| 2026-03-28 | Anonymise non-public references | Privacy for Infostrates and Process Creative |
| 2026-03-28 | Native CSS for List component | Opera browser compatibility fix |
| 2026-03-28 | Disable DNSSEC before NS migration | Prevent resolver rejection during transition |
| 2026-03-28 | Delete _domainkey NS records | Allow Cloudflare to serve Resend DKIM |
| 2026-03-27 | Teal secondary palette | Complementary to rose, warm stone neutrals |
| 2026-03-27 | Coach-Craft 4-step methodology | Proprietary method on site |
| 2026-03-27 | "Code is Cattle, Context is King" | Specs + tests = primary assets |

## Next Steps

1. ~~Add Italian language~~ (done)
2. ~~Translate all content to DE/EN/IT~~ (done)
3. ~~DNS migration to Cloudflare~~ (done)
4. ~~Add phone and LinkedIn to CTAs~~ (done)
5. Verify Resend domain, test contact form end-to-end
6. Mobile hamburger menu
7. Cal.com booking widget
8. Legal page content (nDSG, CGU)
9. Lighthouse optimisation (target 95+)
10. Professional photo retouching
11. German and Italian translation review by native speakers
12. Privacy-respecting analytics (Plausible/Fathom)
13. Launch announcement

## Blockers

- Resend domain verification in progress (needed for contact form email delivery)

## Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| German translation quality | Medium | Professional review by native Swiss-German speaker |
| Italian translation quality | Medium | Professional review by native Italian speaker |
| No mobile navigation menu | Medium | Hamburger menu needed before launch |
| Resend domain verification delay | Low | Can test with onboarding@resend.dev temporarily |

# ADR-004: Cal.eu for Online Booking

## Status

**Accepted** - 2026-03-28

## Context

The site needs an online booking system for "Reserver un echange" (30-minute introductory conversations). Requirements:

- Free or very low cost (solo practice)
- GDPR/nLPD compliant (Swiss practice, EU clients)
- Embeddable or linkable from the website
- Calendar synchronisation (Infomaniak KSuite via CalDAV)
- Multi-timezone support (international clients)
- No excessive branding

## Decision

Use **Cal.eu** (European instance of Cal.com) for online appointment booking.

- Account: `cal.eu/valeris`
- Event: `30min-meet-and-greet` (30-minute video call)
- URL: `https://cal.eu/valeris/30min-meet-and-greet`
- Calendar sync: Infomaniak KSuite via CalDAV (`https://sync.infomaniak.com/`)
- Integration: external link from CTA banners and contact page (not embedded widget)

## Rationale

### Cal.eu over Calendly

| Factor | Cal.eu | Calendly |
|--------|--------|----------|
| Servers | EU (Germany, Hetzner) | US only |
| GDPR | Native EU, DPA available | US-first, DPA available |
| Free tier | 1 event type (sufficient) | 1 event type |
| Open source | Yes (MIT) | No |
| Branding | Minimal | "Powered by Calendly" |
| Cookies | Minimal | Tracking cookies |
| Cost | Free | Free (basic) |

### Cal.eu over Cal.com

Cal.eu is the EU-hosted instance of Cal.com. Same product, but data stays in the European Union. More aligned with the site's "zero cookies" and GDPR-first positioning.

### Link over embed

Using an external link (`target="_blank"`) rather than an embedded widget because:
- No additional JavaScript on the site (preserves Lighthouse 95+ score)
- No iframe cookie/privacy concerns
- Cal.eu page is well-designed and mobile-friendly
- Simpler to maintain

## Consequences

### Positive

- Zero additional cost
- GDPR compliant (EU data residency)
- No JavaScript impact on site performance
- Open source alignment
- Professional booking experience

### Negative

- User leaves the site briefly to book (mitigated by new tab)
- CalDAV integration with Infomaniak is in beta on Cal.eu
- Limited to 1 event type on free tier (sufficient for now)

### Neutral

- Can upgrade to Cal.eu paid plan later for multiple event types
- Can switch to embedded widget if needed (Cal.eu provides embed code)

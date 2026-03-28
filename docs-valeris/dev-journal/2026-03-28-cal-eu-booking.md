---
entry_date: 2026-03-28
author: Lucas Challamel
focus_area: Cal.eu online booking integration
status: complete
session_duration: ~30 min
tags: [cal-eu, booking, caldav, infomaniak, gdpr]
---

## Why (High-Level Context)

Fourth session of day 2. The site needed an online booking system for the "Reserver un echange" CTA that appeared on all pages.

**Session Objectives**:

- Choose a GDPR-compliant booking platform
- Create account and configure event type
- Integrate booking link into the website

---

## How (The Journey)

### Platform Selection

Evaluated 5 options: Cal.com, Calendly, TidyCal, SavvyCal, Google Calendar. Selected **Cal.eu** (EU instance of Cal.com) for GDPR compliance (EU data residency, Germany/Hetzner), open source (MIT), free tier, minimal cookies.

### Account Setup

- Account created at `cal.eu/valeris`
- Event type: "30min-meet-and-greet" (30-minute video call)
- Bio: "Technology leadership consultant, Geneva. AI governance, engineering team performance, executive coaching."
- Booking URL: `https://cal.eu/valeris/30min-meet-and-greet`

### Calendar Integration (in progress)

Infomaniak KSuite CalDAV connection:
- CalDAV URL: `https://sync.infomaniak.com/` (not `caldav.infomaniak.com`)
- Username: found via `https://config.infomaniak.com/` (format `abc12345`, not email)
- Cal.eu CalDAV is in beta - connection being configured

### Website Integration

- **CtaBanner** (28 pages): "Reserver un echange" button now links to Cal.eu booking page
- **ContactForm** header: booking button added above the form
- Links open in new tab (`target="_blank"`)
- No embed/iframe (preserves zero-JS, Lighthouse score)

---

## Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Cal.eu over Calendly | EU data residency, open source, minimal cookies | GDPR-first, aligns with zero-cookies declaration |
| Cal.eu over Cal.com | Same product, EU-hosted | Data stays in EU |
| Link over embed | External link in new tab | No JS impact, no iframe privacy concerns |
| ADR-004 written | Documents booking platform choice | Architectural decision for the record |

---

## Final State & Next Steps

**Current State**:
- Booking URL live: `cal.eu/valeris/30min-meet-and-greet`
- Integrated in CTA banners (28 pages) and contact page
- ADR-004 written and indexed

**Next Steps**:
- [ ] Complete CalDAV connection with Infomaniak KSuite
- [ ] Test booking flow end-to-end
- [ ] Update legal page to mention Cal.eu as data processor (EU)

**Knowledge Captured**:
- Infomaniak CalDAV uses `https://sync.infomaniak.com/`, not `caldav.infomaniak.com`
- CalDAV username is NOT the email - find it at `config.infomaniak.com` > Manual synchronization
- Cal.eu CalDAV integration is in beta
- If 2FA is enabled on Infomaniak, need an app-specific password for CalDAV

---

**Session Summary**: Selected Cal.eu (GDPR-compliant, EU-hosted), created booking page, integrated into all CTA banners and contact page.

**Estimated Impact**: High

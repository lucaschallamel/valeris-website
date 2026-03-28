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

### 6. Content and UI Polish (continued session)

**SVG icons on all CTA buttons** (4 languages):
- Calendar icon on "Reserver un echange" booking buttons
- Envelope icon on "Contact" buttons
- LinkedIn logo SVG on all LinkedIn buttons
- Phone icon on telephone number display
- Download icon on "Recevoir le livre blanc" publications buttons
- All icons monochrome white, inline SVG, consistent sizing

**Home page hero** (4 languages):
- Split single button into 2: Calendar "Reserver" -> Cal.eu + Envelope "Contact" -> /contact/
- Previously the button said "Reserver" but went to contact form (misleading)

**Biography updates** (4 languages):
- 25 years -> 30 years experience (20 occurrences across all pages and meta descriptions)
- MBA -> Master (Sciences Po Grenoble, not an MBA programme)
- Added DEA (Diplome d'Etudes Approfondies) / MPhil / Forschungsdiplom to engineering degree
- UBP description rewritten: focus on data protection/anonymisation + data migration (not CHF 160bn)
- CTO Advisory -> CTO/CIO Advisory
- Top 1% key number: added "performer" below
- Photo caption: name + title + LinkedIn button with icon (all 4 languages)
- Anonymised reference: Marseille -> Region PACA (all 4 languages)
- Removed Infostrates and Process Creative logos from about pages

**Contact page**:
- LinkedIn button upgraded to same size/weight as booking button (was smaller/lighter)

---

## Final State & Next Steps

**Current State**:
- 44 pages, 4 languages, all cosmetic changes fully propagated
- Booking URL live: `cal.eu/valeris/30min-meet-and-greet`
- SVG icons on all CTA buttons across the entire site
- ADR-004 written and indexed

**Next Steps**:
- [ ] Complete CalDAV connection with Infomaniak KSuite
- [ ] Test contact form and booking flow end-to-end
- [ ] Update legal page to mention Cal.eu as data processor (EU)
- [ ] Lighthouse audit
- [ ] Analytics setup

**Knowledge Captured**:
- Infomaniak CalDAV uses `https://sync.infomaniak.com/`, not `caldav.infomaniak.com`
- CalDAV username is NOT the email - find it at `config.infomaniak.com` > Manual synchronization
- Cal.eu CalDAV integration is in beta
- If 2FA is enabled on Infomaniak, need an app-specific password for CalDAV
- Heroicons outline SVGs work perfectly as inline monochrome button icons
- LinkedIn logo SVG (filled) from Simple Icons works well alongside outline Heroicons
- Always audit propagation across all 4 languages after FR changes

---

**Session Summary**: Selected Cal.eu (GDPR-compliant, EU-hosted), created booking page, integrated into all CTA banners and contact page.

**Estimated Impact**: High

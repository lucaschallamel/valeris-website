---
entry_date: 2026-03-28
author: Lucas Challamel
focus_area: Proofreading committee fixes, dash removal, coaching diagram, editorial polish
status: complete
session_duration: ~2 hours
tags: [proofreading, dashes, punctuation, context-engineer, editorial, phase2, phase3]
---

## Why (High-Level Context)

Final session of day 2. The quadrilingual proofreading committee had produced a report with 94 observations. This session applied all corrections across 3 phases and made additional editorial improvements.

**Session Objectives**:

- Apply Phase 2 (important) and Phase 3 (suggestions) proofreading fixes
- Remove all separator dashes from the site content
- Update coaching diagram (Technical Lead -> Context Engineer)
- Improve home page services section

---

## How (The Journey)

### 1. Proofreading Phase 2 (Important fixes)

12 non-controversial corrections applied automatically:
- EN: "Who is it for?" question marks (3 pages)
- EN about: PACA -> Southern France, missions -> engagements, industrialised -> automated
- EN about: players -> experimenters, interlocutor -> point of contact, trust reformulation
- EN team-perf: artisanal -> informal processes
- FR about: delivery -> realisation technique, removed "performer" from Top 1%
- FR coaching: self-awareness -> conscience de soi
- DE json: Mitarbeiter -> Mitarbeitende

7 corrections discussed with client:
- FR "plus un actif" -> "ce n'est plus un actif" (decision B)
- FR pipeline bilingual: "Discover (Decouvrir)" etc. (decision C)
- EN methodology: Framing -> Scoping, Support -> Delivery & Transfer (decision A)
- EN "sellable first step" -> "quick win to build momentum" (decision A)
- EN etymology "everything will be fine" -> "you will thrive" (decision A)
- DE about: keep as-is, no German language mention (decision C, Lucas doesn't speak German)
- IT "Svizzera romanda" -> "Svizzera" (decision A)

### 2. Proofreading Phase 3 (Suggestions)

8 suggestions applied:
- FR: cleaned TODO comments from publications
- FR hero: "qui livre" -> "qui fait la difference"
- DE: UTF-8 umlauts in de.json (Uber mich, Praferenz, etc.)
- DE: "Gesamtparcours/Vollstandiger Weg" -> "Gesamtpaket"
- EN: "Western Switzerland" -> "French-speaking Switzerland"
- IT: "+45 pti" -> "+45 pp"
- IT: "Formati di ingaggio" -> "Modalita di collaborazione"
- IT: "Punto di ingresso" -> "Per iniziare"

3 suggestions rejected:
- EN contractions (keep formal tone)
- DE Engagement/Mandat (both correct)
- IT Lugano/Ticino mention (no real presence)

### 3. Dash Removal Campaign

Client dislikes dashes as separators. Full scan by dedicated agent found 33 occurrences across 4 languages. All replaced with proper punctuation:

| Pattern | Replacement | Count |
|---------|------------|-------|
| clause separator " - " | semicolon (;) | 4 |
| contrast " - not" | comma (,) | 8 |
| list intro " - ohne" | colon (:) | 1 |
| parenthetical " - 25 employees" | parentheses () | 4 |
| name separator " - Valeris" | comma (,) | 4 |
| link intro " - <a>" | colon (:) | 8 |
| hero subheadline " - Pas" | period + line break | 4 |
| **Total** | | **33** |

### 4. Home Page Services Redesign

- Title: "Services" -> "Les services que je propose" (4 languages)
- Blocks fully clickable (entire card is an `<a>` tag)
- Icon left-aligned with title (inline flex)
- Extra paragraph with specific deliverables
- Reduced padding between services and CTA
- All French accents corrected

### 5. "Pourquoi Valeris?" Section

- Latin etymology: valeo -> valeris = "tu seras fort"
- Logo fleur+feuilles left, text right, warm stone background
- Lucas Challamel teal rounded banner
- Line break before "Base a Geneve"
- Balanced padding (50/50 warm stone / white)
- Propagated to DE "Warum Valeris?", EN "Why Valeris?", IT "Perche Valeris?"

### 6. Coaching Diagram Update

- Orchestrateur/Orchestrator -> **Technical Lead** (AVANT/BEFORE)
- Ingenieur Systeme/Systems Engineer -> **Context Engineer** (MAINTENANT/NOW)
- Subtitle: "Concevoir les contextes dans lesquels les agents IA produisent la valeur"
- Aligns with "Code is Cattle, Context is King" philosophy
- Propagated to 4 languages

### 7. Biography and Diploma Updates

- 30 years (not 25) across all pages
- Master (not MBA) for Sciences Po Grenoble
- Added DEA/MPhil to engineering degree
- UBP: data protection + data migration (not CHF 160bn)
- CTO/CIO Advisory (not just CTO Advisory)
- Region PACA (not Marseille) for anonymised reference
- Photo caption: name + title + LinkedIn icon

---

## Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| FR hero headline | "qui fait la difference" | "qui livre" was an anglicisme |
| EN methodology steps | Scoping + Delivery & Transfer | More natural in EN consulting |
| EN etymology | "you will thrive" | Stronger than "everything will be fine" |
| German language mention | Keep as-is | Lucas doesn't speak German |
| No contractions in EN | Keep formal | Client preference |
| Technical Lead -> Context Engineer | Replace diagram | Aligns with context engineering philosophy |
| No more dashes anywhere | Replace with proper punctuation | Client preference, 33 occurrences removed |

---

## Final State & Next Steps

**Current State**:
- 44 pages, 4 languages, all proofreading corrections applied
- 94 observations from committee: 39 applied, 3 rejected (with rationale)
- Zero separator dashes remaining in content
- Home page redesigned with clickable service cards
- "Pourquoi Valeris?" etymology section on all about pages
- Technical Lead -> Context Engineer diagram

**Remaining for Launch**:
- [ ] Complete CalDAV Infomaniak connection for Cal.eu
- [ ] Test contact form end-to-end
- [ ] Lighthouse full audit
- [ ] Privacy-respecting analytics (Plausible/Fathom)
- [ ] German and Italian native speaker review (optional refinement)
- [ ] Launch announcement

---

**Session Summary**: Applied 39 proofreading fixes across 3 phases, removed 33 separator dashes, redesigned home services, added "Pourquoi Valeris?" etymology, updated coaching diagram to Context Engineer.

**Estimated Impact**: Very High

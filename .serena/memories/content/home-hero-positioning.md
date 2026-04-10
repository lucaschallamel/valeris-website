# Home Hero Positioning (2026-04-10)

## Target audience

The home hero subheadline addresses **both private enterprises and public sector organisations**. Not Swiss-only, not private-sector-only.

## Evolution

- **Original** (March 2026): "J'aide les entreprises suisses" — Swiss private sector only
- **2026-04-10 morning**: dropped "suisses" to include French and other European private-sector clients
- **2026-04-10 afternoon**: added public administrations to explicitly address the public sector

## Current subheadline by language

| Lang | Text |
|------|------|
| FR | J'aide les entreprises et les administrations publiques à réussir leur transformation technologique. Pas seulement la stratégie, mais l'exécution. |
| DE | Ich helfe Unternehmen und öffentlichen Verwaltungen, ihre Technologie-Transformation erfolgreich umzusetzen. Nicht nur die Strategie, sondern auch die Umsetzung. |
| EN | I help enterprises and public sector organisations get technology transformation right. Not just the strategy, but the execution. |
| IT | Aiuto le imprese e le amministrazioni pubbliche a realizzare la loro trasformazione tecnologica. Non solo la strategia, ma l'esecuzione. |

## Translation notes for future edits

- **DE**: "helfen" takes the dative case, so use dative plural "öffentlichen Verwaltungen" when listing after "Ich helfe Unternehmen und...".
- **EN**: prefer "public sector organisations" (en-AU spelling) over the direct "public administrations" which reads stilted in English business register.
- **IT**: repeat the definite article when enumerating plural nouns: "le imprese e le amministrazioni pubbliche", not "le imprese e amministrazioni pubbliche".
- **FR**: definite article repetition optional but present here: "les entreprises et les administrations publiques".

## Where the text lives

The home hero subheadline is **hardcoded** in each of the 4 language index files, NOT sourced from `src/i18n/*.json` (there is a `hero.subheadline` key in the JSON files but it is unused by the home page — dead code):

- `src/pages/index.astro` (FR, root)
- `src/pages/de/index.astro`
- `src/pages/en/index.astro`
- `src/pages/it/index.astro`

All four sit at line 23 under the `<Section id="hero">` block. Any future edit must touch all 4 files; there is no shared component for this string.

## Scope discipline

Only the home hero subheadline reflects this broadened positioning. The following remain intentionally more targeted and should NOT be changed without explicit instruction:

- Meta descriptions in `src/i18n/*.json`: still mention "Swiss enterprises" for SEO targeting
- Service pages: FINMA, nDSG, Swiss regulatory context is substantive for regulated sectors
- About page: Swiss professional history is biographical fact
- Publications: the AI sovereignty white paper is targeted at Swiss enterprises by design
- Legal pages: Swiss law as governing jurisdiction is a binding fact

The home page is where broad positioning lives; deeper pages can remain targeted.

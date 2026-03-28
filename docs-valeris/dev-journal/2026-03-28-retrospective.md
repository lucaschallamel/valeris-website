---
entry_date: 2026-03-28
author: Lucas Challamel
focus_area: Retrospective - how we built a quadrilingual website in under 24 hours
status: complete
session_duration: retrospective
tags: [retrospective, methodology, acceleration, lessons-learned]
---

## Retrospective : de zero a production en moins de 24 heures

### Contexte

Le 27 mars 2026 a 14h, le repository etait vide. Le 28 mars a 13h, le site valeris.fr etait en production avec 44 pages en 4 langues, SEO complet, blog federe, formulaire de contact, booking, 18 partenaires, mentions legales, et une relecture quadrilingue terminee.

### Les 8 facteurs de succes

**1. Decisions architecturales rapides et definitives**

Stack choisi en 30 minutes (Astro + Cloudflare). Payload CMS ecarte en 5 minutes quand on a vu que c'etait ferme. Foxi choisi en un echange. Chaque decision documentee dans une ADR, puis on avancait. Pas de paralysis by analysis.

**2. Composants partages des le depart**

CtaBanner, BlogGrid, ContactForm, PartnersGrid, SeoSchema : un composant, 4 langues. Chaque amelioration (telephone, LinkedIn, icones) se propageait automatiquement a 28-44 pages. Jamais 44 fichiers edites a la main pour un changement de bouton.

**3. Scripts de propagation systematiques**

Python et sed pour les modifications en masse. Validation en FR, propagation aux 3 autres langues en quelques secondes. Pas de copier-coller manuel.

**4. Deploy continu et feedback visuel immediat**

`npm run deploy` en une commande (build + deploy < 5 secondes). Resultat visible en production en moins de 10 secondes. Pas de cycles "je fais, j'attends, je verifie" : validation visuelle et on enchainait.

**5. Agents en parallele**

Taches lourdes (traduction 24 pages, audit SEO, relecture 4 langues, scan des tirets) lancees en agents background pendant qu'on travaillait sur autre chose. Le comite de relecture quadrilingue (4 agents, 44 pages, 94 observations) a tourne en 2 minutes.

**6. Documentation en continu**

10 dev journal entries ecrites au fil de l'eau. Memoires Serena et Memory Bank mises a jour apres chaque session. Contexte preservee pour les futures sessions.

**7. Un interlocuteur qui sait ce qu'il veut**

Decisions rapides : "oui", "non", "option A". Screenshots et instructions claires quand quelque chose ne convenait pas. Zero ambiguite. Facteur humain le plus important.

**8. Pas de perfectionnisme premature**

Construction dans l'ordre : scaffolding, contenu, design, SEO, relecture. Pas de polish avant que le contenu soit la. Chaque phase "good enough" avant de passer a la suivante.

### Techniques les plus efficaces

| Technique | Gain estime |
|-----------|------------|
| Composants partages (1 edit = 44 pages) | 10x |
| Agents paralleles (traduction, relecture) | 4x |
| Deploy < 5 secondes | 3x |
| Scripts sed/python de propagation | 5x |
| Decisions rapides | 2x |

### Ce qu'on ferait differemment

- Tailwind v4 des le depart (au lieu d'adapter Foxi v3, temps perdu sur @apply et @reference)
- Accents FR dans les meta descriptions des le premier jour
- Domaine .fr vs .ch clarifie plus tot

### Le resultat en chiffres

| Metrique | Valeur |
|----------|--------|
| Temps total | < 24 heures |
| Pages | 44 (11 x 4 langues) |
| Commits | ~40 |
| Deploiements | ~30 |
| ADRs | 4 |
| Dev journal entries | 11 (incluant cette retrospective) |
| Corrections de relecture | 39 |
| Tirets supprimes | 33 |
| Cout mensuel | CHF 1.50 |
| Agents utilises | 15+ (traduction, SEO, relecture, scan) |

### La cle

La boucle courte : **decider, implementer, deployer, voir, ajuster**. En moins d'une minute a chaque iteration. Multipliee par 30+ deploiements en une journee.

---

**Session Summary**: Retrospective methodologique documentant comment un site quadrilingue de 44 pages a ete construit de zero a production en moins de 24 heures.

**Estimated Impact**: Reference methodologique pour les projets futurs

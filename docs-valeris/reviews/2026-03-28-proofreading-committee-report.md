# Comite de relecture quadrilingue - Rapport de synthese

**Date** : 28 mars 2026
**Methode** : 4 agents specialises en parallele (FR Romandie, DE Deutschschweiz, EN Anglo-Saxon, IT Ticino)
**Perimetre** : 44 pages, 4 fichiers i18n, composants partages, donnees partenaires

---

## Vue d'ensemble

| Langue | Agent | Critiques | Importants | Suggestions | Qualite |
|--------|-------|:---------:|:----------:|:-----------:|---------|
| FR | Suisse romande | 6 | 12 | 8 | Bonne |
| DE | Deutschschweiz | 5 | 8 | 10 | Tres bonne |
| EN | Anglo-Saxon | 3 | 13 | 12 | Bonne |
| IT | Ticino | 4 | 6 | 7 | Bonne |
| **Total** | | **18** | **39** | **37** | |

---

## CRITIQUES - Toutes langues

### Transversal

| # | Probleme | Langues | Statut |
|---|---------|---------|--------|
| T1 | **Domaine valeris.fr** : CLAUDE.md disait valeris.ch, site utilise valeris.fr. Decision : valeris.fr est correct (societe francaise). CLAUDE.md mis a jour. | Toutes | Resolu |
| T2 | **Abbreviations legales non traduites** dans les mentions legales : nLPD/RGPD/al./let. utilises dans les 4 langues au lieu des equivalents locaux | DE, EN, IT | A corriger |

### Francais (FR)

| # | Page | Probleme | Correction |
|---|------|----------|------------|
| FR-C1 | fr.json | **Accents manquants** dans toutes les meta descriptions (visible dans Google) | Ajouter tous les accents |
| FR-C2 | mentions-legales | **"oeuvre" sans ligature** : "mis en oeuvre" | "mis en oeuvre" (ligature oe) |
| FR-C3 | mentions-legales | **"Siege" et "Etats"** sans accents | "Siege social aux Etats-Unis" |
| FR-C4 | mentions-legales | nLPD vs nDSG incoherent avec les pages services (qui utilisent nDSG) | Harmoniser |

### Allemand (DE)

| # | Page | Probleme | Correction |
|---|------|----------|------------|
| DE-C1 | impressum | **Abbreviations francaises** dans le tableau legal : nLPD, RGPD, al., let. | nDSG, DSGVO, Abs., lit. |
| DE-C2 | ueber-mich | **Tippfehler "zunachst"** (ni umlaut ni ASCII) | "zunaechst" ou "zunachst" |
| DE-C3 | ueber-mich | **Umlauts inconsistants** : melange ASCII (ae/oe/ue) et UTF-8 (ae/oe/ue) | Unifier en UTF-8 |
| DE-C4 | de.json | **"Ueber mich"** en ASCII dans la navigation | "Uber mich" en UTF-8 |

### Anglais (EN)

| # | Page | Probleme | Correction |
|---|------|----------|------------|
| EN-C1 | legal | **"nLPD" et "RGPD"** : abbreviations francaises | nFADP/nDSG et GDPR |
| EN-C2 | legal | **"Publication director"** : concept juridique francais sans equivalent | "Editorial responsibility" |
| EN-C3 | legal | **"al." et "let."** : abbreviations francaises | "para." et "lit." |

### Italien (IT)

| # | Page | Probleme | Correction |
|---|------|----------|------------|
| IT-C1 | Partout | **"leadership tecnologico"** : genre incorrect (feminin en italien) | "leadership tecnologica" |
| IT-C2 | chi-sono, i18n | **Accents manquants** : "maturita", "Piu" | "maturita", "Piu" |
| IT-C3 | governance-ia | **"nDSG"** au lieu de "nLPD" (incoherent avec note-legali) | Harmoniser a "nLPD" |
| IT-C4 | Partout | **Forme "voi"** vs "Lei" : le briefing demande "voi", mais "Lei" serait plus naturel en Ticino B2B | Garder "voi" (choix delibere) |

---

## IMPORTANTS - Toutes langues

### Francais (FR)

| # | Page | Probleme | Correction proposee |
|---|------|----------|---------------------|
| FR-I1 | a-propos | "performer" (anglicisme) | "collaborateur le plus performant" ou supprimer |
| FR-I2 | perf-equipes | "plus un actif" ambigu | "ce n'est plus un actif" |
| FR-I3 | gouvernance-ia | Pipeline en anglais (Discover/Tokenise/Augment/Apply) | Ajouter traduction FR entre parentheses |
| FR-I4 | fr.json | "Whitepaper" au lieu de "Livre blanc" | "Livre blanc : Souverainete IA" |
| FR-I5 | a-propos | "delivery technique" non traduit | "realisation technique" |
| FR-I6 | coaching-executif | "self-awareness" non traduit | "conscience de soi" |
| FR-I7 | PartnersGrid | "delivrer l'excellence" (faux ami) | "atteindre l'excellence" |
| FR-I8 | a-propos | "P&L" non explicite | "resultats financiers (P&L)" |
| FR-I9 | Metriques | "turnover", "time to market", "lead time" sans traduction | Ajouter traduction entre parentheses |
| FR-I10 | hero headline | "livrer" au sens de "deliver" est un anglicisme | Optionnel : "qui fait la difference" |
| FR-I11 | mentions-legales | "e-mail" vs "courriel" incoherent | Garder tel quel (niveaux de formalite differents) |
| FR-I12 | publications | Commentaires TODO dans le code HTML | Nettoyer avant lancement |

### Allemand (DE)

| # | Page | Probleme | Correction proposee |
|---|------|----------|---------------------|
| DE-I1 | ueber-mich | Italienisch erwaehnt mais pas Deutsch | Ajouter Deutsch dans les competences linguistiques |
| DE-I2 | team-performance | "Onion-Model" non explique | "Zwiebel-Modell" ou explication |
| DE-I3 | team-performance | "Realitaten vor Ort" (gallicisme) | "Praxis-Erfahrungen" |
| DE-I4 | executive-coaching | "Gebrauchsanweisung" (traduction litterale) | "Rustzeug" ou "Orientierungshilfe" |
| DE-I5 | de.json | "Mitarbeiter" vs "Mitarbeitende" (inconsistant) | Unifier a "Mitarbeitende" |
| DE-I6 | partners.ts | "valeris.fr" dans descriptions partenaires | Harmoniser avec domaine reel |
| DE-I7 | executive-coaching | "Flugbahn" (gallicisme de "trajectoire") | "Weichenstellung" ou "Kursrichtung" |
| DE-I8 | ueber-mich | "30 Jahre" vs dates de carriere (1997 = 29 ans) | Verifier, "30+" est acceptable |

### Anglais (EN)

| # | Page | Probleme | Correction proposee |
|---|------|----------|---------------------|
| EN-I1 | about | "scarcity of the interlocutor" (gallicisme) | "single, senior point of contact" |
| EN-I2 | about | "relationship of trust over additional contract" | "lasting relationship than chase another contract" |
| EN-I3 | about | "players" au sens de "joueurs" (faux sens) | "casual experimenters" |
| EN-I4 | about | "industrialised CI/CD pipelines" | "automated CI/CD pipelines" |
| EN-I5 | about | "Framing" (methodologie) | "Scoping" |
| EN-I6 | about | "Support" (methodologie) | "Delivery & Transfer" |
| EN-I7 | services | "Who is it for" sans point d'interrogation | "Who is it for?" |
| EN-I8 | team-perf | "artisanal processes" (faux sens en EN) | "informal processes" |
| EN-I9 | services-index | "SDD" acronyme introduit sans explication | Supprimer acronyme de l'overview |
| EN-I10 | team-perf | "sellable first step" | "quick win to build momentum" |
| EN-I11 | about | "Coaching and transformation missions" | "engagements" ou "case studies" |
| EN-I12 | about | "PACA region" inconnu des anglophones | "Provence, France" ou "Southern France" |
| EN-I13 | about | "everything will be fine" (faible apres etymologie) | "you will thrive" |

### Italien (IT)

| # | Page | Probleme | Correction proposee |
|---|------|----------|---------------------|
| IT-I1 | Plusieurs | "relais" (francesisme) x2 | "testimone" ou "subentrano" |
| IT-I2 | coaching-dirigenti | "DRH" (abbreviation francaise) | "HR Director" ou "Direttore HR" |
| IT-I3 | coaching-dirigenti | "DSI" (abbreviation francaise) | "CIO" |
| IT-I4 | governance-ia | "nDSG" vs "nLPD" incoherent | Harmoniser a "nLPD" |
| IT-I5 | it.json | "Svizzera romanda" exclut le Ticino | Ajouter mention du Ticino |
| IT-I6 | governance-ia | "cybersicurezza" (neologisme rare) | "cybersecurity" ou "sicurezza informatica" |

---

## SUGGESTIONS - Selection des plus pertinentes

| # | Langue | Suggestion |
|---|--------|------------|
| S1 | FR | Hero headline : "qui livre" -> "qui fait la difference" (optionnel) |
| S2 | FR | Nettoyer les commentaires TODO du code source |
| S3 | DE | "Parcours" -> "Gesamtpaket" (gallicisme) |
| S4 | DE | "Engagement" -> "Mandat" (plus suisse) |
| S5 | DE | UTF-8 umlauts dans de.json (pas ASCII) |
| S6 | EN | Utiliser des contractions (I've, don't) pour un ton plus chaleureux |
| S7 | EN | "Western Switzerland" -> "French-speaking Switzerland" |
| S8 | EN | Citations anonymes : ajouter au minimum l'industrie |
| S9 | IT | "Formati di ingaggio" -> "Modalita di collaborazione" |
| S10 | IT | "Punto di ingresso" -> "Per iniziare" ou "Primo passo" |
| S11 | IT | "+45 pti" -> "+45 pp" (abbreviation standard) |
| S12 | IT | Mentionner Lugano/Ticino dans la page contact IT |

---

## Points forts unanimes

Tous les relecteurs soulignent :

1. **Ton consensuel et professionnel** - adapte au marche suisse, pas de superlatifs americains
2. **Vouvoiement/Sie-Form** coherent et correct
3. **Prix en CHF** avec format suisse
4. **References reglementaires** suisses (FINMA, nDSG) correctes
5. **Contenu factuel** avec chiffres et metriques verifiables
6. **Orthographe britannique** (EN) correctement appliquee
7. **Eszett-Regel** (DE) systematiquement respectee (ss pas sz)
8. **Gendergerechte Sprache** (DE) avec "Mitarbeitende", "Fuhrungskrafte"

---

## Plan d'action recommande

### Phase 1 - Critique (avant lancement)
- [ ] Accents dans fr.json (meta descriptions)
- [ ] "leadership tecnologica" (IT, 6+ occurrences)
- [ ] Abbreviations legales (DE: nDSG/DSGVO, EN: GDPR/nFADP, IT: nLPD)
- [ ] "Publication director" -> "Editorial responsibility" (EN legal)
- [ ] Ligature "oeuvre" (FR legal)

### Phase 2 - Important (premiere semaine)
- [ ] Gallicismes FR : delivrer, self-awareness, delivery, performer
- [ ] Gallicismes DE : Gebrauchsanweisung, Realitaten vor Ort, Flugbahn
- [ ] Gallicismes EN : interlocutor, artisanal, missions, PACA
- [ ] Francesismes IT : relais, DRH, DSI, cybersicurezza
- [ ] UTF-8 umlauts dans de.json et pages DE
- [ ] "Who is it for?" (question mark EN)

### Phase 3 - Polish (avant la semaine 2)
- [ ] Suggestions editoriales (ton, formulations alternatives)
- [ ] Nettoyage TODO comments
- [ ] Ajout mention Ticino/Lugano (IT)

---

*Rapport genere par 4 agents specialises en parallele. Temps total de revue : ~2 minutes (4 x 30s en parallele). Pages analysees : 44. Fichiers i18n : 4. Composants : 2.*

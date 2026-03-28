# Progress - Valeris Coaching Website

## Completed Milestones

### 2026-03-27 - Project Inception
- [x] Architecture brainstorming with 3 specialised agents
- [x] Stack decision: Astro + Cloudflare Pages
- [x] Architecture Decision Records (ADR-001, ADR-002, ADR-003)

### Sprint 0: Scaffolding - COMPLETE
- [x] Git repository, CLAUDE.md, README.md
- [x] Astro 6.x, i18n, Cloudflare Pages deployment
- [x] Foxi components, Tailwind v4, brand assets

### Sprint 0.5: Design System + Integrations - COMPLETE
- [x] Blog (31 articles from Substack + manual entries, all with images)
- [x] Contact form (Resend + Turnstile)
- [x] Teal palette + warm stone neutrals

### Sprint 0.75: Content Scaffolding - COMPLETE
- [x] All 30 pages scaffolded (FR/DE/EN)
- [x] French accent spell-check
- [x] CTA rectangles, banners, reduced padding, enhanced footer

### Sprint 1: Real FR Content - COMPLETE
- [x] **About page**: photo (B&W), career narrative (NAB/Azqore/UBP/Talan/Infostrates), key numbers, timeline, 6 certifications, 3 references with metrics + quotes, methodology, values
- [x] **AI Governance**: 7-axis maturity model, sovereignty (3 zones), AI FinOps, DADA framework, certifications, 4 packages (CHF 8.5K-40K), anonymised UBP reference
- [x] **Team Performance**: Coach-Craft method, "Code is Cattle" manifesto, SDD, 4 legacy pain points, SDLC Assessment, 5 packages (CHF 5.5K-55K), Infostrates metrics
- [x] **Executive Coaching**: Vantaset Performance-OS, "AI is infrastructure" framing, system engineering insight, Augmented Scrum, 4 packages (CHF 1.5K-28K), NAB metrics + 2 C-suite quotes
- [x] **Services index**: enriched descriptions with real methodology names
- [x] Blog fixes: 2 miscategorised articles corrected, 11 manual entries added
- [x] Commit: `00ba966` pushed to main

## Upcoming

### Sprint 2: DE/EN Propagation + Polish (April 2026 Week 1-2)
- [ ] Propagate enriched FR content to DE and EN pages
- [ ] Deploy and test contact form end-to-end
- [ ] Custom domain valeris.fr connected
- [ ] Mobile hamburger menu
- [ ] Cal.com booking widget on contact page
- [ ] Legal page content (nDSG, CGU)

### Sprint 3: Launch (April 2026 Week 3)
- [ ] Professional photo retouching
- [ ] Mobile responsive testing
- [ ] Lighthouse optimisation (target 95+)
- [ ] Privacy-respecting analytics (Plausible/Fathom)
- [ ] German translation review by native speaker
- [ ] Launch

## Technical Debt
- 26 Foxi components not yet Tailwind v4 adapted (fix when used)
- Substack podcast mapping is manual (src/lib/podcasts.ts)
- No mobile navigation menu (hamburger)
- DE/EN content pages are scaffolded but not enriched

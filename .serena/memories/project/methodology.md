# Accelerated Development Methodology

## How we built 44 pages in 4 languages in under 24 hours

### Key techniques (by impact)
1. **Shared components** (10x): CtaBanner, BlogGrid, ContactForm, PartnersGrid - 1 edit = 44 pages
2. **Script propagation** (5x): Python/sed for mass changes across languages
3. **Parallel agents** (4x): translation, SEO audit, proofreading committee, dash scan - all in background
4. **Continuous deploy** (3x): npm run deploy < 5 seconds, immediate visual feedback
5. **Fast decisions** (2x): client decides quickly, no debate loops

### Build order (no premature polish)
scaffolding -> content -> design -> SEO -> proofreading

### Boucle courte
Decide -> implement -> deploy -> see -> adjust. Under 1 minute per iteration. 30+ deployments in one day.

### What to improve next time
- Choose Tailwind v4 from start (not adapt v3 components)
- French accents from day 1 in meta descriptions
- Clarify domain (.fr vs .ch) before starting

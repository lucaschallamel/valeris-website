# Components

Shared Astro components used across all pages and languages.

## Custom Components

| Component | Purpose | Used on |
|-----------|---------|---------|
| `CtaBanner.astro` | Phone + LinkedIn + Contact CTA | 28 pages (all except blog/contact) |
| `ContactForm.astro` | Turnstile captcha, 9 fields, Resend | 4 contact pages |
| `BlogGrid.astro` | Substack RSS, 5 podcast filters | 4 blog pages |
| `PartnersGrid.astro` | 18 partners, 5 categories, logos | 4 partner pages |

## Foxi UI Components (`ui/`)

Adapted from the Foxi Astro theme for Tailwind v4. Key components: Section, Row, Col, Button, List, Feature, MetricBar, Accordion, Modal, Card, Form fields.

**Tailwind v4 note**: components using `@apply` need `@reference "../../styles/global.css"` in their `<style>` block. Responsive variants (`lg:`, `md:`) must use native `@media` queries.

## Foxi Blocks (`blocks/`)

Page-level sections from Foxi. Most are not yet adapted for Tailwind v4 (fix when used). Currently unused blocks: HomeCTA, FeatureCards, PricingColumns, etc.

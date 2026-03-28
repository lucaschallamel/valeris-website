# SEO Implementation (2026-03-28)

## Components
- `SeoSchema.astro`: JSON-LD structured data (ProfessionalService, Person, Service)
- BaseLayout: canonical, OG, Twitter Card, preload fonts

## Meta Descriptions
- Stored in i18n JSON: `i18n.site.descriptions.{pageName}`
- 11 keys: home, services, aiGovernance, teamPerformance, executiveCoaching, blog, publications, partners, about, contact, legal
- Passed via `description={i18n.site.descriptions.xxx}` prop on BaseLayout
- 150-160 chars with geographic keywords

## JSON-LD
- ProfessionalService on ALL pages (base schema)
- Person schema when seoType="about"
- Service schema when seoType="service"
- Address: Geneva, CH (geo: 46.2044, 6.1432)
- Price range: CHF 1500-75000
- sameAs: LinkedIn, Substack

## Font Preloading
- Critical fonts in /public/fonts/ (stable URLs, no hash)
- Preload: CerebriSans-Regular.woff2, Montserrat-Variable.woff2
- font-display: swap (critical), optional (italic)

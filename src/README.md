# Source Code

Astro 6.x application with Tailwind CSS v4 and Foxi component library.

## Structure

```
src/
├── assets/             # Logos (SVG), fonts (WOFF2), images (WebP/JPG)
│   ├── fonts/          # Cerebri Sans + Montserrat (subset Latin, WOFF2)
│   ├── logos/          # Valeris logos + client logos + partner logos
│   └── *.webp/jpg      # White paper cover, portrait photo
├── components/         # Shared Astro components
│   ├── ui/             # Foxi UI primitives (Section, Row, Col, Button, List...)
│   ├── blocks/         # Foxi page blocks (Hero, CTA, Features, FAQ...)
│   ├── scripts/        # Client-side scripts (analytics, mode switcher)
│   ├── BlogGrid.astro  # Substack RSS federation with podcast filters
│   ├── ContactForm.astro # Turnstile captcha + Resend email
│   ├── CtaBanner.astro # Phone + LinkedIn + Contact CTA (used on 28 pages)
│   └── PartnersGrid.astro # 18 partners, 5 categories, filterable cards
├── config/             # Site config, navigation, analytics, social links
├── data/               # Partners data with 4-language descriptions
├── i18n/               # Translation strings (fr.json, de.json, en.json, it.json)
├── icons/              # Custom SVG icons (check-circle)
├── layouts/            # BaseLayout with header, footer, mobile menu, i18n
├── lib/                # Substack RSS parser + podcast categorisation
├── pages/              # Route pages (FR at root, DE/EN/IT under prefix)
└── styles/             # Tailwind v4 theme, @font-face, watermark
```

## Key Patterns

- **i18n**: FR pages at root (`/`), others under `/de/`, `/en/`, `/it/`
- **Tailwind v4**: `@reference` required in scoped styles, native CSS for responsive
- **Shared components**: CtaBanner, BlogGrid, ContactForm, PartnersGrid reduce duplication

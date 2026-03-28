# Partners Management

## Overview

The Partners page displays technology, business, and certification partners as filterable cards with logos. The page is shared across all 4 languages via the `PartnersGrid` component.

| Component | Location |
|-----------|----------|
| Partner data | `src/data/partners.ts` |
| Grid component | `src/components/PartnersGrid.astro` |
| Logo assets | `src/assets/logos/partners/` |
| Pages | `/partenaires/`, `/de/partner/`, `/en/partners/`, `/it/partner/` |

## Adding a New Partner

### Step 1: Prepare the logo

- Place the logo file in `src/assets/logos/partners/`
- Naming convention: `partner-name.png` (lowercase, hyphenated)
- Preferred format: PNG with transparent background
- Acceptable formats: PNG, JPG, WebP, SVG
- Recommended size: 200-400px wide (Astro optimises automatically)
- Logos display grayscale by default, colour on hover

### Step 2: Add the logo import

In `src/components/PartnersGrid.astro`, add a static import at the top (Astro requires static imports for image optimisation):

```typescript
import logoNewPartner from '../assets/logos/partners/new-partner.png';
```

### Step 3: Add the logo to the lookup map

In the same file, find the `logoMap` object and add the entry:

```typescript
const logoMap: Record<string, ImageMetadata> = {
  // ... existing entries
  'new-partner': logoNewPartner,
};
```

### Step 4: Add the partner data

In `src/data/partners.ts`, add a new entry to the `partners` array:

```typescript
{
  slug: 'new-partner',
  name: 'Partner Display Name',
  category: 'technology', // one of: business, technology, tools, certifications, standards
  url: 'https://www.partner-website.com',
  logoPath: 'new-partner', // must match the key in logoMap
  descriptions: {
    fr: 'Description en francais du partenaire et de la relation.',
    de: 'Beschreibung des Partners und der Beziehung auf Deutsch.',
    en: 'Description of the partner and the relationship in English.',
    it: 'Descrizione del partner e della relazione in italiano.',
  },
},
```

### Step 5: Build and verify

```bash
npm run build    # Verify no errors
npm run dev      # Check visually at /partenaires/
npm run deploy   # Deploy to production
```

## Partner Categories

| Category | Slug | Description |
|----------|------|-------------|
| Business | `business` | Consulting firms, strategic alliances |
| Technology | `technology` | Cloud providers, infrastructure, hosting |
| Tools | `tools` | AI models, development tools, productivity |
| Standards | `standards` | Architecture and governance frameworks |
| Certifications | `certifications` | Professional certification bodies |

## Modifying a Partner

Edit the partner entry in `src/data/partners.ts`. Changes to descriptions, URL, or category take effect on next build. To change the logo, replace the file in `src/assets/logos/partners/` (keep the same filename).

## Removing a Partner

1. Remove the entry from the `partners` array in `src/data/partners.ts`
2. Remove the import line in `src/components/PartnersGrid.astro`
3. Remove the entry from the `logoMap` object
4. Optionally delete the logo file from `src/assets/logos/partners/`

## Logo Size Overrides

Some logos render too small or too large at the default size. The `PartnersGrid` component has a `logoSizeOverrides` map for per-partner size adjustments:

```typescript
const logoSizeOverrides: Record<string, string> = {
  'obsidian': 'h-11',   // slightly larger
  'azure': 'h-12',      // larger
};
```

Default logo size is `h-10` (2.5rem). Add entries to this map if a logo needs a different height.

## Current Partners (18)

| Partner | Category | Logo file |
|---------|----------|-----------|
| Talan SA | Business | `talan.png` |
| RegData | Business | `regdata.jpg` |
| Cloudflare | Technology | `cloudflare.png` |
| Resend | Technology | `resend.jpg` |
| Infomaniak | Technology | `infomaniak.png` |
| Microsoft Azure | Technology | `azure.png` |
| Apple | Technology | `apple.png` |
| Astro | Technology | `astro.png` |
| OpenCode | Tools | `opencode.png` |
| Anthropic Claude | Tools | `anthropic.png` |
| NVIDIA | Tools | `nvidia.png` |
| Ollama | Tools | `ollama.png` |
| Obsidian | Tools | `obsidian.jpg` |
| TOGAF | Standards | `togaf.png` |
| ISO 42001 | Standards | `iso.png` |
| GAICC | Certifications | `gaicc.webp` |
| IAPP AIGP | Certifications | `iapp.png` |
| ICF | Certifications | `icf.jpg` |

## Troubleshooting

### Logo not appearing

- Verify the file exists in `src/assets/logos/partners/`
- Verify the import is added in `PartnersGrid.astro`
- Verify the `logoPath` in partners.ts matches the key in `logoMap`
- Run `npm run build` and check for import errors

### Logo too small or cropped

- Add a size override in the `logoSizeOverrides` map
- Check if the source image has excessive whitespace (crop it)

### Partner not in correct category

- Check the `category` field in `src/data/partners.ts`
- Valid values: `business`, `technology`, `tools`, `certifications`, `standards`

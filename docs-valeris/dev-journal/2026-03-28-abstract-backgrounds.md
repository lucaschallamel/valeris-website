---
entry_date: 2026-03-28
author: Lucas Challamel
focus_area: Abstract background images on hero banners
status: complete
session_duration: ~1 hour
tags: [visuals, diffusion, webp, css, randomisation, performance]
---

## Why (High-Level Context)

Add diffusion-generated abstract images as subtle background textures on hero banners across all pages, to enhance visual identity without impacting performance.

## How (The Journey)

### Image Preparation
- 5 abstract PNG images (1.3-2.1 MB each) converted to WebP via `cwebp`
- Resize to 1920px wide, quality 75
- Result: 74-185 KB per image (93% reduction)
- Stored in `/public/images/abstract/` (static, no Astro processing)

### Section Component Enhancement
- Added `abstractBg` boolean prop to `Section.astro`
- Renders a `<div data-abstract-bg>` overlay with `opacity: 0.1`, `pointer-events: none`, `position: absolute`
- Client-side JS randomises the image on each page load (picks 1 of 5)
- Zero performance impact: images lazy-loaded by browser, JS is 4 lines

### Application
- **28 content pages** (7 pages x 4 languages): `abstractBg` on first hero Section
- **BlogGrid**: `abstractBg` on teal banner
- **PartnersGrid**: `abstractBg` on teal banner
- **ContactForm**: manual `data-abstract-bg` div (not a Section component), `bg-white` on form section below to prevent bleed

### Opacity Journey
- Started at 0.03 (too subtle, invisible)
- Tested 0.08
- Settled on **0.1** (visible but not distracting)

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| Client-side randomisation | Astro is static, build-time random would be fixed |
| `/public/` not `/src/assets/` | No Astro image processing needed, direct serving |
| WebP at 1920px | Balance quality vs size, 93% reduction from PNG |
| opacity 0.1 | Visible texture without competing with text |
| bg-white on contact form section | Prevents abstract bg bleed into form area |

---

**Session Summary**: Added 5 abstract diffusion images as randomised background textures on all hero banners (28 content pages + blog + partners + contact), with 0.1 opacity and zero performance impact.

**Estimated Impact**: Medium (visual polish)

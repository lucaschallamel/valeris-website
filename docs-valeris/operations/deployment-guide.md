# Deployment Guide

## Overview

| Component | Tool | Command |
|-----------|------|---------|
| Build | Astro | `npm run build` |
| Deploy | Wrangler | `npm run deploy` |
| Full pipeline | Combined | `npm run deploy` (build + deploy) |

## Prerequisites

- Node.js >= 22.12.0
- npm packages installed (`npm install`)
- Wrangler authenticated (`npx wrangler login`)

## Standard Deployment

```bash
# Build and deploy in one command
npm run deploy
```

This runs `astro build && wrangler pages deploy dist/ --project-name valeris-website --commit-dirty=true`.

Build output goes to `dist/` (30 pages, ~1.3 seconds).

## Step-by-Step (Manual)

```bash
# 1. Build the site
npm run build

# 2. Deploy to Cloudflare Pages
npx wrangler pages deploy dist/ --project-name valeris-website

# 3. Verify deployment
# Wrangler prints a preview URL (https://HASH.valeris-website.pages.dev)
```

## Environment Secrets

Secrets are stored in Cloudflare Pages, not in the repository. Never commit secrets to git.

### Required Secrets

| Secret | Purpose | How to set |
|--------|---------|------------|
| `RESEND_API_KEY` | Resend email delivery API key | `npx wrangler pages secret put RESEND_API_KEY --project-name valeris-website` |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile captcha verification | `npx wrangler pages secret put TURNSTILE_SECRET_KEY --project-name valeris-website` |
| `CONTACT_EMAIL` | Email address receiving contact form submissions | `npx wrangler pages secret put CONTACT_EMAIL --project-name valeris-website` |

### Managing Secrets

```bash
# List configured secrets (names only, not values)
npx wrangler pages secret list --project-name valeris-website

# Update a secret (e.g. after API key rotation)
npx wrangler pages secret put RESEND_API_KEY --project-name valeris-website

# Delete a secret
npx wrangler pages secret delete RESEND_API_KEY --project-name valeris-website
```

### .env.example

The `.env.example` file documents all required variables for reference:

```bash
# Site
PUBLIC_SITE_URL=https://valeris.fr

# Resend (email delivery)
RESEND_API_KEY=re_xxxxxxxxxxxx

# Cloudflare Turnstile (captcha)
TURNSTILE_SECRET_KEY=0x4AAAAAAA_xxxxxxxxxxxxxxxx

# Contact form destination
CONTACT_EMAIL=your@email.com
```

**Important**: The actual `.env` file is git-ignored. Secrets are configured via `wrangler pages secret put`, not via `.env` files.

## Cloudflare Pages Functions

Server-side functions live in the `functions/` directory and are automatically deployed as Cloudflare Workers:

```
functions/
└── api/
    └── contact.ts   -> POST /api/contact
```

No separate Worker deployment needed - Cloudflare Pages detects the `functions/` directory and deploys them alongside the static site.

## Local Development

```bash
# Start Astro dev server (static pages only, no Workers)
npm run dev
# -> http://localhost:4321

# Start with Wrangler (includes Workers + bindings)
npx wrangler pages dev dist/ --compatibility-date=2024-01-01
# -> http://localhost:8788 (with /api/contact working)
```

For local Worker testing, you need a `.dev.vars` file (git-ignored):

```bash
# .dev.vars (local development only)
RESEND_API_KEY=re_xxxxxxxxxxxx
TURNSTILE_SECRET_KEY=0x4AAAAAAA_xxxxxxxxxxxxxxxx
CONTACT_EMAIL=your@email.com
```

## Deployment Environments

| Environment | URL | Trigger |
|-------------|-----|---------|
| Production | valeris-website.pages.dev / valeris.fr | `npm run deploy` |
| Preview | HASH.valeris-website.pages.dev | Each deploy gets a unique URL |
| Local | localhost:4321 | `npm run dev` |

## Troubleshooting

### Build fails

```bash
# Check for TypeScript errors
npm run check

# Build with verbose output
npx astro build --verbose
```

### Deploy fails with 504 Gateway Timeout

Cloudflare Pages API occasionally has temporary outages. Wait a few minutes and retry:

```bash
# Retry deploy without rebuild (dist/ already exists)
npx wrangler pages deploy dist/ --project-name valeris-website --commit-dirty=true
```

Check Cloudflare status: [cloudflarestatus.com](https://www.cloudflarestatus.com/)

### Verify Wrangler connection

```bash
# Check authentication
npx wrangler whoami

# List Pages projects
npx wrangler pages project list
```

### Contact form not working

1. Check secrets are configured:

```bash
npx wrangler pages secret list --project-name valeris-website
```

2. Check Worker logs:

```bash
npx wrangler pages deployment tail --project-name valeris-website
```

3. Test Resend API directly (see [Resend setup guide](resend-email-setup.md))

## Deployment Checklist

Before deploying to production:

- [ ] `npm run build` passes with zero errors
- [ ] All 30 pages generated
- [ ] Sitemap generated (`dist/sitemap-index.xml`)
- [ ] No secrets in the codebase (`grep -r "re_" src/`)
- [ ] Git status clean or changes committed

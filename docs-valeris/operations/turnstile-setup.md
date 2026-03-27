# Cloudflare Turnstile Setup

## Overview

Cloudflare Turnstile provides anti-spam captcha protection on the contact form. It is privacy-respecting (no Google tracking), free (unlimited), and invisible when possible.

| Component | Value |
|-----------|-------|
| Service | Cloudflare Turnstile |
| Plan | Free (unlimited) |
| Widget mode | Managed (invisible when possible) |
| Site Key (public) | `0x4AAAAAACw1vy6U50c8ODeg` |
| Integration | Frontend widget + server-side verification |

## Step-by-Step Setup

### 1. Create Turnstile Widget

1. Go to Cloudflare dashboard (dash.cloudflare.com)
2. In the left sidebar, click **Application security**
3. Click **Turnstile**
4. Click **Add site**
5. Fill in:
   - **Site name**: `Valeris Website`
   - **Domain**: add all domains where the form appears:
     - `valeris.fr`
     - `valeris-website.pages.dev`
     - `localhost`
   - **Widget type**: **Managed** (recommended)
6. Click **Create**

### 2. Retrieve Keys

After creation, Turnstile displays two keys:

| Key | Usage | Where it goes |
|-----|-------|---------------|
| **Site Key** | Public, embedded in HTML | `src/components/ContactForm.astro` |
| **Secret Key** | Private, server-side only | Cloudflare Pages secret |

### 3. Configure Site Key in Frontend

The site key is already configured in the contact form component:

```html
<!-- In src/components/ContactForm.astro -->
<div class="cf-turnstile"
     data-sitekey="0x4AAAAAACw1vy6U50c8ODeg"
     data-theme="light">
</div>
```

The Turnstile JavaScript is loaded via:

```html
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
```

### 4. Configure Secret Key in Cloudflare Pages

```bash
npx wrangler pages secret put TURNSTILE_SECRET_KEY --project-name valeris-website
# Paste the secret key when prompted (text is hidden)
```

### 5. Server-Side Verification

The Cloudflare Pages Function (`functions/api/contact.ts`) verifies the Turnstile token:

```typescript
// Extract token from form submission
const turnstileToken = body['cf-turnstile-response'];

// Verify with Cloudflare API
const response = await fetch(
  'https://challenges.cloudflare.com/turnstile/v0/siteverify',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: context.env.TURNSTILE_SECRET_KEY,
      response: turnstileToken,
      remoteip: context.request.headers.get('CF-Connecting-IP'),
    }),
  }
);

const result = await response.json();
if (!result.success) {
  // Reject the submission
}
```

## How It Works

```
1. User loads contact page
   -> Turnstile JS loads and renders widget
   -> Managed mode: invisible check runs automatically

2. User submits form
   -> Browser includes cf-turnstile-response token in form data
   -> JavaScript sends token with POST to /api/contact

3. Cloudflare Worker receives POST
   -> Extracts cf-turnstile-response token
   -> Sends token to Cloudflare siteverify API
   -> If valid: process form, send email
   -> If invalid: return 403 error
```

## Troubleshooting

### Widget does not appear

- Check browser console for JavaScript errors
- Verify the domain is listed in Turnstile configuration
- `localhost` must be explicitly added for local development
- Check that the script tag is loading (network tab)

### Verification fails

- Verify the Secret Key is correctly set:

```bash
npx wrangler pages secret list --project-name valeris-website
```

- Test tokens expire after 5 minutes - ensure form submission is timely
- Check Worker logs:

```bash
npx wrangler pages deployment tail --project-name valeris-website
```

### Updating the Site Key

If you need to rotate the site key:

1. Delete the existing widget in Cloudflare Turnstile dashboard
2. Create a new widget (new site key + secret key)
3. Update site key in `src/components/ContactForm.astro`
4. Update secret key:

```bash
npx wrangler pages secret put TURNSTILE_SECRET_KEY --project-name valeris-website
```

5. Rebuild and deploy the site

## Turnstile Dashboard

- Location: dash.cloudflare.com > **Application security** > **Turnstile**
- Analytics: shows challenge solve rate, pass/fail metrics
- Widget management: add/remove domains, change mode

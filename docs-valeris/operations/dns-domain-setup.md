# DNS & Domain Setup

## Overview

| Component | Service | Role |
|-----------|---------|------|
| Domain registrar | Infomaniak | Owns `valeris.fr` |
| DNS hosting | Cloudflare | Nameservers, DNS records, CNAME flattening |
| Site hosting | Cloudflare Pages | Static site CDN |
| SSL/TLS | Cloudflare | Automatic, Full (Strict) |

## Architecture

```
Infomaniak (registrar)
  |
  | nameservers delegated to Cloudflare
  v
Cloudflare DNS
  |
  ├── CNAME @ -> valeris-website.pages.dev  (CNAME flattening)
  ├── CNAME www -> valeris-website.pages.dev
  ├── MX/TXT/CNAME records for Resend (email)
  └── SSL/TLS: Full (Strict), automatic certificate
  |
  v
Cloudflare Pages
  └── valeris-website project (static Astro build)
```

## Step-by-Step Setup

### 1. Transfer DNS from Infomaniak to Cloudflare

**Why**: Infomaniak does not support CNAME records at the zone root (`@`). Cloudflare supports "CNAME flattening" which resolves this limitation.

**At Cloudflare** (dash.cloudflare.com):

1. Click **Add a site** in the top bar
2. Enter `valeris.fr`
3. Select the **Free** plan
4. Cloudflare scans existing DNS records - review and confirm
5. Note the 2 assigned nameservers (e.g. `ada.ns.cloudflare.com`, `bob.ns.cloudflare.com`)

**At Infomaniak** (manager.infomaniak.com):

1. Go to **Noms de domaine** > `valeris.fr`
2. Click **Gestion des DNS** or **Serveurs DNS**
3. Replace existing nameservers with the 2 Cloudflare nameservers
4. Save and wait for propagation (usually minutes, up to 48 hours)

**Back at Cloudflare**:

1. Click **Check nameservers** - Cloudflare will confirm once propagated
2. Status changes from "Pending" to "Active"

### 2. Connect Custom Domain to Cloudflare Pages

**At Cloudflare** (dash.cloudflare.com):

1. Go to **Workers & Pages** > `valeris-website`
2. Click **Custom domains** tab
3. Click **Set up a custom domain**
4. Enter `valeris.fr`
5. Cloudflare automatically creates the CNAME record
6. Repeat for `www.valeris.fr`

**DNS records created automatically**:

```
Type    Name    Target                        Proxy
CNAME   @       valeris-website.pages.dev     Proxied
CNAME   www     valeris-website.pages.dev     Proxied
```

### 3. SSL/TLS Configuration

1. In Cloudflare, go to **SSL/TLS** > **Overview**
2. Set encryption mode to **Full (Strict)**
3. SSL certificate is generated automatically (takes a few minutes)
4. Verify: visit `https://valeris.fr` - should show valid certificate

### 4. Recommended Cloudflare Settings

| Setting | Location | Value |
|---------|----------|-------|
| Always Use HTTPS | SSL/TLS > Edge Certificates | On |
| Automatic HTTPS Rewrites | SSL/TLS > Edge Certificates | On |
| Minimum TLS Version | SSL/TLS > Edge Certificates | TLS 1.2 |
| HTTP/2 | Speed > Optimization | On (default) |
| Brotli | Speed > Optimization | On |

## Troubleshooting

### Nameserver propagation

```bash
# Check current nameservers
dig NS valeris.fr

# Expected output (after propagation):
# valeris.fr.  NS  ada.ns.cloudflare.com.
# valeris.fr.  NS  bob.ns.cloudflare.com.
```

### DNS resolution

```bash
# Check domain resolves to Cloudflare Pages
dig valeris.fr

# Should return Cloudflare IP addresses (104.x.x.x or 172.x.x.x)
```

### SSL certificate

```bash
# Check SSL certificate
curl -vI https://valeris.fr 2>&1 | grep "subject:"
```

## Account Details

| Service | Account | Dashboard |
|---------|---------|-----------|
| Infomaniak | lucas.challamel@gmail.com | manager.infomaniak.com |
| Cloudflare | lucas.challamel@gmail.com | dash.cloudflare.com |
| Cloudflare Account ID | `6ad3fb3ed0dda229edcbf3e4d57ea34a` | - |
| Pages Project | `valeris-website` | Workers & Pages > valeris-website |

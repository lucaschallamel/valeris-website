# Resend Email Setup

## Overview

Resend handles transactional email delivery for the contact form. Emails are sent from `contact@valeris.fr` to the configured destination address.

| Component | Value |
|-----------|-------|
| Service | Resend (resend.com) |
| Plan | Free tier (100 emails/day) |
| Sender domain | `valeris.fr` (verified 2026-03-28) |
| Sender address | `contact@valeris.fr` |
| Server region | Ireland (eu-west-1, European Union) |
| API endpoint | `https://api.resend.com/emails` |
| Integration | Cloudflare Pages Function (`/api/contact`) |

## Step-by-Step Setup

### 1. Create Resend Account

1. Go to **https://resend.com/signup**
2. Sign up with your email
3. Verify your email address

### 2. Create API Key

1. In Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Name: `valeris.fr`
4. Permission: **Sending access** (not Full access - principle of least privilege)
5. Domain: **All Domains**
6. Click **Add**
7. Copy the API key (starts with `re_...`) - it is only shown once

### 3. Verify Sender Domain

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter: `valeris.fr`
4. Resend displays DNS records to add

### 4. Add DNS Records in Cloudflare

Go to Cloudflare dashboard > `valeris.fr` > **DNS** > **Add record** for each:

**SPF Record** (TXT):

```
Type:    TXT
Name:    @
Content: v=spf1 include:resend.com ~all
TTL:     Auto
```

**DKIM Records** (CNAME) - Resend provides 3 CNAME records:

```
Type:    CNAME
Name:    resend._domainkey
Target:  (value provided by Resend)
Proxy:   DNS only (grey cloud)

Type:    CNAME
Name:    resend2._domainkey
Target:  (value provided by Resend)
Proxy:   DNS only (grey cloud)

Type:    CNAME
Name:    resend3._domainkey
Target:  (value provided by Resend)
Proxy:   DNS only (grey cloud)
```

**Important**: DKIM CNAME records must be set to **DNS only** (grey cloud icon), not Proxied.

**MX Record** (if sending from subdomain):

```
Type:    MX
Name:    bounce
Target:  feedback-smtp.us-east-1.amazonses.com
Priority: 10
```

### 5. Verify Domain in Resend

1. Return to Resend **Domains** page
2. Click **Verify** next to `valeris.fr`
3. Status should change to **Verified** (can take a few minutes)

### 6. Configure Secret in Cloudflare

```bash
npx wrangler pages secret put RESEND_API_KEY --project-name valeris-website
# Paste the re_... API key when prompted
```

## Testing

### Verify DNS records

```bash
# Check SPF
dig TXT valeris.fr | grep spf

# Check DKIM
dig CNAME resend._domainkey.valeris.fr
```

### Send test email via API

```bash
curl -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer re_YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "contact@valeris.fr",
    "to": "your@email.com",
    "subject": "Test Valeris",
    "html": "<p>Test email from Valeris contact form</p>"
  }'
```

## Maintenance

### API Key Rotation

If the API key is compromised:

1. In Resend dashboard, go to **API Keys**
2. Delete the compromised key
3. Create a new key with the same settings
4. Update the secret:

```bash
npx wrangler pages secret put RESEND_API_KEY --project-name valeris-website
```

### Monitoring

- Resend dashboard shows delivery logs, bounces, and complaints
- Free tier: 100 emails/day, 3,000/month
- If volume exceeds free tier: upgrade to Pro ($20/month, 50,000 emails/month)

## Resend Dashboard

| Item | URL |
|------|-----|
| Dashboard | https://resend.com/overview |
| API Keys | https://resend.com/api-keys |
| Domains | https://resend.com/domains |
| Logs | https://resend.com/emails |

// Cloudflare Pages Function: POST /api/contact
// Validates Turnstile captcha, then sends email via Resend

interface Env {
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY: string;
  CONTACT_EMAIL: string; // Email to receive contact form submissions
}

interface ContactForm {
  lang: string;
  service: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  orgSize: string;
  message: string;
  website: string; // Honeypot
  'cf-turnstile-response': string;
}

const ALLOWED_ORIGINS = [
  'https://valeris.fr',
  'https://www.valeris.fr',
  'https://valeris-website.pages.dev',
  'http://localhost:4321',
  'http://localhost:3000',
];

function corsHeaders(origin: string): Record<string, string> {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

const SERVICE_LABELS: Record<string, string> = {
  'ai-governance': 'Activation IA & Gouvernance',
  'team-performance': 'Performance des Equipes',
  'executive-coaching': 'Coaching de Dirigeants Techniques',
  'whitepaper-ai-sovereignty': 'Whitepaper: Souverainete IA (Suisse)',
  'no-preference': 'Pas de preference',
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(context.request.headers.get('Origin') || ''),
  });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const origin = context.request.headers.get('Origin') || '';
  const headers = corsHeaders(origin);

  try {
    const body = (await context.request.json()) as ContactForm;

    // Honeypot check
    if (body.website) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    }

    // Validate required fields
    if (!body.firstName?.trim() || !body.lastName?.trim() || !body.email?.trim()) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    }

    // Verify Turnstile captcha
    const turnstileToken = body['cf-turnstile-response'];
    if (!turnstileToken) {
      return new Response(JSON.stringify({ error: 'Captcha required' }), {
        status: 400,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    }

    const turnstileResponse = await fetch(
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

    const turnstileResult = (await turnstileResponse.json()) as { success: boolean; 'error-codes'?: string[] };
    if (!turnstileResult.success) {
      console.error('Turnstile verification failed:', JSON.stringify(turnstileResult));
      return new Response(JSON.stringify({ error: 'Captcha verification failed', details: turnstileResult['error-codes'] }), {
        status: 403,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    }

    // Build email content
    const serviceName = SERVICE_LABELS[body.service] || body.service || '-';
    const emailHtml = `
      <h2>Nouvelle prise de contact - Valeris Coaching</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Service</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${serviceName}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Prenom</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${body.firstName}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Nom</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${body.lastName}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${body.email}">${body.email}</a></td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Telephone</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${body.phone || '-'}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Societe</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${body.company || '-'}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Fonction</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${body.jobTitle || '-'}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Taille</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${body.orgSize || '-'}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Message</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${body.message || '-'}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Langue</td><td style="padding: 8px;">${body.lang || 'fr'}</td></tr>
      </table>
    `;

    // Send email via Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Valeris Contact <contact@valeris.fr>',
        to: [context.env.CONTACT_EMAIL],
        reply_to: body.email,
        subject: `[Valeris] ${body.firstName} ${body.lastName} - ${serviceName}`,
        html: emailHtml,
      }),
    });

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text();
      console.error('Resend error:', resendResponse.status, resendError);
      return new Response(JSON.stringify({ error: 'Email delivery failed', status: resendResponse.status, details: resendError }), {
        status: 500,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...headers, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Contact form error:', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { ...headers, 'Content-Type': 'application/json' },
    });
  }
};

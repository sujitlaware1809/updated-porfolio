import { NextResponse } from 'next/server';

// Cloudflare Pages requires Edge runtime for API routes
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

function corsHeaders(origin: string | null) {
  // Allow same-origin requests (Pages preview, custom domain, localhost)
  const allowOrigin = origin || '*';
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  } as Record<string, string>;
}

export async function OPTIONS(req: Request) {
  const origin = req.headers.get('origin');
  return new Response(null, { status: 204, headers: corsHeaders(origin) });
}

export async function POST(request: Request) {
  try {
    const origin = request.headers.get('origin');

    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { ok: false, message: 'Missing required fields' },
        { status: 400, headers: corsHeaders(origin) }
      );
    }

    // 1) Try Resend first if configured (recommended; avoids Cloudflare challenge)
    const resendKey = process.env.RESEND_API_KEY;
    const contactTo = process.env.CONTACT_TO;
    const contactFrom = process.env.CONTACT_FROM || 'Portfolio <onboarding@resend.dev>';

    if (resendKey && contactTo) {
      try {
        const html = `
          <div style="font-family:system-ui,Segoe UI,Arial,sans-serif;line-height:1.6">
            <h2>New message from portfolio</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
          </div>
        `;

        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: contactFrom,
            to: [contactTo],
            subject: `Portfolio Contact: ${subject}`,
            html,
            reply_to: [email],
          }),
        });

        const ct = resendRes.headers.get('content-type') || '';
        const jr = ct.includes('application/json') ? await resendRes.json().catch(() => null) : null;
        if (resendRes.ok) {
          return NextResponse.json(
            { ok: true, message: 'Message sent! Check your inbox.' },
            { status: 200, headers: corsHeaders(origin) }
          );
        } else {
          console.error('Resend error', { status: resendRes.status, jr });
          // continue to Web3Forms fallback
        }
      } catch (err) {
        console.error('Resend exception', err);
        // continue to Web3Forms fallback
      }
    }

    // 2) Fallback to Web3Forms (may hit Cloudflare challenge on server side)
    const access_key = process.env.WEB3FORMS_ACCESS_KEY;
    if (!access_key) {
      console.error('WEB3FORMS_ACCESS_KEY is not set');
      return NextResponse.json(
        { ok: false, message: 'Server misconfiguration: missing Web3Forms access key' },
        { status: 500, headers: corsHeaders(origin) }
      );
    }

    const form = new FormData();
    form.append('access_key', access_key);
    form.append('name', name);
    form.append('email', email);
    form.append('subject', subject);
    form.append('message', message);
    form.append('from_name', 'Portfolio Contact Form');
    form.append('botcheck', '');

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        ...(origin ? { 'Origin': origin, 'Referer': origin } : {}),
      },
      body: form,
    });

    const contentType = response.headers.get('content-type') || '';
    let data: any = null;
    let rawText: string | null = null;
    if (contentType.includes('application/json')) {
      data = await response.json().catch(() => null);
    }
    if (!data) {
      rawText = await response.text().catch(() => null);
    }

    const success = data?.success === true || (response.ok && !data && !!rawText);
    if (!success) {
      const msg = data?.message || rawText || `Failed to send via Web3Forms (status ${response.status})`;
      const cloudflareHint = contentType.includes('text/html') ? 'Blocked by provider (Cloudflare challenge). Use client-side Web3Forms with NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY or configure RESEND_API_KEY + CONTACT_TO to send via Resend.' : undefined;
      console.error('Web3Forms error:', { status: response.status, contentType, data, rawText });
      return NextResponse.json(
        { ok: false, message: cloudflareHint || msg, provider: data ?? rawText ?? null },
        { status: 400, headers: corsHeaders(origin) }
      );
    }

    const successMsg = data?.message || 'Message sent successfully!';
    return NextResponse.json(
      { ok: true, message: successMsg },
      { status: 200, headers: corsHeaders(origin) }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { ok: false, message: 'Failed to send message' },
      { status: 500 }
    );
  }
}
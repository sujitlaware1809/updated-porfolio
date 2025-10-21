import { NextResponse } from 'next/server';

// Use Node.js runtime in dev for reliable env access; switch to 'edge' later if needed.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://sujitlaware.com',
  'https://www.sujitlaware.com',
];

function corsHeaders(origin: string | null) {
  const allowOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
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

    const access_key = process.env.WEB3FORMS_ACCESS_KEY;
    if (!access_key) {
      console.error('WEB3FORMS_ACCESS_KEY is not set');
      return NextResponse.json(
        { ok: false, message: 'Server misconfiguration: missing access key' },
        { status: 500, headers: corsHeaders(origin) }
      );
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        access_key,
        name,
        email,
        subject,
        message,
        from_name: 'Portfolio Contact Form',
      }),
    });

    const data = await response.json().catch(() => ({} as any));

    if (!response.ok || data.success === false) {
      const msg = data?.message || 'Failed to send via Web3Forms';
      console.error('Web3Forms error:', data);
      return NextResponse.json(
        { ok: false, message: msg, provider: data },
        { status: 400, headers: corsHeaders(origin) }
      );
    }

    return NextResponse.json(
      { ok: true, message: data?.message || 'Message sent successfully!' },
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
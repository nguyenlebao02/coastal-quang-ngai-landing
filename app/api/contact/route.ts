import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_URL = process.env.WEBHOOK_URL;

/* Simple in-memory rate limiter: max 5 requests per IP per minute */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

export async function POST(request: NextRequest) {
  if (!WEBHOOK_URL) {
    console.error('[contact] WEBHOOK_URL env var is not set');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Quá nhiều yêu cầu, vui lòng thử lại sau.' }, { status: 429 });
  }

  try {
    const body = await request.json() as Record<string, unknown>;

    /* Honeypot check — if the hidden field has a value, it's a bot */
    if (body.website) {
      return NextResponse.json({ success: true }); // Silently accept to fool bots
    }

    /* Basic validation */
    const name = String(body.name || '').trim().slice(0, 100);
    const phone = String(body.phone || '').replace(/[\s-]/g, '').slice(0, 15);
    if (!name || !phone) {
      return NextResponse.json({ error: 'Vui lòng nhập họ tên và số điện thoại.' }, { status: 400 });
    }

    const payload: Record<string, string> = { name, phone };

    const email = String(body.email || '').trim().slice(0, 254);
    if (email) payload.email = email;

    const notes = String(body.notes || '').trim().slice(0, 1000);
    if (notes) payload.notes = notes;

    /* Forward UTM params */
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
      const val = body[key];
      if (typeof val === 'string' && val) payload[key] = val.slice(0, 200);
    }

    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({})) as { error?: string };
      return NextResponse.json({ error: data.error || 'Gửi thất bại' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Có lỗi xảy ra' }, { status: 500 });
  }
}

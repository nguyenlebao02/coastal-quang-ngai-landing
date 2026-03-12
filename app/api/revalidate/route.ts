import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

export async function POST(request: NextRequest) {
  if (!REVALIDATE_SECRET) {
    console.error('[revalidate] REVALIDATE_SECRET env var is not set');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${REVALIDATE_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  /* Optionally revalidate a specific blog post path */
  let slug: string | undefined;
  try {
    const body = await request.json() as { slug?: string };
    slug = body.slug;
  } catch {
    /* No body is fine — revalidate default paths */
  }

  revalidatePath('/', 'page');
  revalidatePath('/tin-tuc/', 'page');
  if (slug && /^[a-z0-9-]+$/.test(slug)) {
    revalidatePath(`/tin-tuc/${slug}/`, 'page');
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}

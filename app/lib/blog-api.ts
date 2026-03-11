import DOMPurify from 'isomorphic-dompurify';

const BLOG_API_URL = process.env.NEXT_PUBLIC_BLOG_API_URL || 'https://haus-coastal-blog-api.hauscoastal.workers.dev';

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  published: number;
  created_at: string;
  updated_at: string;
};

export type BlogPostListItem = Omit<BlogPost, 'content'>;

export async function fetchPublishedPosts(): Promise<BlogPostListItem[]> {
  try {
    const res = await fetch(`${BLOG_API_URL}/api/posts`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json() as { posts: BlogPostListItem[] };
    return data.posts;
  } catch (err) {
    console.error('[blog-api] fetchPublishedPosts failed:', err);
    return [];
  }
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const safeSlug = encodeURIComponent(slug);
    const res = await fetch(`${BLOG_API_URL}/api/posts/${safeSlug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json() as { post: BlogPost };
    return data.post;
  } catch (err) {
    console.error('[blog-api] fetchPostBySlug failed:', err);
    return null;
  }
}

export function resolveImageUrl(coverImage: string): string {
  if (coverImage.startsWith('http')) return coverImage;
  if (coverImage.startsWith('/images/')) return coverImage;
  return `${BLOG_API_URL}${coverImage}`;
}

/** Sanitize HTML content using DOMPurify — safe against XSS. Also resolves relative image URLs to blog API. */
export function sanitizeHtml(html: string): string {
  const resolved = html.replace(
    /(<img\s[^>]*src=["'])\/api\//g,
    `$1${BLOG_API_URL}/api/`
  );
  return DOMPurify.sanitize(resolved, { USE_PROFILES: { html: true } });
}

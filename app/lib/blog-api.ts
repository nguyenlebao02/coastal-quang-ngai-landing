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
    const res = await fetch(`${BLOG_API_URL}/api/posts`, { next: { revalidate: 60 } } as any);
    if (!res.ok) return [];
    const data = await res.json() as { posts: BlogPostListItem[] };
    return data.posts;
  } catch {
    return [];
  }
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const safeSlug = encodeURIComponent(slug);
    const res = await fetch(`${BLOG_API_URL}/api/posts/${safeSlug}`, { next: { revalidate: 60 } } as any);
    if (!res.ok) return null;
    const data = await res.json() as { post: BlogPost };
    return data.post;
  } catch {
    return null;
  }
}

export function resolveImageUrl(coverImage: string): string {
  if (coverImage.startsWith('http')) return coverImage;
  if (coverImage.startsWith('/images/')) return coverImage;
  return `${BLOG_API_URL}${coverImage}`;
}

const ALLOWED_TAGS = new Set([
  'p', 'br', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'code',
  'img', 'figure', 'figcaption', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'div', 'span', 'hr',
]);

const ALLOWED_ATTRS = new Set([
  'href', 'src', 'alt', 'title', 'class', 'id', 'width', 'height', 'target', 'rel',
]);

/** Strip dangerous tags/attributes from HTML content (server-side sanitizer). */
export function sanitizeHtml(html: string): string {
  return html
    .replace(/<script[\s>][\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s>][\s\S]*?<\/style>/gi, '')
    .replace(/<iframe[\s>][\s\S]*?<\/iframe>/gi, '')
    .replace(/<object[\s>][\s\S]*?<\/object>/gi, '')
    .replace(/<embed[\s>][\s\S]*?\/?>[\s\S]*?(<\/embed>)?/gi, '')
    .replace(/<form[\s>][\s\S]*?<\/form>/gi, '')
    .replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/\son\w+\s*=\s*\S+/gi, '')
    .replace(/javascript\s*:/gi, '')
    .replace(/data\s*:[^"']*(?=["'])/gi, '');
}

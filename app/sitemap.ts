import type { MetadataRoute } from 'next';
import { fetchPublishedPosts } from '@/app/lib/blog-api';
import { SITE_URL } from '@/app/lib/constants';

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetchPublishedPosts();

  const blogUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/tin-tuc/${post.slug}/`,
    lastModified: new Date(post.updated_at || post.created_at || new Date().toISOString()),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/tin-tuc/`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    ...blogUrls,
  ];
}

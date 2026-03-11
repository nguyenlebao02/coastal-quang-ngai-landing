import type { MetadataRoute } from 'next';
import { fetchPublishedPosts } from '@/app/lib/blog-api';

const BASE_URL = 'https://hauscoastal.com.vn';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetchPublishedPosts();

  const blogUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/tin-tuc/${post.slug}/`,
    lastModified: new Date(post.updated_at || post.created_at),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/tin-tuc/`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    ...blogUrls,
  ];
}

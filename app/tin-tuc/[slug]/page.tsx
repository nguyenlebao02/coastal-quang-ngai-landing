import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';
import { fetchPublishedPosts, fetchPostBySlug, resolveImageUrl, sanitizeHtml } from '@/app/lib/blog-api';
import type { BlogPostListItem } from '@/app/lib/blog-api';
import { SITE_URL } from '@/app/lib/constants';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await fetchPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) return { title: 'Không tìm thấy bài viết' };
  const coverUrl = resolveImageUrl(post.cover_image);
  return {
    title: `${post.title} | Coastal Quảng Ngãi`,
    description: post.excerpt,
    alternates: { canonical: `/tin-tuc/${slug}/` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: coverUrl, width: 1200, height: 630, alt: post.title }],
      type: 'article',
      locale: 'vi_VN',
      siteName: 'Coastal Quảng Ngãi',
      url: `${SITE_URL}/tin-tuc/${slug}/`,
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: ['Haus Group'],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    fetchPostBySlug(slug),
    fetchPublishedPosts(),
  ]);
  if (!post) notFound();

  const coverUrl = resolveImageUrl(post.cover_image);
  const publishDate = new Date(post.created_at).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  /* Pick up to 3 related posts (exclude current) */
  const relatedPosts: BlogPostListItem[] = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <>
      {/* Article + BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.excerpt,
            image: coverUrl,
            datePublished: post.created_at,
            dateModified: post.updated_at,
            mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/tin-tuc/${slug}/` },
            author: { '@type': 'Organization', name: 'Haus Group' },
            publisher: {
              '@type': 'Organization',
              name: 'Haus Group',
              logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/misc/coastal-logo-identity.png` },
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Tin tức', item: `${SITE_URL}/tin-tuc/` },
              { '@type': 'ListItem', position: 3, name: post.title },
            ],
          },
        ]) }}
      />
      <Header />
      <main className="pt-24 pb-16 min-h-screen">
        {/* Hero cover */}
        <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
          <img
            src={coverUrl}
            alt={post.title}
            width={1200}
            height={384}
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Article */}
        <article className="container mx-auto max-w-3xl -mt-16 relative z-10">
          {/* Visual breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-sm text-white/70 mb-4 px-2">
            <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
            <span className="mx-2">/</span>
            <Link href="/tin-tuc/" className="hover:text-white transition-colors">Tin tức</Link>
            <span className="mx-2">/</span>
            <span className="text-white/90 line-clamp-1 inline">{post.title}</span>
          </nav>
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
            <div className="mb-6">
              <time dateTime={post.created_at} className="text-sm text-charcoal/40">{publishDate}</time>
              <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl text-navy font-bold mt-2 leading-tight">
                {post.title}
              </h1>
              <div className="rose-line !mx-0 mt-4 mb-4" />
              <p className="text-charcoal/60 italic">{post.excerpt}</p>
            </div>

            <div
              className="prose prose-lg max-w-none
                prose-headings:font-heading prose-headings:text-navy prose-headings:font-bold
                prose-p:text-charcoal/80 prose-p:leading-relaxed
                prose-a:text-ocean-blue prose-a:underline
                prose-img:rounded-lg prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
            />
          </div>

          {/* Related articles */}
          {relatedPosts.length > 0 && (
            <div className="mt-10">
              <h2 className="font-heading text-xl text-navy font-bold mb-4">Bài viết liên quan</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={`/tin-tuc/${rp.slug}/`}
                    className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src={resolveImageUrl(rp.cover_image)}
                      alt={rp.title}
                      width={400}
                      height={128}
                      className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="p-3">
                      <h3 className="font-heading font-bold text-sm text-charcoal leading-snug line-clamp-2 group-hover:text-rose-beige transition-colors">
                        {rp.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mt-8 px-2">
            <Link
              href="/tin-tuc/"
              className="text-rose-beige hover:text-cta-orange font-medium transition-colors"
            >
              ← Tất cả bài viết
            </Link>
            <Link
              href="/"
              className="text-rose-beige hover:text-cta-orange font-medium transition-colors"
            >
              Trang chủ
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

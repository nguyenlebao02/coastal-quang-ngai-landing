import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';
import { fetchPublishedPosts, fetchPostBySlug, resolveImageUrl, sanitizeHtml } from '@/app/lib/blog-api';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await fetchPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) return { title: 'Không tìm thấy bài viết' };
  return {
    title: `${post.title} | Coastal Quảng Ngãi`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [resolveImageUrl(post.cover_image)],
      type: 'article',
      locale: 'vi_VN',
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) notFound();

  const coverUrl = resolveImageUrl(post.cover_image);
  const publishDate = new Date(post.created_at).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen">
        {/* Hero cover */}
        <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
          <img
            src={coverUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Article */}
        <article className="container mx-auto max-w-3xl -mt-16 relative z-10">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
            <div className="mb-6">
              <span className="text-sm text-charcoal/40">{publishDate}</span>
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

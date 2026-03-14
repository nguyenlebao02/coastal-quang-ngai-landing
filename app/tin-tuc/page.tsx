import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';
import { fetchPublishedPosts, resolveImageUrl } from '@/app/lib/blog-api';
import { NEWS_ITEMS, SITE_URL } from '@/app/lib/constants';
import { safeJsonLd, safeFormatDate } from '@/app/lib/json-ld-utils';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Tin tức dự án | Coastal Quảng Ngãi',
  description: 'Cập nhật tin tức mới nhất về dự án Coastal Quảng Ngãi - đô thị biển đẳng cấp quốc tế đầu tiên tại miền Trung.',
  alternates: { canonical: '/tin-tuc/' },
  openGraph: {
    title: 'Tin tức dự án | Coastal Quảng Ngãi',
    description: 'Cập nhật tin tức mới nhất về dự án Coastal Quảng Ngãi - đô thị biển đẳng cấp quốc tế đầu tiên tại miền Trung.',
    type: 'website',
    url: `${SITE_URL}/tin-tuc/`,
  },
};

export default async function BlogListingPage() {
  let posts = await fetchPublishedPosts();

  /* Fallback to hardcoded items when API unavailable */
  const articles = posts.length > 0
    ? posts.map((p) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        image: resolveImageUrl(p.cover_image),
        date: safeFormatDate(p.created_at),
      }))
    : NEWS_ITEMS.map((item) => ({
        slug: item.slug,
        title: item.title,
        excerpt: '',
        image: item.image,
        date: '',
      }));

  return (
    <>
      {/* BreadcrumbList + CollectionPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd([
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Tin tức' },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Tin tức dự án Coastal Quảng Ngãi',
            description: 'Cập nhật tin tức mới nhất về dự án Coastal Quảng Ngãi.',
            url: `${SITE_URL}/tin-tuc/`,
            isPartOf: { '@type': 'WebSite', name: 'Coastal Quảng Ngãi', url: `${SITE_URL}/` },
          },
        ]) }}
      />
      <Header />
      <main className="pt-28 pb-16 min-h-screen bg-cream-gradient">
        <div className="container mx-auto">
          {/* Visual breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-sm text-charcoal/50 mb-6">
            <Link href="/" className="hover:text-rose-beige transition-colors">Trang chủ</Link>
            <span className="mx-2">/</span>
            <span className="text-charcoal/80">Tin tức</span>
          </nav>

          <div className="text-center mb-10">
            <h1 className="font-heading text-3xl md:text-4xl text-rose-beige font-bold mb-2 uppercase">
              Tin tức dự án
            </h1>
            <div className="rose-line mb-4" />
            <p className="text-charcoal/60 max-w-xl mx-auto">
              Cập nhật thông tin mới nhất về dự án Coastal Quảng Ngãi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((item) => (
              <Link
                key={item.slug}
                href={`/tin-tuc/${item.slug}/`}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={192}
                    loading="lazy"
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  {item.date && (
                    <span className="text-xs text-charcoal/40 mb-2 block">{item.date}</span>
                  )}
                  <h3 className="font-heading font-bold text-charcoal text-lg leading-snug line-clamp-2 group-hover:text-rose-beige transition-colors">
                    {item.title}
                  </h3>
                  {item.excerpt && (
                    <p className="text-sm text-charcoal/60 mt-2 line-clamp-2">{item.excerpt}</p>
                  )}
                  <span className="inline-block mt-3 text-sm text-rose-beige font-medium">
                    Xem thêm →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/#tin-tuc"
              className="text-rose-beige hover:text-cta-orange font-medium transition-colors"
            >
              ← Quay lại trang chủ
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

import Link from 'next/link';
import SectionWrapper from '@/app/components/ui/section-wrapper';
import { NEWS_ITEMS } from '@/app/lib/constants';
import { fetchPublishedPosts, resolveImageUrl } from '@/app/lib/blog-api';

export default async function NewsSection() {
  const posts = await fetchPublishedPosts();

  const articles = posts.length > 0
    ? posts.slice(0, 3).map((p) => ({
        slug: p.slug,
        title: p.title,
        image: resolveImageUrl(p.cover_image),
      }))
    : NEWS_ITEMS;

  return (
    <SectionWrapper id="tin-tuc" className="bg-cream-gradient">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <Link href="/tin-tuc/" className="inline-block hover:opacity-80 transition-opacity">
            <h2 className="font-heading text-2xl md:text-3xl text-rose-beige font-bold mb-2 uppercase">
              Tin tức dự án
            </h2>
          </Link>
          <div className="rose-line mb-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((item) => (
            <Link
              key={item.slug}
              href={`/tin-tuc/${item.slug}/`}
              className="group block cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  width={400}
                  height={192}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading font-bold text-charcoal text-lg leading-snug line-clamp-2 group-hover:text-rose-beige transition-colors">
                  {item.title}
                </h3>
                <span className="inline-block mt-3 text-sm text-rose-beige font-medium">
                  Xem thêm →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

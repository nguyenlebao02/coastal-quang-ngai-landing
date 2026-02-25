import SectionWrapper from '@/app/components/ui/section-wrapper';
import { NEWS_ITEMS } from '@/app/lib/constants';

export default function NewsSection() {
  return (
    <SectionWrapper id="tin-tuc" className="bg-cream">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-navy mb-2">
            Tin tức dự án
          </h2>
          <div className="gold-line mb-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWS_ITEMS.map((item) => (
            <article
              key={item.slug}
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-navy text-lg leading-snug line-clamp-2 group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <span className="inline-block mt-3 text-sm text-gold font-medium">
                  Xem thêm →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

import SectionWrapper from '@/app/components/ui/section-wrapper';
import Button from '@/app/components/ui/button';
import { INTRO_HIGHLIGHTS } from '@/app/lib/constants';

export default function IntroductionSection() {
  return (
    <SectionWrapper id="gioi-thieu" className="bg-cream-gradient">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-heading text-2xl md:text-3xl text-rose-beige font-bold mb-2">
            Giới thiệu Coastal Quảng Ngãi
          </h2>
          <div className="rose-line mb-6" />
          <p className="text-charcoal/70 max-w-3xl mx-auto text-sm leading-relaxed">
            Khám phá sự giao thoa kỳ diệu giữa hơi thở của biển, nhịp sống của sông
            và sự phồn vinh của đô thị. Coastal Quảng Ngãi – dự án đô thị biển đẳng cấp quốc tế
            đầu tiên tại miền Trung, quy mô 93,9 ha với mật độ xây dựng chỉ 14%,
            mang đến 1.111 sản phẩm đa dạng – tất cả đều được bảo chứng bởi HAUS.
          </p>
        </div>

        {/* Video embed */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="relative w-full overflow-hidden rounded-lg shadow-lg" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/RV5eoU2sv7s?start=66"
              title="Coastal Quảng Ngãi - Giới thiệu dự án"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Master plan image — ảnh chuẩn từ reference */}
        <div className="mb-10 max-w-2xl mx-auto">
          <img
            src="/images/hero/project-masterplan-reference.jpg"
            alt="Quy hoạch tổng thể dự án Coastal Quảng Ngãi"
            loading="lazy"
            width={800}
            height={500}
            className="w-full rounded-lg"
          />
        </div>

        {/* 3 highlight cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {INTRO_HIGHLIGHTS.map((item) => (
            <div key={item.title} className="group bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  width={960}
                  height={640}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-heading text-lg font-bold text-charcoal mb-2">{item.title}</h3>
                <p className="text-charcoal/60 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button href="#lien-he">Tải bảng giá</Button>
        </div>
      </div>
    </SectionWrapper>
  );
}

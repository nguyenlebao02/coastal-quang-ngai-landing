import SectionWrapper from '@/app/components/ui/section-wrapper';
import Button from '@/app/components/ui/button';
import { INTRO_HIGHLIGHTS } from '@/app/lib/constants';

export default function IntroductionSection() {
  return (
    <SectionWrapper id="gioi-thieu" className="bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <img
            src="/images/hero/project-overview-masterplan.png"
            alt="Tổng quan dự án"
            className="h-12 mx-auto mb-6"
          />
          <div className="gold-line mb-6" />
        </div>

        {/* 3 highlight cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {INTRO_HIGHLIGHTS.map((item) => (
            <div key={item.title} className="group text-center">
              <div className="overflow-hidden rounded mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="font-serif text-lg text-navy mb-2">{item.title}</h3>
              <p className="text-charcoal/70 text-sm">{item.description}</p>
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

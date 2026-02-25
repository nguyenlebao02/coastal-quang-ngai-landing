import SectionWrapper from '@/app/components/ui/section-wrapper';
import { PROJECT_INFO } from '@/app/lib/constants';

export default function OverviewSection() {
  return (
    <SectionWrapper id="tong-quan" className="bg-cream-gradient">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl text-terracotta font-bold text-center mb-2 uppercase">
            Thông tin dự án
          </h2>
          <div className="terracotta-line mb-8" />

          {/* Project info table */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-terracotta/10">
            {PROJECT_INFO.map((item, i) => (
              <div
                key={item.label}
                className={`flex items-center border-b border-gray-100 last:border-b-0 ${
                  i % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'
                }`}
              >
                <div className="w-1/3 px-6 py-3 text-terracotta text-sm font-heading font-bold border-l-2 border-terracotta">
                  {item.label}
                </div>
                <div className="w-2/3 px-6 py-3 text-charcoal text-sm">
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* Project render image */}
          <div className="mt-8">
            <img
              src="/images/hero/project-render.jpg"
              alt="Phối cảnh dự án Coastal Quảng Ngãi"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

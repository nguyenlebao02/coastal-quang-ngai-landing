import SectionWrapper from '@/app/components/ui/section-wrapper';
import { PROJECT_INFO } from '@/app/lib/constants';

export default function OverviewSection() {
  return (
    <SectionWrapper
      id="tong-quan"
      className="relative bg-cover bg-center bg-no-repeat"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/backgrounds/bg-tong-quan.jpg')" }}
      />
      <div className="absolute inset-0 bg-navy/80" />

      <div className="relative z-10 container mx-auto">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-white text-center mb-2">
            Thông tin dự án
          </h2>
          <div className="gold-line mb-10" />

          {/* Project info table */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden">
            {PROJECT_INFO.map((item, i) => (
              <div
                key={item.label}
                className={`flex items-center border-b border-white/10 last:border-b-0 ${
                  i % 2 === 0 ? 'bg-white/5' : ''
                }`}
              >
                <div className="w-1/3 px-6 py-4 text-gold text-sm font-medium border-l-2 border-gold">
                  {item.label}
                </div>
                <div className="w-2/3 px-6 py-4 text-white text-sm">
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
              className="w-full rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

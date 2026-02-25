import SectionWrapper from '@/app/components/ui/section-wrapper';

export default function LayoutSection() {
  return (
    <SectionWrapper
      id="layout"
      className="relative bg-cover bg-center"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/backgrounds/bg-layout-section.jpg')" }}
      />
      <div className="absolute inset-0 bg-navy/85" />

      <div className="relative z-10 container mx-auto">
        <div className="text-center mb-12">
          <img
            src="/images/misc/typical-layout-plan.png"
            alt="Layout điển hình"
            className="h-12 mx-auto mb-4"
          />
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-2">
            Layout điển hình
          </h2>
          <div className="gold-line mb-6" />
        </div>

        {/* 4-KEY layout plan */}
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
          <img
            src="/images/misc/four-key-solutions.png"
            alt="Mặt bằng 4-KEY Coastal Quảng Ngãi"
            className="w-full rounded"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}

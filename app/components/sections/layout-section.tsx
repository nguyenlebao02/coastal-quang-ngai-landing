import SectionWrapper from '@/app/components/ui/section-wrapper';

export default function LayoutSection() {
  return (
    <SectionWrapper
      id="layout"
      className="bg-cream-gradient"
    >
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <img
            src="/images/misc/typical-layout-plan.webp"
            alt="Layout điển hình"
            loading="lazy"
            width={800}
            height={447}
            className="h-12 mx-auto mb-4"
          />
          <h2 className="font-heading text-2xl md:text-3xl text-rose-beige font-bold mb-2 uppercase">
            Layout điển hình
          </h2>
          <div className="rose-line mb-6" />
        </div>

        {/* 4-KEY layout plan */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <img
            src="/images/misc/four-key-solutions.png"
            alt="Mặt bằng 4-KEY Coastal Quảng Ngãi"
            loading="lazy"
            width={1920}
            height={725}
            className="w-full rounded"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}

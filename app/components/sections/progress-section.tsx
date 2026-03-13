import SectionWrapper from '@/app/components/ui/section-wrapper';

export default function ProgressSection() {
  return (
    <SectionWrapper id="tien-do" className="bg-cream-gradient">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <img
            src="/images/misc/title-real-photos-video.webp"
            alt="Hình ảnh & video thực tế"
            width={800}
            height={339}
            className="h-12 mx-auto mb-4"
          />
          <h2 className="font-heading text-2xl md:text-3xl text-rose-beige font-bold mb-2 uppercase">
            Tiến độ thi công
          </h2>
          <div className="rose-line mb-6" />
          <p className="text-charcoal/70 max-w-2xl mx-auto">
            Cập nhật hình ảnh thực tế tiến độ thi công dự án Coastal Quảng Ngãi
          </p>
        </div>

        {/* Progress images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="overflow-hidden rounded-lg shadow-sm">
            <img
              src="/images/hero/coastal-overview-aerial.jpg"
              alt="Tiến độ thi công tổng thể"
              loading="lazy"
              width={1920}
              height={1012}
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-lg shadow-sm">
            <img
              src="/images/hero/hero-banner-coastal-aerial.jpg"
              alt="Tiến độ thi công chi tiết"
              loading="lazy"
              width={1500}
              height={938}
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

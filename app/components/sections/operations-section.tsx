import SectionWrapper from '@/app/components/ui/section-wrapper';
import Button from '@/app/components/ui/button';

/* Section Quản lý & Vận hành — Copper Beech, theo dongtayland.vn */

export default function OperationsSection() {
  return (
    <SectionWrapper id="quan-ly" className="bg-gradient-to-br from-terracotta to-cta-orange">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left — ảnh cảnh quan */}
          <div>
            <img
              src="/images/amenities/reference-amenity-2.jpg"
              alt="Cảnh quan Coastal Quảng Ngãi"
              loading="lazy"
              width={800}
              height={500}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Right — nội dung Copper Beech */}
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-white font-bold uppercase mb-0">
              Quản lý &amp; Vận hành
            </h2>
            <p className="font-heading text-2xl md:text-3xl text-white/90 italic mb-6">
              Copper Beech
            </p>

            <p className="text-white/90 text-sm leading-relaxed mb-4">
              Copper Beech hiện chỉ đang thầm giữ duy nhất Haus Dalat. Đây là thương hiệu
              chuyên thiết kế &amp; vận hành dịch vụ dành cho giới siêu giàu trên thế giới,
              tập trung vào &ldquo;trải nghiệm&rdquo; và &ldquo;kết nối&rdquo; hơn &ldquo;tiện ích&rdquo;.
            </p>

            <p className="text-white/90 text-sm leading-relaxed mb-4">
              Có thể nói Copper Beech không làm tăng giá trị tài sản bằng m²,
              mà bằng tiêu chuẩn sống, đẳng cấp dành riêng cho cư dân.
            </p>

            <p className="text-white font-semibold text-sm leading-relaxed mb-6 italic">
              Giá trị thật của bất động sản nằm ở cách nó được vận hành mỗi ngày
              – tìm hiểu kỹ hơn để thấy vì sao dự án này đang được nhiều nhà đầu tư quan tâm.
            </p>

            <Button href="#lien-he" className="bg-white text-terracotta hover:bg-white/90 border-white">
              Đăng ký ngay
            </Button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

import SectionWrapper from '@/app/components/ui/section-wrapper';
import Button from '@/app/components/ui/button';

/* Section Quy hoạch đô thị — theo dongtayland.vn */

const planningPoints = [
  'Hệ thống quản lý nước mưa (stormwater) tích hợp như một phần của cảnh quan tự nhiên, tránh cầu trúc thoát nước đơn thuần.',
  'Mạng lưới giao thông nội khu được tổ chức hợp lý, ưu tiên lưu thông bền vững và phù hợp với khí hậu địa phương.',
  'Tích hợp các nguồn hệ năng lượng tái tạo như điện mặt trời và hạ tầng hỗ trợ xe điện, hướng tới tiêu chí xanh – sạch – hiện đại ngay từ đầu.',
];

export default function PlanningSection() {
  return (
    <SectionWrapper id="quy-hoach" className="bg-gradient-to-br from-terracotta to-cta-orange">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left — nội dung */}
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-white font-bold uppercase mb-1">
              Quy hoạch đô thị
            </h2>
            <p className="font-heading text-xl md:text-2xl text-white/80 italic mb-6">
              Bền vững &amp; phục hồi
            </p>

            <p className="text-white/90 text-sm leading-relaxed mb-6">
              Coastal được quy hoạch chặt chẽ, bền vững ngay từ đầu nhằm giảm thiểu rủi ro,
              chi phí về lâu dài. Dự án không đơn thuần là sông xanh mà là tạo ra một đô thị
              tư duy trí chất lượng sống lâu dài, kể cả khi đối diện với những cú sốc
              môi trường &amp; tự nhiên.
            </p>

            <ul className="space-y-3 mb-6">
              {planningPoints.map((text) => (
                <li key={text} className="flex items-start gap-2.5 text-white/90 text-sm">
                  <span className="text-white mt-0.5 flex-shrink-0">✦</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <p className="text-white/90 text-sm italic mb-6">
              Đầu tư hôm nay là chọn cho con cái một môi trường sống tự vận hành bền vững 20-30 năm tới!
            </p>

            <Button href="#lien-he" className="bg-white !text-cta-orange hover:bg-white/90 border-white">
              Đăng ký ngay
            </Button>
          </div>

          {/* Right — ảnh quy hoạch */}
          <div>
            <img
              src="/images/hero/project-masterplan-reference.jpg"
              alt="Quy hoạch tổng thể Coastal Quảng Ngãi"
              loading="lazy"
              width={800}
              height={500}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

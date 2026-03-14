import SectionWrapper from '@/app/components/ui/section-wrapper';
import Button from '@/app/components/ui/button';

/* Section Đánh giá tiềm năng — chuẩn theo dongtayland.vn */

const potentialPoints = [
  'Dự án là nơi an cư lý tưởng có 1-0-2 của cư dân thành đạt, người giàu Quảng Ngãi & miền Trung, Tây Nguyên bởi sẽ không có dự án tương tự Coastal trong tương lai.',
  'Ngôi nhà quốc tế dành cho giới tri thức trong và ngoài nước đang làm việc tại khu kinh tế Dung Quất (đang mở hơn 45.000 ha) – Trung tâm công nghiệp & dịch vụ trọng điểm quốc gia, nơi tập trung hàng ngàn chuyên gia, kỹ sư nước ngoài.',
  'Thiết kế độc bản chưa từng xuất hiện trên thị trường, không dành cho số đông, không đại trà.',
  'Quỹ đất vàng ôm sông gần biển, riêng tư, trong lành & ít chịu tác động của thiên nhiên.',
  'Số lượng cực hiếm, đặc biệt dòng thấp tầng chỉ vỏn vẹn 442 căn, giá trị an cư, đầu tư hấp dẫn.',
];

export default function PotentialSection() {
  return (
    <SectionWrapper id="tiem-nang" className="bg-gradient-to-br from-terracotta to-cta-orange">
      <div className="container mx-auto">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="font-heading text-3xl md:text-4xl text-white font-bold uppercase">
            Đánh giá tiềm năng
          </h2>
          <p className="font-heading text-xl md:text-2xl text-white/90 italic">
            Haus Coastal
          </p>
        </div>

        {/* 2 cột: ảnh trái + bullet phải */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-10">
          <div>
            <img
              src="/images/location/investment-potential.png"
              alt="Tiềm năng đầu tư Coastal Quảng Ngãi"
              loading="lazy"
              width={800}
              height={500}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          <ul className="space-y-4">
            {potentialPoints.map((text) => (
              <li key={text} className="flex items-start gap-3 text-white/90 text-sm leading-relaxed">
                <span className="text-white mt-0.5 flex-shrink-0">✦</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-white text-sm italic mb-4">
            Nếu anh chị tìm kiếm một nơi an cư đẳng cấp và khan hiếm thực sự, đây là thời điểm phù hợp nhất!
          </p>
          <Button href="#lien-he" className="bg-white text-terracotta hover:bg-white/90 border-white">
            Đăng ký tư vấn
          </Button>
        </div>
      </div>

      {/* Ảnh ending panoramic — full-width, không padding, kết nối liền mạch */}
      <div className="-mb-16 mt-10">
        <img
          src="/images/hero/coastal-ending-cta.png"
          alt="Phối cảnh tổng thể Coastal Quảng Ngãi từ trên cao"
          loading="lazy"
          width={1920}
          height={480}
          className="w-full h-auto"
        />
      </div>
    </SectionWrapper>
  );
}

import SectionWrapper from '@/app/components/ui/section-wrapper';

export default function IntroductionSection() {
  return (
    <SectionWrapper id="gioi-thieu" className="!py-0">
      <div className="bg-cta-orange relative overflow-hidden">
        <div className="container mx-auto px-6 py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left — italic text, Cormorant Garamond style */}
            <div>
              <p className="text-white text-lg md:text-xl lg:text-[22px] italic leading-relaxed mb-6 font-medium">
                Coastal Quảng Ngãi là biểu tượng thứ 2 nhà sáng lập Haus kiến tạo tại Việt Nam
                sau thành công của Haus Dalat.
              </p>
              <p className="text-white text-lg md:text-xl lg:text-[22px] italic leading-relaxed font-medium">
                Nếu ví Haus Dalat mang đến &ldquo;ngôi nhà của giấc mơ&rdquo; giữa cao nguyên,
                thì Coastal chính là miền sinh thái ấn tượng của miền Trung - nơi mỗi ngày
                đều là những trải nghiệm sống thực sự trọn vẹn.
              </p>
            </div>

            {/* Right — composite reference image (same as dongtayland.vn) */}
            <div className="flex justify-center">
              <div className="w-full max-w-[550px]">
                <img
                  src="/images/hero/gioi-thieu-reference.png"
                  alt="Giới thiệu dự án Coastal Quảng Ngãi"
                  width={550}
                  height={640}
                  loading="lazy"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

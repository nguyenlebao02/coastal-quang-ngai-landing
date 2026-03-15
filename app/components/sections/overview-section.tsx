import SectionWrapper from '@/app/components/ui/section-wrapper';

/**
 * Overview section — matching dongtayland.vn:
 * White grid info → video overlaid on BG-Tong-quan-2.jpg image
 */
export default function OverviewSection() {
  return (
    <SectionWrapper id="tong-quan" className="!pb-0 bg-white">
      {/* Grid thông tin — nền trắng, z-10 để không bị video đè */}
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Heading — gradient orange text like dongtayland reference */}
        <h2 className="font-heading text-3xl md:text-4xl text-cta-orange font-bold italic mb-10 uppercase">
          Thông tin tổng quan
        </h2>

        {/* Row 1: Tên dự án | Chủ đầu tư | Vị trí | Quy mô */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 mb-8 pb-8 border-b border-gray-200">
          <div>
            <p className="text-charcoal text-xs font-bold uppercase tracking-[0.15em] mb-3">Tên dự án</p>
            <p className="text-charcoal/40 text-xs italic mb-1">A Community by HAUS</p>
            <img src="/images/misc/coastal-logo-gray.png" alt="Coastal Quảng Ngãi" width={200} height={60} className="h-12 md:h-16 object-contain" />
          </div>
          <div>
            <p className="text-charcoal text-xs font-bold uppercase tracking-[0.15em] mb-3">Chủ đầu tư</p>
            <img src="/images/misc/haus-logo-color.png" alt="Haus Group" width={120} height={60} className="h-14 md:h-[72px] object-contain" />
          </div>
          <div>
            <p className="text-charcoal text-xs font-bold uppercase tracking-[0.15em] mb-3">Vị trí</p>
            <p className="text-charcoal/70 text-sm leading-relaxed">Đường ven biển Dung Quất – Sa Huỳnh, Quảng Ngãi</p>
          </div>
          <div>
            <p className="text-charcoal text-xs font-bold uppercase tracking-[0.15em] mb-3">Quy mô</p>
            <p>
              <span className="font-heading text-4xl md:text-5xl font-bold text-cta-orange">93,9</span>
              <span className="text-charcoal/60 text-sm ml-1">ha</span>
            </p>
          </div>
        </div>

        {/* Row 2: Mật độ xây dựng | Loại hình SP | Số lượng SP | Pháp lý */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8">
          <div>
            <p className="text-charcoal text-xs font-bold uppercase tracking-[0.15em] mb-3">Mật độ xây dựng</p>
            <p>
              <span className="text-charcoal/60 text-sm">Chỉ </span>
              <span className="font-heading text-4xl md:text-5xl font-bold text-cta-orange">14</span>
              <span className="text-charcoal/60 text-sm ml-0.5">%</span>
            </p>
          </div>
          <div>
            <p className="text-charcoal text-xs font-bold uppercase tracking-[0.15em] mb-3">Loại hình sản phẩm</p>
            <p className="text-charcoal/70 text-sm leading-relaxed">Shophouse, Nhà phố, Biệt thự, Căn hộ</p>
          </div>
          <div>
            <p className="text-charcoal text-xs font-bold uppercase tracking-[0.15em] mb-3">Số lượng sản phẩm</p>
            <p className="text-charcoal/70 text-sm leading-relaxed">
              <span className="font-heading text-3xl font-bold text-cta-orange">1111</span>
              <span> căn bao gồm: </span>
              <span className="font-heading text-2xl font-bold text-cta-orange">146</span>
              <span> nhà liền kề, </span>
              <span className="font-heading text-2xl font-bold text-cta-orange">296</span>
              <span> biệt thự, </span>
              <span className="font-heading text-2xl font-bold text-cta-orange">669</span>
              <span> căn hộ cao cấp</span>
            </p>
          </div>
          <div>
            <p className="text-charcoal text-xs font-bold uppercase tracking-[0.15em] mb-3">Pháp lý</p>
            <p className="text-charcoal/70 text-sm leading-relaxed">Sổ hồng sở hữu lâu dài</p>
          </div>
        </div>
      </div>

      {/* Video + BG image layer: ảnh nền phía dưới, video đè lên trên */}
      <div className="relative mt-24 isolate">
        {/* BG-Tong-quan-2.jpg — lớp dưới */}
        <img
          src="/images/misc/bg-tong-quan.jpg"
          alt=""
          aria-hidden="true"
          width={1920}
          height={800}
          className="w-full h-auto block"
        />
        {/* Video — đè lên trên ảnh, căn giữa, z-0 để không đè lên content phía trên */}
        <div className="absolute inset-0 flex items-center justify-center px-4 md:px-8 lg:px-12 -translate-y-[10%] z-0">
          <div className="w-full max-w-[1500px] rounded-xl overflow-hidden shadow-2xl" style={{ aspectRatio: '16/9' }}>
            <iframe
              src="https://www.youtube.com/embed/RV5eoU2sv7s?autoplay=1&mute=1&color=red&controls=1&loop=1&playlist=RV5eoU2sv7s&rel=0&start=0&cc_load_policy=0&iv_load_policy=3&enablejsapi=1"
              title="Video giới thiệu Coastal Quảng Ngãi"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

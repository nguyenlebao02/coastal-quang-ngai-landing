import SectionWrapper from '@/app/components/ui/section-wrapper';

/* Bố cục theo screenshot dongtayland.vn — 2 hàng × 4 cột, nền trắng sạch */
export default function OverviewSection() {
  return (
    <SectionWrapper id="tong-quan" className="bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Heading — italic style like reference */}
        <h2 className="font-heading text-3xl md:text-4xl text-charcoal font-bold italic mb-10 uppercase">
          Thông tin tổng quan
        </h2>

        {/* Row 1: Tên dự án | Chủ đầu tư | Vị trí | Quy mô */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 mb-8 pb-8 border-b border-gray-200">
          {/* Tên dự án */}
          <div>
            <p className="text-charcoal/50 text-xs font-bold uppercase tracking-[0.15em] mb-3">Tên dự án</p>
            <p className="text-charcoal/40 text-xs italic mb-1">A Community by HAUS</p>
            <img
              src="/images/misc/coastal-logo-gray.png"
              alt="Coastal Quảng Ngãi"
              width={200}
              height={60}
              className="h-12 md:h-16 object-contain"
            />
          </div>

          {/* Chủ đầu tư */}
          <div>
            <p className="text-charcoal/50 text-xs font-bold uppercase tracking-[0.15em] mb-3">Chủ đầu tư</p>
            <img
              src="/images/misc/haus-logo-color.png"
              alt="Haus Group"
              width={120}
              height={60}
              className="h-14 md:h-[72px] object-contain"
            />
          </div>

          {/* Vị trí */}
          <div>
            <p className="text-charcoal/50 text-xs font-bold uppercase tracking-[0.15em] mb-3">Vị trí</p>
            <p className="text-charcoal text-sm leading-relaxed">
              Đường ven biển Dung Quất – Sa Huỳnh, Quảng Ngãi
            </p>
          </div>

          {/* Quy mô */}
          <div>
            <p className="text-charcoal/50 text-xs font-bold uppercase tracking-[0.15em] mb-3">Quy mô</p>
            <p className="text-charcoal">
              <span className="font-heading text-4xl md:text-5xl font-bold text-rose-beige">93,9</span>
              <span className="text-charcoal/60 text-sm ml-1">ha</span>
            </p>
          </div>
        </div>

        {/* Row 2: Mật độ xây dựng | Loại hình SP | Số lượng SP | Pháp lý */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8">
          {/* Mật độ xây dựng */}
          <div>
            <p className="text-charcoal/50 text-xs font-bold uppercase tracking-[0.15em] mb-3">Mật độ xây dựng</p>
            <p className="text-charcoal">
              <span className="text-charcoal/60 text-sm">Chỉ </span>
              <span className="font-heading text-4xl md:text-5xl font-bold text-rose-beige">14</span>
              <span className="text-charcoal/60 text-sm ml-0.5">%</span>
            </p>
          </div>

          {/* Loại hình sản phẩm */}
          <div>
            <p className="text-charcoal/50 text-xs font-bold uppercase tracking-[0.15em] mb-3">Loại hình sản phẩm</p>
            <p className="text-charcoal text-sm leading-relaxed">
              Shophouse, Nhà phố, Biệt thự, Căn hộ
            </p>
          </div>

          {/* Số lượng sản phẩm */}
          <div>
            <p className="text-charcoal/50 text-xs font-bold uppercase tracking-[0.15em] mb-3">Số lượng sản phẩm</p>
            <p className="text-charcoal text-sm leading-relaxed">
              <span className="font-heading text-3xl font-bold text-rose-beige">1111</span>
              <span> căn bao gồm: </span>
              <span className="font-heading text-2xl font-bold text-rose-beige">146</span>
              <span> nhà liền kề, </span>
              <span className="font-heading text-2xl font-bold text-rose-beige">296</span>
              <span> biệt thự, </span>
              <span className="font-heading text-2xl font-bold text-rose-beige">669</span>
              <span> căn hộ cao cấp</span>
            </p>
          </div>

          {/* Pháp lý */}
          <div>
            <p className="text-charcoal/50 text-xs font-bold uppercase tracking-[0.15em] mb-3">Pháp lý</p>
            <p className="text-charcoal text-sm leading-relaxed">Sổ hồng sở hữu lâu dài</p>
          </div>
        </div>

        {/* Project render image */}
        <div className="mt-10">
          <img
            src="/images/hero/coastal-overview-aerial.webp"
            alt="Phối cảnh dự án Coastal Quảng Ngãi"
            loading="lazy"
            width={1920}
            height={1012}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}

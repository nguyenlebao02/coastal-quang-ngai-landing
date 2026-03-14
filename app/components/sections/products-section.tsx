import SectionWrapper from '@/app/components/ui/section-wrapper';
import { PRODUCT_TYPES } from '@/app/lib/constants';

/* Bố cục sản phẩm theo dongtayland.vn — heading trái + desc phải, 3 card ngang */

export default function ProductsSection() {
  return (
    <SectionWrapper id="san-pham" className="bg-white">
      <div className="container mx-auto">
        {/* Header row — heading trái, mô tả phải */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 items-end">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-rose-beige font-bold uppercase">
              Loại hình sản phẩm
            </h2>
            <p className="font-heading text-xl md:text-2xl text-rose-beige/80 italic">
              Coastal Quảng Ngãi
            </p>
          </div>
          <p className="text-charcoal/70 text-sm leading-relaxed">
            Tổng quy mô sản phẩm khoảng <span className="text-rose-beige font-bold text-lg">1.111</span> căn
            – một con số đủ lớn để tạo cộng đồng, nhưng vẫn giữ được sự chọn lọc và kiểm soát chất lượng.
          </p>
        </div>

        {/* 3 product cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRODUCT_TYPES.map((product) => (
            <div key={product.id}>
              {/* Ảnh sản phẩm */}
              <div className="overflow-hidden rounded-lg mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  width={1023}
                  height={575}
                  className="w-full h-auto"
                />
              </div>

              {/* Tên sản phẩm — serif italic */}
              <h3 className="font-heading text-xl md:text-2xl text-charcoal italic mb-3">
                {product.name}
              </h3>

              {/* Bullet points với số lớn cam */}
              <ul className="space-y-1.5 mb-3">
                <li className="flex items-baseline gap-2 text-sm text-charcoal/80">
                  <span className="text-rose-beige font-bold">✦</span>
                  Khoảng <span className="text-rose-beige font-bold text-lg">{product.quantity.replace('~', '')}</span>
                </li>
                <li className="flex items-baseline gap-2 text-sm text-charcoal/80">
                  <span className="text-rose-beige font-bold">✦</span>
                  {product.maxFloors}
                </li>
                <li className="flex items-baseline gap-2 text-sm text-charcoal/80">
                  <span className="text-rose-beige font-bold">✦</span>
                  {product.description}
                </li>
              </ul>

              {/* Mô tả dài */}
              <p className="text-charcoal/60 text-sm leading-relaxed">
                {product.longDesc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

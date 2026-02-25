import SectionWrapper from '@/app/components/ui/section-wrapper';
import { PRODUCT_TYPES } from '@/app/lib/constants';

export default function ProductsSection() {
  return (
    <SectionWrapper
      id="san-pham"
      className="relative bg-cover bg-center"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/backgrounds/bg-product-types.jpg')" }}
      />
      <div className="absolute inset-0 bg-navy/85" />

      <div className="relative z-10 container mx-auto">
        <div className="text-center mb-12">
          <img
            src="/images/misc/title-product-types.png"
            alt="Loại hình sản phẩm"
            className="h-12 mx-auto mb-4"
          />
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-2">
            Loại hình sản phẩm
          </h2>
          <div className="gold-line mb-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCT_TYPES.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm"
            >
              <div className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-gold font-serif text-lg">{product.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Lost in Nature concept */}
        <div className="mt-12">
          <img
            src="/images/products/lost-in-nature-concept.jpg"
            alt="Lost in Nature - Thiết kế hòa mình vào thiên nhiên"
            className="w-full rounded-lg shadow-xl"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}

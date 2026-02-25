import Button from '@/app/components/ui/button';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero/hero-banner-coastal-aerial.jpg')" }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-white font-bold leading-tight mb-4 uppercase tracking-[2px]">
          COASTAL QUẢNG NGÃI
        </h1>
        <p className="text-white/80 text-lg md:text-xl mb-2 font-heading uppercase tracking-wide">
          Biểu tượng đô thị sinh thái biển đẳng cấp tại Quảng Ngãi
        </p>
        <div className="gold-line mb-8" />
        <p className="text-white/70 text-base md:text-lg mb-8 max-w-2xl mx-auto">
          Dự án đô thị sinh thái biển quy mô 93.9 HA từ Haus Group
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="#lien-he">Đăng ký tư vấn</Button>
          <Button href="#tong-quan" variant="outline" className="text-white border-white hover:bg-white hover:text-navy">
            Tìm hiểu thêm
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

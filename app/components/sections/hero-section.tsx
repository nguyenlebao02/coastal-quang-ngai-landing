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
        style={{ backgroundImage: "url('/images/hero/hero-banner.jpg')" }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-navy/50" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="gold-line mb-6" />
        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
          Biểu tượng đô thị sinh thái biển
          <br />
          <span className="text-gold">đẳng cấp tại Quảng Ngãi</span>
        </h1>
        <p className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Coastal Quảng Ngãi - Dự án đô thị sinh thái biển quy mô 93.9 HA từ Haus Group
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

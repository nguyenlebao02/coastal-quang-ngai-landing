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
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo */}
        <img
          src="/images/misc/coastal-logo-identity.png"
          alt="Coastal Quảng Ngãi"
          className="h-16 md:h-20 mx-auto mb-6"
        />
        <h1 className="font-heading text-4xl md:text-[44.8px] lg:text-6xl text-white font-bold leading-tight mb-3 uppercase tracking-[2px]">
          COASTAL QUẢNG NGÃI
        </h1>
        <p className="text-white/80 text-sm md:text-base mb-6 font-heading uppercase tracking-wider">
          Biểu tượng đô thị sinh thái biển
        </p>
        <div className="gold-line mb-8" />
        <Button href="#lien-he">Đăng ký tư vấn</Button>
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

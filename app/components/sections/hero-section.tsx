import Button from '@/app/components/ui/button';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image — uses <img> for LCP, crawlability, and fetchpriority support */}
      <img
        src="/images/hero/hero-banner-coastal-aerial.jpg"
        alt="Phối cảnh tổng thể dự án Coastal Quảng Ngãi nhìn từ trên cao"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo */}
        <img
          src="/images/misc/coastal-logo-white.png"
          alt="Coastal Quảng Ngãi"
          width={224}
          height={80}
          className="h-20 md:h-28 mx-auto mb-6"
        />
        <h1 className="font-heading text-4xl md:text-5xl lg:text-[64px] text-white font-bold leading-tight mb-4 uppercase tracking-[4px]">
          COASTAL QUẢNG NGÃI
        </h1>
        <div className="w-20 h-[1px] bg-white/50 mx-auto mb-4" />
        <p className="text-white/90 text-base md:text-lg mb-2 font-heading uppercase tracking-[3px]">
          Biểu tượng đô thị sinh thái biển
        </p>
        <p className="text-white/70 text-sm md:text-base mb-10 tracking-wide">
          Đô thị nghệ thuật văn hóa - Du thuyền hạng sang bên vịnh
        </p>
        <Button href="#lien-he" className="text-base px-12 py-4">Đăng ký tư vấn</Button>
      </div>
    </section>
  );
}

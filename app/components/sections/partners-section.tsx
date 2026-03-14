import SectionWrapper from '@/app/components/ui/section-wrapper';

/* Section đối tác — "LẦN ĐẦU TIÊN TẠI MIỀN TRUNG" theo dongtayland.vn */

const partners = [
  {
    category: 'Quy hoạch & Thiết kế đô thị',
    logo: '/images/partners/sweco.png',
    name: 'SWECO',
    desc: '(Thụy Điển) - TOP 1 châu Âu',
  },
  {
    category: 'Đơn vị xây dựng',
    logo: '/images/partners/delta.png',
    name: 'DELTA',
    desc: 'Đơn vị xây dựng hàng đầu Việt Nam',
  },
  {
    category: 'Quản lý & Vận hành',
    logo: '/images/partners/copper.png',
    name: 'COPPER BEECH',
    desc: 'Anh Quốc',
  },
];

export default function PartnersSection() {
  return (
    <SectionWrapper id="doi-tac" className="bg-gradient-to-r from-terracotta to-cta-orange">
      <div className="container mx-auto">
        {/* Heading */}
        <div className="mb-8">
          <h2 className="font-heading text-2xl md:text-3xl text-white font-bold uppercase italic">
            Lần đầu tiên tại miền Trung...{' '}
            <span className="font-normal text-lg md:text-xl text-white/90">
              Một dự án hội tụ đầy đủ các thương hiệu cao cấp nhất
            </span>
          </h2>
        </div>

        {/* 3 đối tác + 1 mô tả */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((p) => (
            <div key={p.name}>
              <p className="text-white/80 text-xs uppercase font-bold tracking-wider mb-3">
                {p.category}
              </p>
              <img
                src={p.logo}
                alt={p.name}
                loading="lazy"
                width={180}
                height={60}
                className="h-12 w-auto mb-2 brightness-0 invert"
              />
              <p className="text-white/70 text-sm">{p.desc}</p>
            </div>
          ))}

          {/* Mô tả bổ sung */}
          <div className="text-white/90 text-sm italic leading-relaxed">
            Bên cạnh đó CĐT cũng hợp tác với các thương hiệu thiết kế ánh sáng,
            thiết kế nội thất từ London, đảm bảo mang đến &ldquo;ngôi nhà quốc tế&rdquo;
            đẳng cấp, tỉ mỉ, chất lượng đến từng chi tiết nhỏ nhất.
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

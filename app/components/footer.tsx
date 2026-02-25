import { SITE_NAME, CONTACT_INFO, NAV_ITEMS } from '@/app/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <img
              src="/images/misc/coastal-logo-identity.png"
              alt={SITE_NAME}
              className="h-12 mb-4 brightness-0 invert"
            />
            <h3 className="font-heading text-xl text-cta-amber mb-2 font-bold uppercase">{SITE_NAME}</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Biểu tượng đô thị sinh thái biển đẳng cấp tại Quảng Ngãi
            </p>
            <p className="text-white/70 text-sm mt-2">{CONTACT_INFO.address}</p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-cta-amber text-sm font-heading font-bold uppercase tracking-wider mb-4">
              Liên kết
            </h4>
            <ul className="space-y-2">
              {NAV_ITEMS.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-white/70 text-sm hover:text-cta-orange transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-cta-amber text-sm font-heading font-bold uppercase tracking-wider mb-4">
              Liên hệ
            </h4>
            <div className="space-y-3 text-sm text-white/70">
              <p>
                <span className="text-white">Hotline: </span>
                <a href={`tel:${CONTACT_INFO.hotline}`} className="text-cta-amber hover:underline">
                  {CONTACT_INFO.hotline}
                </a>
              </p>
              <p>
                <span className="text-white">Email: </span>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-cta-orange transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </p>
            </div>
            {/* Policy links */}
            <div className="mt-4 flex gap-4 text-xs text-white/50">
              <a href="#" className="hover:text-white/80">Chính sách bảo mật</a>
              <a href="#" className="hover:text-white/80">Điều khoản sử dụng</a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} {SITE_NAME}. Tất cả quyền được bảo lưu.
        </div>
      </div>
    </footer>
  );
}

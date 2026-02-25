import { SITE_NAME, CONTACT_INFO, NAV_ITEMS } from '@/app/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <img
              src="/images/misc/coastal-logo-identity.png"
              alt={SITE_NAME}
              className="h-12 mb-4 brightness-0 invert"
            />
            <h3 className="font-heading text-lg text-rose-beige mb-2 font-bold uppercase">{SITE_NAME}</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Biểu tượng đô thị sinh thái biển đẳng cấp tại Quảng Ngãi
            </p>
            <p className="text-white/60 text-sm mt-2">{CONTACT_INFO.address}</p>
            {/* Social icons */}
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-rose-beige transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-rose-beige transition-colors" aria-label="YouTube">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-rose-beige transition-colors" aria-label="Zalo">
                <span className="text-xs font-bold">Z</span>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-rose-beige text-sm font-heading font-bold uppercase tracking-wider mb-4">
              Liên kết
            </h4>
            <ul className="space-y-2">
              {NAV_ITEMS.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-white/60 text-sm hover:text-rose-beige transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-rose-beige text-sm font-heading font-bold uppercase tracking-wider mb-4">
              Liên hệ
            </h4>
            <div className="space-y-3 text-sm text-white/60">
              <p>
                <span className="text-white/80">Hotline: </span>
                <a href={`tel:${CONTACT_INFO.hotline}`} className="text-rose-beige hover:underline">
                  {CONTACT_INFO.hotline}
                </a>
              </p>
              <p>
                <span className="text-white/80">Email: </span>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-rose-beige transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </p>
            </div>
            {/* Policy links */}
            <div className="mt-4 flex gap-4 text-xs text-white/40">
              <a href="#" className="hover:text-white/70">Chính sách bảo mật</a>
              <a href="#" className="hover:text-white/70">Điều khoản sử dụng</a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-xs text-white/30">
          © {new Date().getFullYear()} {SITE_NAME}. Tất cả quyền được bảo lưu.
        </div>
      </div>
    </footer>
  );
}

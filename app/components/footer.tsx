import Link from 'next/link';
import { SITE_NAME, CONTACT_INFO, NAV_ITEMS } from '@/app/lib/constants';

/* Copyright year — fixed at build time to avoid hydration mismatch at year boundary */
const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <img
              src="/images/misc/coastal-logo-white.png"
              alt={SITE_NAME}
              width={180}
              height={48}
              className="h-12 mb-4"
            />
            <h3 className="font-heading text-lg text-rose-beige mb-2 font-bold uppercase">{SITE_NAME}</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Đô thị biển đẳng cấp quốc tế đầu tiên tại miền Trung
            </p>
            <p className="text-white/60 text-sm mt-2">{CONTACT_INFO.address}</p>
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
                <a href={`tel:${CONTACT_INFO.hotlineRaw}`} className="text-rose-beige hover:underline">
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
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-xs text-white/30">
          © {CURRENT_YEAR} {SITE_NAME}. Tất cả quyền được bảo lưu.
        </div>
      </div>
    </footer>
  );
}

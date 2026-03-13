'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { NAV_ITEMS, SITE_NAME, CONTACT_INFO } from '@/app/lib/constants';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeMenu]);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 shadow-lg backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      {/* Top bar - hotline */}
      <div className={`hidden md:block text-white text-[11px] py-1 transition-colors duration-300 ${
        scrolled ? 'bg-rose-beige/90' : 'bg-black/30'
      }`}>
        <div className="container mx-auto flex justify-end gap-6 px-4">
          <a href={`tel:${CONTACT_INFO.hotlineRaw}`} className="hover:text-white/80 transition-colors">
            Hotline: {CONTACT_INFO.hotline}
          </a>
          <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white/80 transition-colors">
            {CONTACT_INFO.email}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="container mx-auto flex items-center justify-between py-2 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/images/misc/coastal-logo-identity.webp"
            alt={SITE_NAME}
            width={160}
            height={44}
            className={`w-auto transition-all duration-300 ${scrolled ? 'h-9' : 'h-11'}`}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`px-2 xl:px-2.5 py-2 text-[13px] font-heading font-bold transition-colors whitespace-nowrap uppercase tracking-wide ${
                scrolled
                  ? 'text-charcoal/80 hover:text-cta-orange'
                  : 'text-white/90 hover:text-cta-orange'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className={`lg:hidden p-2 ${scrolled ? 'text-charcoal' : 'text-white'}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Đóng menu' : 'Mở menu'}
          aria-expanded={isOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav with overlay */}
      {isOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 top-0 bg-black/30 z-40"
            onClick={closeMenu}
            aria-hidden="true"
          />
          <nav
            className="lg:hidden bg-white border-t border-gray-100 shadow-lg relative z-50"
            onKeyDown={(e) => {
              /* Focus trap: keep Tab cycling within mobile menu */
              if (e.key !== 'Tab') return;
              const focusable = e.currentTarget.querySelectorAll<HTMLElement>('a, button');
              if (focusable.length === 0) return;
              const first = focusable[0];
              const last = focusable[focusable.length - 1];
              if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
              } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
              }
            }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-6 py-3 text-sm font-heading font-bold text-charcoal/80 hover:text-cta-orange hover:bg-cream/30 transition-colors uppercase"
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
            <div className="px-6 py-3 border-t border-gray-100">
              <a href={`tel:${CONTACT_INFO.hotlineRaw}`} className="text-cta-orange text-sm font-semibold">
                {CONTACT_INFO.hotline}
              </a>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}

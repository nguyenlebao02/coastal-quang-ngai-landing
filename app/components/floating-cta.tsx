'use client';

import { CONTACT_INFO } from '@/app/lib/constants';

export default function FloatingCta() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* Phone button */}
      <a
        href={`tel:${CONTACT_INFO.hotline}`}
        className="w-14 h-14 bg-cta-orange rounded-full flex items-center justify-center shadow-lg hover:brightness-110 transition-all animate-pulse"
        aria-label="Gọi hotline"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </a>

      {/* Zalo button */}
      <a
        href="https://zalo.me/0899990917"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors"
        aria-label="Chat Zalo"
      >
        <svg className="w-7 h-7 text-white" viewBox="0 0 48 48" fill="currentColor">
          <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm8.5 26.5c-.3.8-1.8 1.5-2.5 1.6-.7.1-1.3.4-4.5-1-3.8-1.6-6.2-5.5-6.4-5.7-.2-.3-1.5-2-1.5-3.8s1-2.7 1.3-3c.3-.4.7-.5 1-.5h.7c.2 0 .5-.1.8.6.3.7 1 2.5 1.1 2.7.1.2.2.4 0 .7-.1.2-.2.4-.4.6-.2.2-.4.5-.5.6-.2.2-.4.4-.2.8.2.4 1 1.8 2.2 2.9 1.5 1.4 2.7 1.8 3.1 2 .4.2.6.2.8-.1.2-.3.9-1 1.1-1.4.2-.4.5-.3.8-.2.3.1 2 1 2.4 1.1.4.2.6.3.7.4.1.2.1 1-.2 1.8z" />
        </svg>
      </a>

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-14 h-14 bg-charcoal rounded-full flex items-center justify-center shadow-lg hover:bg-charcoal/80 transition-colors border border-white/10"
        aria-label="Lên đầu trang"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-gradient">
      <div className="text-center px-6">
        <h2 className="font-heading text-2xl text-cta-orange font-bold mb-4">Đã xảy ra lỗi</h2>
        <p className="text-charcoal/60 mb-6">Rất tiếc, đã có sự cố xảy ra. Vui lòng thử lại.</p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => reset()} className="px-6 py-3 bg-cta-orange text-white rounded-lg hover:brightness-110 transition-all font-semibold">
            Thử lại
          </button>
          <Link href="/" className="px-6 py-3 bg-charcoal text-white rounded-lg hover:bg-charcoal/80 transition-all font-semibold">
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}

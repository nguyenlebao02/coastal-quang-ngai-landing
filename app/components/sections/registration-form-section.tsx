'use client';

import { useState, useEffect } from 'react';
import SectionWrapper from '@/app/components/ui/section-wrapper';
import Button from '@/app/components/ui/button';
import { CONTACT_INFO } from '@/app/lib/constants';

const WEBHOOK_URL = 'https://crm.legacyhomes.com.vn/api/webhooks/landing/8e78d400-df3e-479f-8556-405785d28942';

function getUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((key) => {
    const val = params.get(key);
    if (val) utm[key] = val;
  });
  return utm;
}

export default function RegistrationFormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});

  useEffect(() => {
    setUtmParams(getUtmParams());
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const payload: Record<string, string> = {
      name: (formData.get('name') as string).trim(),
      phone: (formData.get('phone') as string).replace(/[\s-]/g, ''),
      notes: 'Đăng ký tham quan dự án',
      ...utmParams,
    };

    const email = (formData.get('email') as string).trim();
    if (email) payload.email = email;

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Gửi thất bại');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SectionWrapper
      id="dang-ky"
      className="relative bg-cover bg-center"
    >
      <div className="absolute inset-0 bg-rose-beige" />

      <div className="relative z-10 container mx-auto max-w-2xl text-center">
        <h3 className="font-heading text-xl md:text-2xl text-white font-medium mb-2 uppercase tracking-[1px]">
          Đăng ký tham quan dự án
        </h3>
        <div className="w-16 h-[1px] bg-white/60 mx-auto mb-4" />
        <p className="text-white/80 mb-8">
          Để lại thông tin để nhận bảng giá và chính sách ưu đãi mới nhất
        </p>

        {submitted ? (
          <div className="bg-white rounded-lg p-8">
            <p className="text-rose-beige text-xl font-semibold">Cảm ơn bạn đã đăng ký!</p>
            <p className="text-charcoal/70 mt-2">Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg p-8 space-y-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Họ và tên"
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-charcoal placeholder-charcoal/40 focus:border-rose-beige focus:outline-none transition-colors"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Số điện thoại"
              required
              pattern="[\d\s\-+]{9,15}"
              title="Số điện thoại (VD: 0901234567)"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-charcoal placeholder-charcoal/40 focus:border-rose-beige focus:outline-none transition-colors"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-charcoal placeholder-charcoal/40 focus:border-rose-beige focus:outline-none transition-colors"
            />

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? 'Đang gửi...' : 'Đăng ký ngay'}
            </Button>
          </form>
        )}

        <p className="text-white mt-6 text-lg font-semibold">
          Hotline: <a href={`tel:${CONTACT_INFO.hotline}`} className="hover:underline">{CONTACT_INFO.hotline}</a>
        </p>
      </div>
    </SectionWrapper>
  );
}

'use client';

import { useState, useEffect } from 'react';
import SectionWrapper from '@/app/components/ui/section-wrapper';
import Button from '@/app/components/ui/button';
import { CONTACT_PRODUCT_OPTIONS, CONTACT_INFO } from '@/app/lib/constants';

const WEBHOOK_URL = 'https://legacyghomes-legacy-homes-crm.tose.sh/api/webhooks/landing/8e78d400-df3e-479f-8556-405785d28942';

/* Extract UTM params from URL query string */
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

export default function ContactSection() {
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

    const form = e.currentTarget;
    const formData = new FormData(form);

    const product = formData.get('product') as string;
    const message = formData.get('message') as string;
    const notes = [product && `Sản phẩm: ${product}`, message].filter(Boolean).join(' | ');

    const payload: Record<string, string> = {
      name: (formData.get('name') as string).trim(),
      phone: (formData.get('phone') as string).replace(/[\s-]/g, ''),
      email: (formData.get('email') as string).trim(),
      notes,
      ...utmParams,
    };

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
    <SectionWrapper id="lien-he" className="bg-rose-beige">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <h3 className="font-heading text-xl md:text-2xl text-white font-medium mb-2 uppercase tracking-[1px]">
            Liên hệ với chúng tôi
          </h3>
          <div className="w-16 h-[1px] bg-white/60 mx-auto mb-4" />
          <p className="text-white/80">
            Để lại thông tin, chuyên viên tư vấn sẽ liên hệ bạn trong 24h
          </p>
        </div>

        {submitted ? (
          <div className="bg-white rounded-lg p-10 text-center">
            <p className="text-cta-amber text-2xl font-heading font-bold mb-2">Cảm ơn bạn!</p>
            <p className="text-charcoal/70">Chúng tôi đã nhận được thông tin và sẽ liên hệ sớm nhất.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg p-8 space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Họ và tên *"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-charcoal placeholder-charcoal/40 focus:border-rose-beige focus:outline-none transition-colors"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Số điện thoại *"
                required
                pattern="(\+84|0)\d{9,10}"
                title="Số điện thoại Việt Nam (VD: 0901234567)"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-charcoal placeholder-charcoal/40 focus:border-rose-beige focus:outline-none transition-colors"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-charcoal placeholder-charcoal/40 focus:border-rose-beige focus:outline-none transition-colors"
            />

            {/* Product type selection */}
            <div>
              <p className="text-charcoal/70 text-sm mb-3">Sản phẩm quan tâm:</p>
              <div className="grid grid-cols-2 gap-3">
                {CONTACT_PRODUCT_OPTIONS.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 text-charcoal/70 text-sm cursor-pointer hover:text-rose-beige transition-colors"
                  >
                    <input
                      type="radio"
                      name="product"
                      value={option}
                      className="accent-rose-beige"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <textarea
              name="message"
              placeholder="Nội dung tin nhắn"
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-charcoal placeholder-charcoal/40 focus:border-rose-beige focus:outline-none transition-colors resize-none"
            />

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? 'Đang gửi...' : 'Gửi thông tin'}
            </Button>
          </form>
        )}

        <div className="mt-8 text-center">
          <p className="text-white/70 text-sm mb-2">Hoặc liên hệ trực tiếp</p>
          <a
            href={`tel:${CONTACT_INFO.hotline}`}
            className="text-white text-2xl font-heading font-bold hover:underline"
          >
            {CONTACT_INFO.hotline}
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}

'use client';

import { useState, useEffect } from 'react';
import SectionWrapper from '@/app/components/ui/section-wrapper';
import Button from '@/app/components/ui/button';
import { CONTACT_PRODUCT_OPTIONS, CONTACT_INFO } from '@/app/lib/constants';
import { getUtmParams, submitFormToWebhook } from '@/app/lib/form-utils';

const INPUT_CLASS = 'w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-charcoal placeholder-charcoal/40 focus:border-rose-beige focus:outline-none transition-colors';

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
    if (submitting) return;
    setSubmitting(true);
    setError('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    /* Honeypot check — reset state before returning */
    if (formData.get('website')) {
      setSubmitting(false);
      return;
    }

    const product = formData.get('product') as string;
    const message = formData.get('message') as string;
    const notes = [product && `Sản phẩm: ${product}`, message].filter(Boolean).join(' | ');

    const payload: Record<string, string> = {
      name: (formData.get('name') as string).trim(),
      phone: (formData.get('phone') as string).replace(/[\s-]/g, ''),
      ...utmParams,
    };

    const email = (formData.get('email') as string).trim();
    if (email) payload.email = email;
    if (notes) payload.notes = notes;

    try {
      await submitFormToWebhook(payload);
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
          <h2 className="font-heading text-xl md:text-2xl text-white font-medium mb-2 uppercase tracking-[1px]">
            Liên hệ với chúng tôi
          </h2>
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
            {/* Honeypot — hidden from real users */}
            <input type="text" name="website" autoComplete="off" className="hidden" tabIndex={-1} aria-hidden="true" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="ct-name" className="sr-only">Họ và tên</label>
                <input id="ct-name" type="text" name="name" placeholder="Họ và tên *" required maxLength={100} className={INPUT_CLASS} />
              </div>
              <div>
                <label htmlFor="ct-phone" className="sr-only">Số điện thoại</label>
                <input id="ct-phone" type="tel" name="phone" placeholder="Số điện thoại *" required pattern="[\d\s\-+]{9,15}" title="Số điện thoại (VD: 0901234567)" maxLength={15} className={INPUT_CLASS} />
              </div>
            </div>
            <div>
              <label htmlFor="ct-email" className="sr-only">Email</label>
              <input id="ct-email" type="email" name="email" placeholder="Email" maxLength={254} className={INPUT_CLASS} />
            </div>

            {/* Product type selection */}
            <fieldset>
              <legend className="text-charcoal/70 text-sm mb-3">Sản phẩm quan tâm:</legend>
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
            </fieldset>

            <div>
              <label htmlFor="ct-message" className="sr-only">Nội dung tin nhắn</label>
              <textarea
                id="ct-message"
                name="message"
                placeholder="Nội dung tin nhắn"
                rows={4}
                maxLength={1000}
                className={`${INPUT_CLASS} resize-none`}
              />
            </div>

            {error && (
              <p role="alert" className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? 'Đang gửi...' : 'Gửi thông tin'}
            </Button>
          </form>
        )}

        <div className="mt-8 text-center">
          <p className="text-white/70 text-sm mb-2">Hoặc liên hệ trực tiếp</p>
          <a
            href={`tel:${CONTACT_INFO.hotlineRaw}`}
            className="text-white text-2xl font-heading font-bold hover:underline"
          >
            {CONTACT_INFO.hotline}
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}

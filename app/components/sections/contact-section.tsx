'use client';

import { useState } from 'react';
import SectionWrapper from '@/app/components/ui/section-wrapper';
import Button from '@/app/components/ui/button';
import { CONTACT_PRODUCT_OPTIONS, CONTACT_INFO } from '@/app/lib/constants';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <SectionWrapper id="lien-he" className="bg-navy">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-2">
            Liên hệ tư vấn
          </h2>
          <div className="gold-line mb-4" />
          <p className="text-white/70">
            Để lại thông tin, chuyên viên tư vấn sẽ liên hệ bạn trong 24h
          </p>
        </div>

        {submitted ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-10 text-center">
            <p className="text-gold text-2xl font-serif mb-2">Cảm ơn bạn!</p>
            <p className="text-white/70">Chúng tôi đã nhận được thông tin và sẽ liên hệ sớm nhất.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-8 space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Họ và tên *"
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:border-gold focus:outline-none transition-colors"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Số điện thoại *"
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:border-gold focus:outline-none transition-colors"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:border-gold focus:outline-none transition-colors"
            />

            {/* Product type selection */}
            <div>
              <p className="text-white/80 text-sm mb-3">Sản phẩm quan tâm:</p>
              <div className="grid grid-cols-2 gap-3">
                {CONTACT_PRODUCT_OPTIONS.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 text-white/80 text-sm cursor-pointer hover:text-gold transition-colors"
                  >
                    <input
                      type="radio"
                      name="product"
                      value={option}
                      className="accent-gold"
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
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:border-gold focus:outline-none transition-colors resize-none"
            />

            <Button type="submit" className="w-full">Gửi thông tin</Button>
          </form>
        )}

        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm mb-2">Hoặc liên hệ trực tiếp</p>
          <a
            href={`tel:${CONTACT_INFO.hotline}`}
            className="text-gold text-2xl font-serif font-bold hover:underline"
          >
            {CONTACT_INFO.hotline}
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}

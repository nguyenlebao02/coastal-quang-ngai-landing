'use client';

import { useState } from 'react';
import SectionWrapper from '@/app/components/ui/section-wrapper';
import Button from '@/app/components/ui/button';
import { CONTACT_INFO } from '@/app/lib/constants';

export default function RegistrationFormSection() {
  const [submitted, setSubmitted] = useState(false);

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
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
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
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-charcoal placeholder-charcoal/40 focus:border-rose-beige focus:outline-none transition-colors"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-charcoal placeholder-charcoal/40 focus:border-rose-beige focus:outline-none transition-colors"
            />
            <Button type="submit" className="w-full">Đăng ký ngay</Button>
          </form>
        )}

        <p className="text-white mt-6 text-lg font-semibold">
          Hotline: <a href={`tel:${CONTACT_INFO.hotline}`} className="hover:underline">{CONTACT_INFO.hotline}</a>
        </p>
      </div>
    </SectionWrapper>
  );
}

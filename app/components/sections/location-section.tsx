'use client';

import { useState, useEffect } from 'react';
import SectionWrapper from '@/app/components/ui/section-wrapper';

/* Bố cục vị trí — bản đồ trái, phải: heading + bullets + 3 carousel riêng biệt */

const locationBullets = [
  'Ngay đường ven biển Dung Quất - Sa Huỳnh',
  'Bao bọc bởi 4 mặt sông Phước Giang',
  '600m đến biển Mỹ Khê',
  '10 phút kết nối trung tâm Quảng Ngãi, QL1A',
  '15 phút kết nối cao tốc Đà Nẵng - Quảng Ngãi (cao tốc Bắc - Nam)',
  '30 phút đến sân bay Chu Lai, Khu Kinh tế Dung Quất, VSIP Quảng Ngãi',
  'Chỉ 3-10 phút di chuyển, cư dân Coastal Quảng Ngãi dễ dàng tiếp cận: Vincom, chợ, hệ thống trường liên cấp, bệnh viện đa khoa,...',
];

/* 3 carousel riêng biệt, mỗi cái 2 ảnh */
const carousels = [
  [
    { src: '/images/location/location-detail-4.jpg', label: 'Cao tốc Đà Nẵng - Quảng Ngãi' },
    { src: '/images/location/location-detail-1.jpg', label: 'Đường biển Dung Quất - Sa Huỳnh' },
  ],
  [
    { src: '/images/location/location-detail-5.jpg', label: 'Sân bay Chu Lai' },
    { src: '/images/location/location-detail-2.jpg', label: 'Biển Mỹ Khê' },
  ],
  [
    { src: '/images/location/location-detail-3.jpg', label: 'Quốc lộ 1A' },
    { src: '/images/location/location-detail-6.jpg', label: 'Các tiện ích khác' },
  ],
];

/* Mini carousel component — chuyển giữa 2 ảnh */
function MiniCarousel({ images, delay }: { images: typeof carousels[0]; delay: number }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIdx((i) => (i + 1) % images.length), delay);
    return () => clearInterval(timer);
  }, [images.length, delay]);

  return (
    <div className="overflow-hidden rounded">
      <img
        src={images[idx].src}
        alt={images[idx].label}
        loading="lazy"
        width={340}
        height={604}
        className="w-full h-auto"
      />
    </div>
  );
}

export default function LocationSection() {
  return (
    <SectionWrapper id="vi-tri" className="bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left — Bản đồ */}
          <div>
            <img
              src="/images/location/location-map.jpg"
              alt="Bản đồ vị trí Coastal Quảng Ngãi"
              loading="lazy"
              width={800}
              height={900}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>

          {/* Right — Heading + bullets + 3 carousel riêng biệt */}
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-rose-beige font-bold italic mb-1 uppercase">
              Vị trí lý tưởng
            </h2>
            <p className="font-heading text-lg md:text-xl text-rose-beige/80 italic mb-6">
              Cận giang - Cận hải - Cận lộ
            </p>

            <ul className="space-y-2 mb-6">
              {locationBullets.map((text) => (
                <li key={text} className="flex items-start gap-2.5 text-charcoal text-sm">
                  <span className="text-gold mt-0.5 flex-shrink-0">✦</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            {/* 3 carousel riêng biệt cạnh nhau — mỗi cái tự chuyển 2 ảnh */}
            <div className="grid grid-cols-3 gap-3">
              {carousels.map((images, i) => (
                <MiniCarousel key={i} images={images} delay={4000 + i * 1500} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

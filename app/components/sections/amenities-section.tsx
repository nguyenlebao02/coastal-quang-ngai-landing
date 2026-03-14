'use client';

import { useState } from 'react';
import SectionWrapper from '@/app/components/ui/section-wrapper';
import Carousel from '@/app/components/ui/carousel';
import { AMENITIES } from '@/app/lib/constants';

/* 3 nhóm tiện ích — chuẩn theo dongtayland.vn */
const amenityGroups = [
  {
    title: 'Tiện ích sinh hoạt & cộng đồng',
    items: [
      'Quảng trường ánh sáng & nhạc nước',
      'Công viên ven sông & mảng xanh sinh thái ấn tượng',
      'Khu vui chơi trẻ em (Kids Zone)',
      'Vườn nướng BBQ ven hồ',
      'Clubhouse sang trọng',
    ],
  },
  {
    title: 'Tiện ích thể thao & giải trí',
    items: [
      'Khu thể thao đa năng: gym, yoga, sân tennis',
      'Hồ bơi phong cách resort',
      'Bến du thuyền trên sông Phước Giang',
    ],
  },
  {
    title: 'Tiện ích thương mại & dịch vụ',
    items: [
      'Phố thương mại sầm uất, đầy đủ các dịch vụ ăn uống, mua sắm',
      'Hệ thống an ninh đa lớp: camera 24/7 cùng đội ngũ bảo vệ chuyên nghiệp',
    ],
  },
];

const carouselItems = AMENITIES.map((a) => ({ image: a.image, label: a.name }));

export default function AmenitiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SectionWrapper id="tien-ich" className="bg-cream-gradient">
      <div className="container mx-auto">
        {/* Header row — heading trái, mô tả phải (giống reference) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 items-end">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-rose-beige font-bold uppercase">
              Tiện ích đô thị
            </h2>
            <p className="font-heading text-xl md:text-2xl text-rose-beige/80 italic">
              Giàu giá trị
            </p>
          </div>
          <p className="text-charcoal/70 text-sm leading-relaxed">
            Coastal Quảng Ngãi có mật độ xây dựng thấp giúp cư dân tận hưởng không gian
            thoáng đãng, hạn chế áp lực giao thông và ô nhiễm — điều mà các đô thị đông đúc
            khó có được, cư dân trải nghiệm sống với tiện ích nội khu chuẩn Resort 5 sao.
          </p>
        </div>

        {/* 3 nhóm tiện ích */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {amenityGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-heading text-base text-charcoal font-bold mb-3 italic">
                {group.title}
              </h3>
              <ul className="space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-charcoal/70 text-sm">
                    <span className="text-rose-beige mt-0.5 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Main carousel */}
        <Carousel
          items={carouselItems}
          autoPlay={5000}
          showArrows={true}
          showDots={false}
          loop={true}
          slideHeight="h-[400px] md:h-[550px]"
          showCaption={true}
          activeIndex={activeIndex}
          onSlideChange={setActiveIndex}
        />

        {/* Thumbnail navigation */}
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-4">
          {AMENITIES.map((amenity, i) => (
            <button
              key={amenity.name}
              onClick={() => setActiveIndex(i)}
              className={`overflow-hidden rounded transition-all duration-200 ${
                i === activeIndex
                  ? 'ring-2 ring-rose-beige scale-105'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={amenity.image}
                alt={amenity.name}
                width={1279}
                height={719}
                className="w-full h-14 md:h-20 object-cover"
              />
              <p className="text-[10px] md:text-xs text-center py-1 bg-rose-beige text-white truncate px-1">
                {amenity.name}
              </p>
            </button>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

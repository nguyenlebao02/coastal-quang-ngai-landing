'use client';

import { useState } from 'react';
import SectionWrapper from '@/app/components/ui/section-wrapper';
import Carousel from '@/app/components/ui/carousel';
import { AMENITIES } from '@/app/lib/constants';

const carouselItems = AMENITIES.map((a) => ({ image: a.image, label: a.name }));

export default function AmenitiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SectionWrapper id="tien-ich" className="bg-cream-gradient">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <img
            src="/images/misc/title-rich-amenity-system.png"
            alt="Hệ tiện ích giàu giá trị"
            loading="lazy"
            width={600}
            height={180}
            className="h-12 mx-auto mb-4"
          />
          <h2 className="font-heading text-2xl md:text-3xl text-rose-beige font-bold mb-2 uppercase">
            Hệ tiện ích đẳng cấp
          </h2>
          <div className="rose-line mb-6" />
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
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-8 gap-2 mt-4">
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

        {/* Amenity legend */}
        <div className="mt-8">
          <img
            src="/images/amenities/amenity-legend.jpg"
            alt="Chú thích tiện ích"
            loading="lazy"
            width={1920}
            height={246}
            className="w-full rounded-lg"
          />
        </div>

        {/* Overview image */}
        <div className="mt-8">
          <img
            src="/images/hero/hero-intro-coastal.jpg"
            alt="Tổng quan tiện ích Coastal Quảng Ngãi"
            loading="lazy"
            width={1500}
            height={938}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}

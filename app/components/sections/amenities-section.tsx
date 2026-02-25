'use client';

import { useState } from 'react';
import SectionWrapper from '@/app/components/ui/section-wrapper';
import { AMENITIES } from '@/app/lib/constants';

export default function AmenitiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SectionWrapper id="tien-ich" className="bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <img
            src="/images/misc/title-rich-amenity-system.png"
            alt="Hệ tiện ích giàu giá trị"
            className="h-12 mx-auto mb-4"
          />
          <h2 className="font-serif text-3xl md:text-4xl text-navy mb-2">
            Hệ tiện ích đẳng cấp
          </h2>
          <div className="gold-line mb-6" />
        </div>

        {/* Main featured image */}
        <div className="relative mb-6 overflow-hidden rounded-lg">
          <img
            src={AMENITIES[activeIndex].image}
            alt={AMENITIES[activeIndex].name}
            className="w-full h-[400px] md:h-[500px] object-cover transition-all duration-500"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy/80 to-transparent p-6">
            <h3 className="text-white font-serif text-2xl">{AMENITIES[activeIndex].name}</h3>
          </div>
        </div>

        {/* Thumbnail grid */}
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-8 gap-2">
          {AMENITIES.map((amenity, i) => (
            <button
              key={amenity.name}
              onClick={() => setActiveIndex(i)}
              className={`overflow-hidden rounded transition-all duration-200 ${
                i === activeIndex
                  ? 'ring-2 ring-gold scale-105'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={amenity.image}
                alt={amenity.name}
                className="w-full h-16 md:h-20 object-cover"
              />
              <p className="text-xs text-center py-1 bg-navy text-white truncate px-1">
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
            className="w-full"
          />
        </div>

        {/* Tiện ích overview image */}
        <div className="mt-8">
          <img
            src="/images/hero/hero-intro-coastal.jpg"
            alt="Tổng quan tiện ích Coastal Quảng Ngãi"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}

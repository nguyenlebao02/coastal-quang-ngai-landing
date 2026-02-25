'use client';

import { useState } from 'react';
import SectionWrapper from '@/app/components/ui/section-wrapper';
import Lightbox from '@/app/components/ui/lightbox';

const interiorShowcase = [
  { src: '/images/interior/interior-showcase-1.jpg', alt: 'Nội thất cao cấp' },
  { src: '/images/interior/interior-showcase-3.webp', alt: 'Nội thất phòng khách' },
  { src: '/images/interior/interior-showcase-2.webp', alt: 'Nội thất phòng ngủ' },
];

const semiDetachedImages = [
  { src: '/images/interior/semi-detached-villa-interior-1.jpg', alt: 'Biệt thự song lập - Phòng khách' },
  { src: '/images/interior/semi-detached-villa-interior-2.jpg', alt: 'Biệt thự song lập - Phòng bếp' },
  { src: '/images/interior/semi-detached-villa-interior-3.jpg', alt: 'Biệt thự song lập - Phòng ngủ' },
  { src: '/images/interior/semi-detached-villa-interior-4.jpg', alt: 'Biệt thự song lập - Phòng tắm' },
];

const detachedImages = [
  { src: '/images/interior/detached-villa-interior-1.jpg', alt: 'Biệt thự đơn lập - Tổng quan' },
  { src: '/images/interior/detached-villa-interior-3.jpg', alt: 'Biệt thự đơn lập - Phòng khách' },
  { src: '/images/interior/detached-villa-interior-4.jpg', alt: 'Biệt thự đơn lập - Phòng ngủ' },
];

export default function ArchitectureSection() {
  const [lightbox, setLightbox] = useState<{ images: typeof interiorShowcase; index: number } | null>(null);

  const openLightbox = (images: typeof interiorShowcase, index: number) => {
    setLightbox({ images, index });
  };

  return (
    <SectionWrapper id="ban-giao" className="relative bg-cover bg-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/backgrounds/bg-interior-section.jpg')" }}
      />
      <div className="absolute inset-0 bg-navy/85" />

      <div className="relative z-10 container mx-auto">
        <div className="text-center mb-12">
          <img
            src="/images/misc/title-full-interior-delivery.png"
            alt="Bàn giao full nội thất"
            className="h-12 mx-auto mb-4"
          />
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-2">
            Bàn giao full nội thất
          </h2>
          <div className="gold-line mb-6" />
        </div>

        {/* Interior showcase - clickable lightbox gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div
            className="md:col-span-2 cursor-pointer group overflow-hidden rounded-lg"
            onClick={() => openLightbox(interiorShowcase, 0)}
          >
            <img
              src={interiorShowcase[0].src}
              alt={interiorShowcase[0].alt}
              className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col gap-4">
            {interiorShowcase.slice(1).map((img, i) => (
              <div
                key={i}
                className="cursor-pointer group overflow-hidden rounded-lg flex-1"
                onClick={() => openLightbox(interiorShowcase, i + 1)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Semi-detached villa gallery */}
        <div className="mb-12">
          <h3 className="font-serif text-2xl text-gold mb-6 text-center">
            Biệt thự song lập
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {semiDetachedImages.map((img, i) => (
              <div
                key={i}
                className="cursor-pointer group overflow-hidden rounded-lg"
                onClick={() => openLightbox(semiDetachedImages, i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-40 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Detached villa gallery */}
        <div>
          <h3 className="font-serif text-2xl text-gold mb-6 text-center">
            Biệt thự đơn lập
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {detachedImages.map((img, i) => (
              <div
                key={i}
                className="cursor-pointer group overflow-hidden rounded-lg"
                onClick={() => openLightbox(detachedImages, i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-40 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox modal */}
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          isOpen={true}
          startIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </SectionWrapper>
  );
}

'use client';

import { useState } from 'react';
import SectionWrapper from '@/app/components/ui/section-wrapper';
import Lightbox from '@/app/components/ui/lightbox';

const interiorShowcase = [
  { src: '/images/interior/interior-showcase-1.jpg', alt: 'Nội thất cao cấp', width: 960, height: 640 },
  { src: '/images/interior/interior-showcase-3.webp', alt: 'Nội thất phòng khách', width: 800, height: 1192 },
  { src: '/images/interior/interior-showcase-2.webp', alt: 'Nội thất phòng ngủ', width: 800, height: 1192 },
];

const semiDetachedImages = [
  { src: '/images/interior/semi-detached-villa-interior-1.jpg', alt: 'Biệt thự song lập - Phòng khách', width: 1279, height: 719 },
  { src: '/images/interior/semi-detached-villa-interior-2.jpg', alt: 'Biệt thự song lập - Phòng bếp', width: 1279, height: 719 },
  { src: '/images/interior/semi-detached-villa-interior-3.jpg', alt: 'Biệt thự song lập - Phòng ngủ', width: 1279, height: 719 },
  { src: '/images/interior/semi-detached-villa-interior-4.jpg', alt: 'Biệt thự song lập - Phòng tắm', width: 1279, height: 719 },
];

const detachedImages = [
  { src: '/images/interior/detached-villa-interior-1.jpg', alt: 'Biệt thự đơn lập - Tổng quan', width: 1290, height: 710 },
  { src: '/images/interior/detached-villa-interior-3.jpg', alt: 'Biệt thự đơn lập - Phòng khách', width: 1290, height: 710 },
  { src: '/images/interior/detached-villa-interior-4.jpg', alt: 'Biệt thự đơn lập - Phòng ngủ', width: 1290, height: 710 },
];

export default function ArchitectureSection() {
  const [lightbox, setLightbox] = useState<{ images: typeof interiorShowcase; index: number } | null>(null);

  const openLightbox = (images: typeof interiorShowcase, index: number) => {
    setLightbox({ images, index });
  };

  return (
    <SectionWrapper id="ban-giao" className="bg-cream-gradient">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <img
            src="/images/misc/title-full-interior-delivery.webp"
            alt="Bàn giao full nội thất"
            width={800}
            height={447}
            className="h-12 mx-auto mb-4"
          />
          <h2 className="font-heading text-2xl md:text-3xl text-rose-beige font-bold mb-2 uppercase">
            Thiết kế nội thất cao cấp
          </h2>
          <div className="rose-line mb-6" />
        </div>

        {/* Interior showcase */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          <div
            className="col-span-2 cursor-pointer group overflow-hidden rounded-lg aspect-[16/9]"
            role="button"
            tabIndex={0}
            onClick={() => openLightbox(interiorShowcase, 0)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(interiorShowcase, 0); } }}
            aria-label={`Xem ảnh: ${interiorShowcase[0].alt}`}
          >
            <img
              src={interiorShowcase[0].src}
              alt={interiorShowcase[0].alt}
              loading="lazy"
              width={interiorShowcase[0].width}
              height={interiorShowcase[0].height}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          {interiorShowcase.slice(1).map((img, i) => (
            <div
              key={img.src}
              className="cursor-pointer group overflow-hidden rounded-lg aspect-[4/3]"
              role="button"
              tabIndex={0}
              onClick={() => openLightbox(interiorShowcase, i + 1)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(interiorShowcase, i + 1); } }}
              aria-label={`Xem ảnh: ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                width={img.width}
                height={img.height}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Semi-detached villa gallery */}
        <div className="mb-10">
          <h3 className="font-heading text-xl text-charcoal mb-6 text-center font-bold uppercase">
            Biệt thự song lập
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {semiDetachedImages.map((img, i) => (
              <div
                key={img.src}
                className="cursor-pointer group overflow-hidden rounded-lg aspect-[4/3]"
                role="button"
                tabIndex={0}
                onClick={() => openLightbox(semiDetachedImages, i)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(semiDetachedImages, i); } }}
                aria-label={`Xem ảnh: ${img.alt}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  width={img.width}
                  height={img.height}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Detached villa gallery */}
        <div>
          <h3 className="font-heading text-xl text-charcoal mb-6 text-center font-bold uppercase">
            Biệt thự đơn lập
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {detachedImages.map((img, i) => (
              <div
                key={img.src}
                className="cursor-pointer group overflow-hidden rounded-lg aspect-[4/3]"
                role="button"
                tabIndex={0}
                onClick={() => openLightbox(detachedImages, i)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(detachedImages, i); } }}
                aria-label={`Xem ảnh: ${img.alt}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  width={img.width}
                  height={img.height}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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

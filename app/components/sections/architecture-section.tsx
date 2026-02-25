import SectionWrapper from '@/app/components/ui/section-wrapper';

const interiorGallery = {
  semiDetached: {
    title: 'Biệt thự song lập',
    main: '/images/interior/semi-detached-villa-interior-1.jpg',
    thumbs: [
      '/images/interior/semi-detached-villa-interior-2.jpg',
      '/images/interior/semi-detached-villa-interior-3.jpg',
      '/images/interior/semi-detached-villa-interior-4.jpg',
    ],
  },
  detached: {
    title: 'Biệt thự đơn lập',
    main: '/images/interior/detached-villa-interior-1.jpg',
    thumbs: [
      '/images/interior/detached-villa-interior-3.jpg',
      '/images/interior/detached-villa-interior-4.jpg',
    ],
  },
};

export default function ArchitectureSection() {
  return (
    <SectionWrapper
      id="ban-giao"
      className="relative bg-cover bg-center"
    >
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

        {/* Interior showcase images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="md:col-span-2">
            <img
              src="/images/interior/interior-showcase-1.jpg"
              alt="Nội thất cao cấp"
              className="w-full h-64 md:h-80 object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-4">
            <img
              src="/images/interior/interior-showcase-3.webp"
              alt="Nội thất phòng khách"
              className="w-full h-[calc(50%-0.5rem)] object-cover rounded-lg"
            />
            <img
              src="/images/interior/interior-showcase-2.webp"
              alt="Nội thất phòng ngủ"
              className="w-full h-[calc(50%-0.5rem)] object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Semi-detached villa */}
        <div className="mb-12">
          <h3 className="font-serif text-2xl text-gold mb-6 text-center">
            {interiorGallery.semiDetached.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img
              src={interiorGallery.semiDetached.main}
              alt={interiorGallery.semiDetached.title}
              className="w-full h-72 object-cover rounded-lg"
            />
            <div className="grid grid-cols-2 gap-4">
              {interiorGallery.semiDetached.thumbs.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${interiorGallery.semiDetached.title} ${i + 2}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Detached villa */}
        <div>
          <h3 className="font-serif text-2xl text-gold mb-6 text-center">
            {interiorGallery.detached.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <img
                src={interiorGallery.detached.main}
                alt={interiorGallery.detached.title}
                className="w-full h-72 object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-rows-2 gap-4">
              {interiorGallery.detached.thumbs.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${interiorGallery.detached.title} ${i + 2}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

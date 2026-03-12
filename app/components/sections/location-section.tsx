import SectionWrapper from '@/app/components/ui/section-wrapper';

const locationAdvantages = [
  {
    icon: '/images/icons/icon-share-location.png',
    title: 'Cận thị - Cận giang - Cận lộ',
    description: 'Vị trí đắc địa kết nối trung tâm thành phố, sông Trà Khúc và các tuyến giao thông huyết mạch.',
  },
  {
    icon: '/images/icons/icon-timer-5-min.png',
    title: '5 phút đến trung tâm',
    description: 'Kết nối nhanh chóng đến trung tâm TP. Quảng Ngãi, các khu thương mại và dịch vụ.',
  },
  {
    icon: '/images/icons/icon-timer-10-min.png',
    title: '10 phút đến biển',
    description: 'Gần bãi biển Mỹ Khê, sân bay Chu Lai và các điểm du lịch nổi tiếng.',
  },
];

export default function LocationSection() {
  return (
    <SectionWrapper
      id="vi-tri"
      className="bg-cream-gradient"
    >
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <img
            src="/images/misc/title-location-convergence.png"
            alt="Vị trí hội tụ"
            width={600}
            height={100}
            className="h-8 mx-auto mb-4"
          />
          <h2 className="font-heading text-xl md:text-2xl text-rose-beige font-bold mb-2 uppercase">
            Vị trí Coastal Quảng Ngãi
          </h2>
          <div className="rose-line mb-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Map */}
          <div>
            <img
              src="/images/location/location-map.jpg"
              alt="Bản đồ vị trí Coastal Quảng Ngãi"
              loading="lazy"
              width={1667}
              height={2083}
              className="w-full rounded-lg shadow-xl"
            />
          </div>

          {/* Location advantages */}
          <div className="space-y-6">
            {locationAdvantages.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <img src={item.icon} alt="" width={30} height={30} className="w-8 h-8 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-rose-beige font-heading font-bold text-lg mb-1">{item.title}</h4>
                  <p className="text-charcoal/70 text-sm">{item.description}</p>
                </div>
              </div>
            ))}

            {/* Investment potential */}
            <div className="bg-white/60 rounded-lg p-6 mt-4 border border-rose-beige/20">
              <h4 className="text-charcoal font-heading font-bold mb-2">Tiềm năng tăng giá</h4>
              <p className="text-charcoal/70 text-sm">
                Quảng Ngãi đang trở thành điểm nóng đầu tư bất động sản với hạ tầng giao thông
                phát triển mạnh mẽ, thu hút các tập đoàn lớn và dự án FDI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

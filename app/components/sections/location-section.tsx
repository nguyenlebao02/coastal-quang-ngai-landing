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
      className="relative bg-cover bg-center"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/backgrounds/bg-location-section.jpg')" }}
      />
      <div className="absolute inset-0 bg-navy/85" />

      <div className="relative z-10 container mx-auto">
        <div className="text-center mb-12">
          <img
            src="/images/misc/title-location-convergence.png"
            alt="Vị trí hội tụ"
            className="h-8 mx-auto mb-4"
          />
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-2">
            Vị trí chiến lược
          </h2>
          <div className="gold-line mb-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Map */}
          <div>
            <img
              src="/images/location/location-map.png"
              alt="Bản đồ vị trí Coastal Quảng Ngãi"
              className="w-full rounded-lg shadow-xl"
            />
          </div>

          {/* Location advantages */}
          <div className="space-y-8">
            {locationAdvantages.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <img src={item.icon} alt="" className="w-8 h-8 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-gold font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-white/70 text-sm">{item.description}</p>
                </div>
              </div>
            ))}

            {/* Investment potential */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-6">
              <h4 className="text-gold font-semibold mb-2">Tiềm năng tăng giá</h4>
              <p className="text-white/70 text-sm">
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

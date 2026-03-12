import { Suspense } from 'react';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';
import HeroSection from '@/app/components/sections/hero-section';
import IntroductionSection from '@/app/components/sections/introduction-section';
import RegistrationFormSection from '@/app/components/sections/registration-form-section';
import OverviewSection from '@/app/components/sections/overview-section';
import LocationSection from '@/app/components/sections/location-section';
import AmenitiesSection from '@/app/components/sections/amenities-section';
import ArchitectureSection from '@/app/components/sections/architecture-section';
import PolicySection from '@/app/components/sections/policy-section';
import ProductsSection from '@/app/components/sections/products-section';
import LayoutSection from '@/app/components/sections/layout-section';
import ProgressSection from '@/app/components/sections/progress-section';
import NewsSection from '@/app/components/sections/news-section';
import ContactSection from '@/app/components/sections/contact-section';
import { SITE_URL } from '@/app/lib/constants';

function NewsSkeleton() {
  return (
    <div className="py-16 bg-cream-gradient">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <div className="h-8 w-48 bg-rose-beige/20 rounded mx-auto mb-2" />
          <div className="rose-line mb-6" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
              <div className="h-48 bg-gray-200" />
              <div className="p-5 space-y-3">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Skip to content — accessibility (visually hidden until focused) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-navy focus:shadow-lg focus:rounded"
      >
        Chuyển đến nội dung chính
      </a>
      {/* RealEstateListing JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'RealEstateListing',
          name: 'Coastal Quảng Ngãi',
          description: 'Đô thị sinh thái biển đẳng cấp tại Quảng Ngãi - Shophouse, Biệt thự, Căn hộ',
          url: `${SITE_URL}/`,
          image: `${SITE_URL}/images/hero/hero-banner-coastal-aerial.jpg`,
          mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/` },
          address: {
            '@type': 'PostalAddress',
            streetAddress: '88 Hùng Vương, Phường Nghĩa Lộ',
            addressLocality: 'Quảng Ngãi',
            addressRegion: 'Quảng Ngãi',
            addressCountry: 'VN',
          },
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'VND',
            availability: 'https://schema.org/PreOrder',
            lowPrice: '3000000000',
            offerCount: '4',
          },
        }) }}
      />
      {/* FAQPage JSON-LD — targets long-tail search queries */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Dự án Coastal Quảng Ngãi ở đâu?',
              acceptedAnswer: { '@type': 'Answer', text: 'Dự án Coastal Quảng Ngãi tọa lạc tại TP. Quảng Ngãi, Tỉnh Quảng Ngãi, do Haus Group phát triển với quy mô 93.9 ha. Vị trí đắc địa ven biển, kết nối trung tâm thành phố và các tuyến giao thông huyết mạch.' },
            },
            {
              '@type': 'Question',
              name: 'Coastal Quảng Ngãi có những loại hình sản phẩm nào?',
              acceptedAnswer: { '@type': 'Answer', text: 'Coastal Quảng Ngãi cung cấp đa dạng sản phẩm: Central Villa (biệt thự trung tâm), Nature Villa (biệt thự sinh thái), Hidden Villa (biệt thự ẩn mình), Multikey (căn hộ thông minh), Shophouse thương mại và Nhà phố.' },
            },
            {
              '@type': 'Question',
              name: 'Pháp lý dự án Coastal Quảng Ngãi như thế nào?',
              acceptedAnswer: { '@type': 'Answer', text: 'Dự án Coastal Quảng Ngãi có pháp lý sổ đỏ lâu dài, đảm bảo quyền sở hữu vĩnh viễn cho cư dân. Chủ đầu tư Haus Group cam kết hoàn thiện pháp lý đầy đủ trước khi bàn giao.' },
            },
            {
              '@type': 'Question',
              name: 'Khi nào Coastal Quảng Ngãi bàn giao?',
              acceptedAnswer: { '@type': 'Answer', text: 'Dự kiến Coastal Quảng Ngãi bàn giao giai đoạn 1 trong năm 2027-2028. Tiến độ xây dựng được cập nhật thường xuyên trên website.' },
            },
            {
              '@type': 'Question',
              name: 'Chính sách bán hàng Coastal Quảng Ngãi có gì ưu đãi?',
              acceptedAnswer: { '@type': 'Answer', text: 'Coastal Quảng Ngãi áp dụng chính sách ưu đãi: đặt cọc chỉ 50 triệu, chiết khấu lên đến 10%, hỗ trợ vay ngân hàng 70%, gói nội thất 100 triệu, và cơ hội bốc thăm Mercedes.' },
            },
            {
              '@type': 'Question',
              name: 'Tiện ích tại Coastal Quảng Ngãi gồm những gì?',
              acceptedAnswer: { '@type': 'Answer', text: 'Hệ tiện ích đẳng cấp: Nhà hát Opera, Quảng trường âm nhạc, Bến du thuyền, Yacht Clubhouse, Hồ bơi trung tâm, Sân Pickleball, Khu vui chơi trẻ em, Công viên san hô, Trung tâm hội nghị và nhiều tiện ích khác.' },
            },
            {
              '@type': 'Question',
              name: 'Coastal Quảng Ngãi giá bao nhiêu?',
              acceptedAnswer: { '@type': 'Answer', text: 'Giá bán Coastal Quảng Ngãi từ 3 tỷ VNĐ tùy loại hình sản phẩm. Shophouse thương mại, Nhà phố, Biệt thự song lập và đơn lập có mức giá khác nhau. Liên hệ hotline 098 624 3450 để nhận bảng giá chi tiết mới nhất.' },
            },
            {
              '@type': 'Question',
              name: 'Chủ đầu tư Coastal Quảng Ngãi là ai?',
              acceptedAnswer: { '@type': 'Answer', text: 'Chủ đầu tư dự án Coastal Quảng Ngãi là Haus Group — tập đoàn phát triển bất động sản uy tín với tầm nhìn kiến tạo đô thị sinh thái biển đẳng cấp tại miền Trung Việt Nam.' },
            },
            {
              '@type': 'Question',
              name: 'Có nên mua nhà ở Quảng Ngãi không?',
              acceptedAnswer: { '@type': 'Answer', text: 'Quảng Ngãi đang là điểm sáng BĐS miền Trung nhờ quy hoạch hạ tầng mạnh mẽ: KCN VSIP, cao tốc Đà Nẵng - Quảng Ngãi, sân bay Chu Lai mở rộng. Giá BĐS Quảng Ngãi vẫn ở mức hợp lý so với Đà Nẵng, Quy Nhơn, tạo cơ hội đầu tư sinh lời tốt.' },
            },
            {
              '@type': 'Question',
              name: 'Đầu tư bất động sản Quảng Ngãi có lời không?',
              acceptedAnswer: { '@type': 'Answer', text: 'BĐS Quảng Ngãi có tiềm năng tăng trưởng cao nhờ dòng vốn FDI lớn (VSIP, Dung Quất), hạ tầng giao thông phát triển và nhu cầu nhà ở tăng. Coastal Quảng Ngãi với pháp lý sổ đỏ lâu dài, vị trí ven biển là lựa chọn đầu tư an toàn.' },
            },
            {
              '@type': 'Question',
              name: 'Mua nhà Coastal Quảng Ngãi có được hỗ trợ vay ngân hàng không?',
              acceptedAnswer: { '@type': 'Answer', text: 'Có. Coastal Quảng Ngãi hỗ trợ vay ngân hàng lên đến 70% giá trị sản phẩm, lãi suất ưu đãi trong 24 tháng đầu. Thời gian vay tối đa 25 năm. Liên hệ tư vấn viên để được hỗ trợ thủ tục vay.' },
            },
            {
              '@type': 'Question',
              name: 'Quy hoạch Quảng Ngãi 2025-2030 có tác động gì đến bất động sản?',
              acceptedAnswer: { '@type': 'Answer', text: 'Quy hoạch Quảng Ngãi 2025-2030 tập trung phát triển hạ tầng giao thông (mở rộng cao tốc, nâng cấp sân bay Chu Lai), khu công nghiệp (VSIP 2, Dung Quất mở rộng) và đô thị ven biển. Điều này tạo đà tăng giá mạnh cho BĐS khu vực, đặc biệt dự án quy mô lớn như Coastal Quảng Ngãi.' },
            },
          ],
        }) }}
      />
      <Header />
      <main id="main-content">
        <HeroSection />
        <IntroductionSection />
        <RegistrationFormSection />
        <OverviewSection />
        <LocationSection />
        <AmenitiesSection />
        <ArchitectureSection />
        <PolicySection />
        <ProductsSection />
        <LayoutSection />
        <ProgressSection />
        <Suspense fallback={<NewsSkeleton />}>
          <NewsSection />
        </Suspense>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

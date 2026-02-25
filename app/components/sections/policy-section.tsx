import SectionWrapper from '@/app/components/ui/section-wrapper';
import Button from '@/app/components/ui/button';
import { SALES_POLICIES } from '@/app/lib/constants';

const paymentSteps = [
  { phase: 'Đợt 1', percent: '15%', note: 'Ký HĐMB' },
  { phase: 'Đợt 2-8', percent: '2-3%/tháng', note: 'Theo tiến độ' },
  { phase: 'Nhận nhà', percent: '25%', note: 'Bàn giao' },
  { phase: 'Đợt cuối', percent: '5%', note: 'Cấp sổ' },
];

export default function PolicySection() {
  return (
    <SectionWrapper
      id="chinh-sach"
      className="bg-cream-gradient"
    >
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <img
            src="/images/misc/sales-policy-infographic.png"
            alt="Chính sách bán hàng"
            className="h-12 mx-auto mb-4"
          />
          <h3 className="font-heading text-xl md:text-2xl text-terracotta font-medium mb-2 uppercase">
            Chính sách bán hàng Coastal Quảng Ngãi
          </h3>
          <div className="terracotta-line mb-6" />
        </div>

        {/* Policy highlights */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          {SALES_POLICIES.map((policy) => (
            <div
              key={policy.title}
              className="bg-white rounded-lg p-4 text-center border border-terracotta/10 shadow-sm"
            >
              <p className="text-terracotta font-heading text-2xl font-bold mb-1">{policy.value}</p>
              <p className="text-charcoal/70 text-sm">{policy.title}</p>
            </div>
          ))}
        </div>

        {/* Policy image */}
        <div className="mb-10">
          <img
            src="/images/interior/detached-villa-interior-2.jpg"
            alt="Nội thất mẫu"
            className="w-full h-64 md:h-80 object-cover rounded-lg"
          />
        </div>

        {/* Payment timeline */}
        <div>
          <h3 className="font-heading text-xl text-terracotta-dark text-center mb-8 font-bold uppercase">
            Tiến độ thanh toán
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {paymentSteps.map((step, i) => (
              <div key={step.phase} className="flex items-center gap-4">
                <div className="bg-white border border-terracotta/20 rounded-lg p-4 text-center min-w-[140px] shadow-sm">
                  <p className="text-terracotta font-bold text-xl">{step.percent}</p>
                  <p className="text-charcoal font-semibold text-sm">{step.phase}</p>
                  <p className="text-charcoal/50 text-xs">{step.note}</p>
                </div>
                {i < paymentSteps.length - 1 && (
                  <svg className="w-6 h-6 text-terracotta hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Button href="#lien-he">Nhận chính sách chi tiết</Button>
        </div>
      </div>
    </SectionWrapper>
  );
}

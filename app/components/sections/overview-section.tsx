import SectionWrapper from '@/app/components/ui/section-wrapper';
import { PROJECT_INFO } from '@/app/lib/constants';

export default function OverviewSection() {
  return (
    <SectionWrapper id="tong-quan" className="bg-cream-gradient">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl text-rose-beige font-bold text-center mb-2 uppercase">
            Thông tin dự án
          </h2>
          <div className="rose-line mb-8" />

          {/* Project info table — semantic <table> for screen reader accessibility */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-rose-beige/20">
            <table className="w-full">
              <caption className="sr-only">Thông tin tổng quan dự án Coastal Quảng Ngãi</caption>
              <tbody>
                {PROJECT_INFO.map((item, i) => (
                  <tr
                    key={item.label}
                    className={`border-b border-gray-100 last:border-b-0 ${
                      i % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'
                    }`}
                  >
                    <th scope="row" className="w-1/3 px-6 py-3 text-rose-beige text-sm font-heading font-bold border-l-2 border-rose-beige text-left">
                      {item.label}
                    </th>
                    <td className="w-2/3 px-6 py-3 text-charcoal text-sm">
                      {item.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Project render image */}
          <div className="mt-8">
            <img
              src="/images/hero/coastal-overview-aerial.jpg"
              alt="Phối cảnh dự án Coastal Quảng Ngãi"
              loading="lazy"
              width={1920}
              height={1012}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

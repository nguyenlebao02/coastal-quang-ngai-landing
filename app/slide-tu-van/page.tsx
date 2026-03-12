'use client';

import { useEffect, useCallback } from 'react';
import Script from 'next/script';
import './slide-styles.css';
import { useSlideNavigation } from './use-slide-navigation';
import { initChartForSlide } from './slide-charts';

export default function SlideTuVanPage() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.margin = '0';
    return () => {
      document.body.style.overflow = '';
      document.body.style.margin = '';
    };
  }, []);

  const onChartSlide = useCallback((n: number) => initChartForSlide(n), []);
  const { nextSlide, prevSlide } = useSlideNavigation(onChartSlide);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"
        integrity="sha384-F4E6gJnO3VJzOmzBO9wNQMkXk4C/aFxS7FKjR/s8mYBGSBjVHNGpJMQy87WZMLR"
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />

      {/* Progress Bar */}
      <div className="progress-bar" id="progressBar" />
      <div className="fullscreen-hint">F11 để xem toàn màn hình</div>

      {/* SLIDE 1: COVER */}
      <div className="sl slide--hero active">
        <div className="animate-fade-up">
          <div className="logo-badge">HAUS GROUP</div>
          <h1 className="slide-title" style={{ color: '#FFF', fontSize: 'clamp(48px,7vw,84px)' }}>COASTAL<br/>QUẢNG NGÃI</h1>
          <div className="accent-line-gold" />
          <p className="slide-subtitle" style={{ color: '#D4AF37', letterSpacing: 5, marginTop: 16 }}>Biểu tượng đô thị sinh thái biển</p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginTop: 30, letterSpacing: 2 }}>Đô thị nghệ thuật văn hóa &bull; Du thuyền hạng sang bên vịnh</p>
        </div>
      </div>

      {/* SLIDE 2: TẦM NHÌN */}
      <div className="sl slide--cream">
        <div className="animate-fade-up">
          <p className="section-label">Tầm nhìn</p>
          <h2 className="slide-heading">Kiến tạo biểu tượng<br/>đô thị mới tại Quảng Ngãi</h2>
          <div className="accent-line" />
          <p className="slide-body" style={{ marginBottom: 40 }}>Dự án đô thị sinh thái biển đẳng cấp quy mô 93.9 HA — không gian sống hoàn hảo kết hợp thiên nhiên, nghệ thuật và phong cách sống thượng lưu.</p>
          <div className="grid-3 stagger">
            <div className="card animate-fade-up"><span className="card-icon">🏛️</span><h3>Nghệ thuật văn hóa</h3><p>Kiến trúc Địa Trung Hải kết hợp văn hóa bản địa Quảng Ngãi</p></div>
            <div className="card animate-fade-up"><span className="card-icon">🛥️</span><h3>Du thuyền hạng sang</h3><p>Bến du thuyền riêng tư, trải nghiệm sống thượng lưu bên bờ biển</p></div>
            <div className="card animate-fade-up"><span className="card-icon">🌿</span><h3>Bảo tồn thiên nhiên</h3><p>Hệ sinh thái xanh, bảo tồn cảnh quan tự nhiên và văn hóa địa phương</p></div>
          </div>
        </div>
      </div>

      {/* SLIDE 3: TỔNG QUAN */}
      <div className="sl">
        <div className="animate-fade-up" style={{ width: '100%' }}>
          <p className="section-label">Tổng quan</p>
          <h2 className="slide-heading">Thông tin dự án</h2>
          <div className="accent-line" />
          <table className="data-table" style={{ margin: '30px auto 0' }}>
            <thead><tr><th>Hạng mục</th><th>Chi tiết</th></tr></thead>
            <tbody>
              <tr><td>Tên dự án</td><td><strong>Coastal Quảng Ngãi</strong></td></tr>
              <tr><td>Chủ đầu tư</td><td>Haus Group</td></tr>
              <tr><td>Vị trí</td><td>TP. Quảng Ngãi, Tỉnh Quảng Ngãi</td></tr>
              <tr><td>Quy mô</td><td className="highlight-value">93.9 HA</td></tr>
              <tr><td>Loại hình</td><td>Shophouse, Biệt thự, Căn hộ</td></tr>
              <tr><td>Pháp lý</td><td className="highlight-value">Sổ đỏ lâu dài</td></tr>
              <tr><td>Bàn giao</td><td>2027 – 2028</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* SLIDE 4: CON SỐ NỔI BẬT */}
      <div className="sl slide--dark">
        <div className="animate-fade-up" style={{ width: '100%' }}>
          <p className="section-label" style={{ color: '#D4AF37' }}>Quy mô ấn tượng</p>
          <h2 className="slide-heading" style={{ color: '#FFF' }}>Những con số nổi bật</h2>
          <div className="accent-line-gold" />
          <div className="grid-4 stagger" style={{ marginTop: 24 }}>
            <div className="stat-box animate-fade-up"><div className="stat-number stat-number--gold">93.9</div><div className="stat-label" style={{ color: 'rgba(255,255,255,0.5)' }}>Hecta quy mô</div></div>
            <div className="stat-box animate-fade-up"><div className="stat-number stat-number--white">15+</div><div className="stat-label" style={{ color: 'rgba(255,255,255,0.5)' }}>Tiện ích cao cấp</div></div>
            <div className="stat-box animate-fade-up"><div className="stat-number stat-number--gold">4</div><div className="stat-label" style={{ color: 'rgba(255,255,255,0.5)' }}>Loại hình biệt thự</div></div>
            <div className="stat-box animate-fade-up"><div className="stat-number stat-number--white">5&apos;</div><div className="stat-label" style={{ color: 'rgba(255,255,255,0.5)' }}>Đến trung tâm TP</div></div>
          </div>
        </div>
      </div>

      {/* SLIDE 5: VỊ TRÍ */}
      <div className="sl slide--cream">
        <div className="animate-fade-up" style={{ width: '100%' }}>
          <p className="section-label">Vị trí chiến lược</p>
          <h2 className="slide-heading">Cận thị · Cận giang · Cận lộ</h2>
          <div className="accent-line" />
          <div className="grid-2" style={{ marginTop: 16 }}>
            <div>
              <div className="grid-3 stagger" style={{ gap: 16 }}>
                <div className="card animate-fade-up" style={{ padding: '24px 16px' }}><span className="card-icon">📍</span><h3 style={{ fontSize: 15 }}>Cận thị · Cận giang · Cận lộ</h3><p style={{ fontSize: 13 }}>Kết nối trung tâm TP, sông Trà Khúc và giao thông huyết mạch</p></div>
                <div className="card animate-fade-up" style={{ padding: '24px 16px' }}><span className="card-icon">⏱️</span><h3 style={{ fontSize: 15 }}>5 phút → Trung tâm</h3><p style={{ fontSize: 13 }}>Kết nối nhanh khu thương mại và dịch vụ TP. Quảng Ngãi</p></div>
                <div className="card animate-fade-up" style={{ padding: '24px 16px' }}><span className="card-icon">🏖️</span><h3 style={{ fontSize: 15 }}>10 phút → Biển</h3><p style={{ fontSize: 13 }}>Gần bãi biển Mỹ Khê, sân bay Chu Lai, điểm du lịch nổi tiếng</p></div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="card" style={{ background: '#0B3D5C', padding: 30 }}>
                <h3 style={{ color: '#D4AF37', fontSize: 16, marginBottom: 12 }}>🔥 Tiềm năng tăng giá</h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, lineHeight: 1.7 }}>Quảng Ngãi đang trở thành điểm nóng đầu tư BĐS với hạ tầng giao thông phát triển mạnh, thu hút các tập đoàn lớn và dự án FDI.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SLIDE 6: TIỆN ÍCH */}
      <div className="sl slide--dark">
        <div className="animate-fade-up" style={{ width: '100%' }}>
          <p className="section-label" style={{ color: '#D4AF37' }}>Tiện ích</p>
          <h2 className="slide-heading" style={{ color: '#FFF', marginBottom: 16 }}>Hệ tiện ích đẳng cấp</h2>
          <div className="accent-line-gold" />
          <div className="amenity-grid stagger" style={{ marginTop: 16 }}>
            {[['🎭','Nhà hát Opera'],['🎵','QT Âm nhạc'],['🏗️','CT Biểu tượng'],['🪸','CV San hô'],['⛵','Bến Du thuyền'],['🏠','Yacht Clubhouse'],['🏢','TT Hội nghị'],['🏡','Boutique House'],['🎠','SC Trẻ em'],['🎪','KVC Trẻ em'],['🏊','HB Trẻ em'],['🌊','Hồ Cảnh quan'],['🏸','Khu Thể thao'],['🏓','Sân Pickleball'],['🏊‍♂️','HB Trung tâm']].map(([icon, name], i) => (
              <div key={i} className="amenity-item animate-fade-up"><span className="icon">{icon}</span><span className="name">{name}</span></div>
            ))}
          </div>
        </div>
      </div>

      {/* SLIDE 7: SẢN PHẨM */}
      <div className="sl slide--rose">
        <div className="animate-fade-up" style={{ width: '100%' }}>
          <p className="section-label">Sản phẩm</p>
          <h2 className="slide-heading">Loại hình sản phẩm</h2>
          <div className="accent-line" />
          <p className="slide-body" style={{ margin: '0 auto 24px' }}>Thiết kế hòa mình vào thiên nhiên — Lost in Nature</p>
          <div className="product-grid stagger">
            {[['🏘️','Central Villa','Biệt thự trung tâm, vị trí đắc địa','#E8D5CE','#F0E6DC'],['🌳','Nature Villa','Biệt thự thiên nhiên, hòa mình cây xanh','#D4E8D0','#E8F0E6'],['🏞️','Hidden Villa','Biệt thự ẩn mình, riêng tư tuyệt đối','#D0D8E8','#E6ECF0'],['🔑','Multikey','Thiết kế thông minh, linh hoạt đầu tư','#E8E0D0','#F0ECE6']].map(([icon, title, desc, c1, c2], i) => (
              <div key={i} className="product-card animate-fade-up">
                <div className="product-visual" style={{ background: `linear-gradient(135deg,${c1},${c2})` }}>{icon}</div>
                <h3>{title}</h3><p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SLIDE 8: NỘI THẤT */}
      <div className="sl">
        <div className="animate-fade-up" style={{ width: '100%' }}>
          <p className="section-label">Bàn giao</p>
          <h2 className="slide-heading">Bàn giao full nội thất</h2>
          <div className="accent-line" />
          <div className="grid-2" style={{ marginTop: 20, alignItems: 'center' }}>
            <div style={{ textAlign: 'left' }}>
              <p className="slide-body" style={{ marginBottom: 20 }}>Mỗi căn biệt thự được bàn giao hoàn thiện nội thất cao cấp, sẵn sàng cho gia chủ chuyển vào sinh sống ngay.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[['🛋️','Phòng khách','Thiết kế sang trọng, ánh sáng tự nhiên'],['🍳','Phòng bếp','Trang bị thiết bị hiện đại'],['🛏️','Phòng ngủ','Không gian nghỉ ngơi thoải mái'],['🚿','Phòng tắm','Thiết bị vệ sinh cao cấp']].map(([icon, title, desc], i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span style={{ fontSize: 24 }}>{icon}</span>
                    <div><strong style={{ color: '#0B3D5C' }}>{title}</strong><p style={{ fontSize: 13, color: '#6B7280' }}>{desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="card" style={{ padding: 0, overflow: 'hidden', borderRadius: 20, height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#F0E6DC,#F9E4E8)' }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: 80, display: 'block', marginBottom: 16 }}>🏠</span>
                  <p style={{ fontSize: 16, color: '#0B3D5C', fontWeight: 600 }}>Full nội thất cao cấp</p>
                  <p style={{ fontSize: 13, color: '#6B7280', marginTop: 6 }}>Biệt thự song lập &amp; đơn lập</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SLIDE 9: CHÍNH SÁCH */}
      <div className="sl slide--cream">
        <div className="animate-fade-up" style={{ width: '100%' }}>
          <p className="section-label">Chính sách</p>
          <h2 className="slide-heading">Chính sách bán hàng hấp dẫn</h2>
          <div className="accent-line" />
          <div className="policy-row stagger" style={{ marginTop: 20 }}>
            {[['50 Tr','Đặt cọc'],['10%','Chiết khấu'],['70%','Hỗ trợ vay NH'],['100 Tr','Gói nội thất']].map(([val, label], i) => (
              <div key={i} className="policy-card animate-fade-up"><div className="value">{val}</div><div className="label">{label}</div></div>
            ))}
            <div className="policy-card animate-fade-up"><div className="value" style={{ fontSize: 20 }}>Mercedes</div><div className="label">Bốc thăm quà tặng</div></div>
          </div>
        </div>
      </div>

      {/* SLIDE 10: THANH TOÁN */}
      <div className="sl">
        <div className="animate-fade-up" style={{ width: '100%' }}>
          <p className="section-label">Thanh toán</p>
          <h2 className="slide-heading">Tiến độ thanh toán linh hoạt</h2>
          <div className="accent-line" />
          <div className="grid-2" style={{ marginTop: 16, alignItems: 'center' }}>
            <div>
              {[['15%','#FF5722','Đợt 1 — Ký HĐMB','Thanh toán khi ký hợp đồng mua bán',18],['2-3%','#C39F93','Đợt 2-8 — Theo tiến độ','2-3%/tháng theo tiến độ xây dựng',14],['25%','#FF5722','Nhận nhà — Bàn giao','Thanh toán khi nhận bàn giao căn hộ',16],['5%','#0B3D5C','Đợt cuối — Cấp sổ','Thanh toán khi được cấp sổ đỏ',18]].map(([pct, bg, title, desc, fs], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0', borderBottom: i < 3 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
                  <div style={{ width: 42, height: 42, background: bg as string, color: '#fff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: (fs as number) - 2, flexShrink: 0 }}>{pct}</div>
                  <div style={{ textAlign: 'left' }}><strong style={{ color: '#0B3D5C', fontSize: 14 }}>{title}</strong><p style={{ fontSize: 12, color: '#6B7280' }}>{desc}</p></div>
                </div>
              ))}
            </div>
            <div><div className="chart-container" style={{ margin: '0 auto' }}><canvas id="paymentChart" /></div></div>
          </div>
        </div>
      </div>

      {/* SLIDE 11: TIỀM NĂNG ĐẦU TƯ */}
      <div className="sl slide--dark">
        <div className="animate-fade-up" style={{ width: '100%' }}>
          <p className="section-label" style={{ color: '#D4AF37' }}>Đầu tư</p>
          <h2 className="slide-heading" style={{ color: '#FFF' }}>Tiềm năng tăng giá vượt trội</h2>
          <div className="accent-line-gold" />
          <div className="grid-2" style={{ marginTop: 16, alignItems: 'center' }}>
            <div className="chart-container" style={{ width: '100%', maxWidth: 480 }}><canvas id="growthChart" /></div>
            <div style={{ textAlign: 'left' }}>
              {[['✅ Sổ đỏ lâu dài','Quyền sở hữu vĩnh viễn, an tâm đầu tư dài hạn'],['✅ Hạ tầng phát triển','Giao thông, khu công nghiệp, FDI tăng mạnh tại Quảng Ngãi'],['✅ Bàn giao 2027-2028','Timeline rõ ràng, thanh toán linh hoạt theo tiến độ']].map(([title, desc], i) => (
                <div key={i} className="card-dark" style={{ marginBottom: i < 2 ? 14 : 0, textAlign: 'left', padding: 20 }}>
                  <h3 style={{ fontSize: 16, marginBottom: 8 }}>{title}</h3><p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SLIDE 12: CTA */}
      <div className="sl slide--hero">
        <div className="animate-fade-up">
          <div className="logo-badge">HAUS GROUP</div>
          <h2 className="slide-heading" style={{ color: '#FFF', fontSize: 'clamp(36px,5vw,60px)' }}>Đăng ký tư vấn ngay</h2>
          <div className="accent-line-gold" />
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, marginTop: 10, maxWidth: 600, lineHeight: 1.7 }}>Để lại thông tin, chuyên viên tư vấn sẽ liên hệ bạn trong 24h</p>
          <div className="cta-hotline">098 624 3450</div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, letterSpacing: 1, marginBottom: 20 }}>hauscoastal@gmail.com &bull; Văn phòng tư vấn Dự án Haus Coastal Quảng Ngãi: 88 Hùng Vương, Phường Nghĩa Lộ, Tỉnh Quảng Ngãi</p>
          <span className="cta-button">Đăng ký tư vấn</span>
          <div style={{ marginTop: 40, display: 'flex', gap: 24, justifyContent: 'center' }}>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>Facebook</span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>YouTube</span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>Zalo</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="nav-controls">
        <button className="nav-btn" onClick={() => prevSlide()}>&#8592;</button>
        <span className="slide-counter"><span id="current">1</span> / <span id="total">12</span></span>
        <button className="nav-btn" onClick={() => nextSlide()}>&#8594;</button>
      </div>
    </>
  );
}

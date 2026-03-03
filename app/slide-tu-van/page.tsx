'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function SlideTuVanPage() {
  useEffect(() => {
    /* Override body styles for fullscreen slides */
    document.body.style.overflow = 'hidden';
    document.body.style.margin = '0';
    return () => {
      document.body.style.overflow = '';
      document.body.style.margin = '';
    };
  }, []);

  useEffect(() => {
    /* Initialize slide navigation after DOM ready */
    const init = () => {
      const slides = document.querySelectorAll('.sl');
      if (!slides.length) return;
      const total = slides.length;
      let current = 1;

      const totalEl = document.getElementById('total');
      const currentEl = document.getElementById('current');
      const progressBar = document.getElementById('progressBar');
      if (totalEl) totalEl.textContent = String(total);

      function showSlide(n: number) {
        if (n < 1) n = 1;
        if (n > total) n = total;
        current = n;
        slides.forEach((s, i) => s.classList.toggle('active', i === n - 1));
        if (currentEl) currentEl.textContent = String(n);
        if (progressBar) progressBar.style.width = (n / total * 100) + '%';
        /* Init charts on specific slides */
        if (n === 10) initPaymentChart();
        if (n === 11) initGrowthChart();
      }

      (window as any).__nextSlide = () => showSlide(current + 1);
      (window as any).__prevSlide = () => showSlide(current - 1);

      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); (window as any).__nextSlide(); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); (window as any).__prevSlide(); }
      });

      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.nav-controls') && !target.closest('.cta-button')) {
          (window as any).__nextSlide();
        }
      });

      showSlide(1);
    };

    let paymentDone = false;
    let growthDone = false;

    function initPaymentChart() {
      if (paymentDone) return;
      const ctx = document.getElementById('paymentChart') as HTMLCanvasElement | null;
      if (!ctx || !(window as any).Chart) return;
      paymentDone = true;
      new (window as any).Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Đợt 1 (Ký HĐMB)', 'Đợt 2-8 (Tiến độ)', 'Nhận nhà', 'Cấp sổ'],
          datasets: [{ data: [15, 55, 25, 5], backgroundColor: ['#FF5722', '#C39F93', '#0B3D5C', '#D4AF37'], borderColor: '#FFFFFF', borderWidth: 3, hoverOffset: 8 }]
        },
        options: { responsive: true, maintainAspectRatio: false, cutout: '55%', plugins: { legend: { position: 'bottom', labels: { color: '#6B7280', font: { size: 12 }, padding: 16, usePointStyle: true, pointStyleWidth: 12 } } } }
      });
    }

    function initGrowthChart() {
      if (growthDone) return;
      const ctx = document.getElementById('growthChart') as HTMLCanvasElement | null;
      if (!ctx || !(window as any).Chart) return;
      growthDone = true;
      new (window as any).Chart(ctx, {
        type: 'line',
        data: {
          labels: ['2024', '2025', '2026', '2027', '2028', '2029'],
          datasets: [{ label: 'Giá trị BĐS (% tăng)', data: [100, 112, 128, 148, 170, 195], borderColor: '#D4AF37', backgroundColor: 'rgba(212,175,55,0.1)', borderWidth: 3, fill: true, tension: 0.4, pointBackgroundColor: '#D4AF37', pointBorderColor: '#FFFFFF', pointBorderWidth: 2, pointRadius: 5, pointHoverRadius: 8 }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.5)', font: { size: 12 } } }, y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.5)', font: { size: 12 }, callback: (v: number) => v + '%' }, min: 80, max: 220 } } }
      });
    }

    (window as any).__initPaymentChart = initPaymentChart;
    (window as any).__initGrowthChart = initGrowthChart;

    /* Wait for DOM */
    if (document.readyState === 'complete') init();
    else window.addEventListener('load', init);
  }, []);

  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js" strategy="beforeInteractive" />

      {/* Slide styles */}
      <style dangerouslySetInnerHTML={{ __html: slideStyles }} />

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
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, letterSpacing: 1, marginBottom: 20 }}>info@coastal.com.vn &bull; 88 Hùng Vương, Trần Phú, Quảng Ngãi</p>
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
        <button className="nav-btn" onClick={() => (window as any).__prevSlide?.()}>&#8592;</button>
        <span className="slide-counter"><span id="current">1</span> / <span id="total">12</span></span>
        <button className="nav-btn" onClick={() => (window as any).__nextSlide?.()}>&#8594;</button>
      </div>
    </>
  );
}

/* All slide CSS inlined */
const slideStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');

  :root {
    --navy:#0B3D5C;--navy-light:#0F4F75;--navy-dark:#082D44;
    --gold:#D4AF37;--gold-light:#E0C465;
    --cream:#F0E6DC;--cream-light:#F6F6F3;--charcoal:#212121;
    --rose-beige:#C39F93;--rose-pink:#F9E4E8;--ocean-blue:#1B76A8;--cta-orange:#FF5722;
    --slide-bg:#FEFCFA;--text-primary:var(--charcoal);--text-light:#FFFFFF;--text-muted:#6B7280;
  }
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:var(--slide-bg);color:var(--text-primary);font-family:'Inter',sans-serif;overflow:hidden}
  h1,h2,h3{font-family:'Playfair Display',serif}

  .sl{position:absolute;width:100%;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:50px 80px 70px;opacity:0;visibility:hidden;transition:opacity 0.5s ease;background:var(--slide-bg);overflow-y:auto}
  .sl.active{opacity:1;visibility:visible}

  .slide-title{font-size:clamp(40px,6vw,72px);font-weight:700;color:var(--navy);line-height:1.1;margin-bottom:12px}
  .slide-subtitle{font-size:clamp(18px,2.5vw,28px);color:var(--rose-beige);font-weight:400;letter-spacing:3px;text-transform:uppercase}
  .section-label{font-size:12px;letter-spacing:4px;text-transform:uppercase;color:var(--rose-beige);margin-bottom:8px;font-weight:600}
  .slide-heading{font-size:clamp(28px,3.5vw,46px);font-weight:600;color:var(--navy);line-height:1.2;margin-bottom:12px}
  .slide-body{font-size:clamp(15px,1.6vw,18px);color:var(--text-muted);line-height:1.6;max-width:800px}

  .accent-line{width:60px;height:2px;background:var(--rose-beige);margin:12px auto}
  .accent-line-gold{width:60px;height:2px;background:var(--gold);margin:12px auto}
  .logo-badge{font-size:14px;letter-spacing:6px;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:20px}

  .slide--dark{background:linear-gradient(135deg,var(--navy-dark) 0%,var(--navy) 100%);color:var(--text-light)}
  .slide--dark .slide-heading{color:#FFF}.slide--dark .slide-body{color:rgba(255,255,255,0.7)}.slide--dark .section-label{color:var(--gold)}
  .slide--cream{background:linear-gradient(180deg,var(--cream) 0%,#FFF 100%)}
  .slide--rose{background:linear-gradient(135deg,var(--rose-pink) 0%,#FFF 60%)}
  .slide--hero{background:linear-gradient(135deg,var(--navy-dark) 0%,var(--navy) 50%,var(--ocean-blue) 100%);color:var(--text-light)}

  .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:30px;width:100%;max-width:1100px;text-align:left}
  .grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;width:100%;max-width:1100px}
  .grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;width:100%;max-width:1100px}

  .card{background:#FFF;border-radius:12px;padding:24px 20px;text-align:center;box-shadow:0 4px 20px rgba(0,0,0,0.06);transition:transform 0.3s}
  .card:hover{transform:translateY(-4px)}
  .card-dark{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:12px;padding:24px 20px;text-align:center;backdrop-filter:blur(10px)}
  .card h3{font-size:16px;color:var(--navy);margin-bottom:8px;font-family:'Inter',sans-serif;font-weight:600}
  .card-dark h3{color:#FFF}
  .card p,.card-dark p{font-size:13px;color:var(--text-muted);line-height:1.5}
  .card-dark p{color:rgba(255,255,255,0.6)}
  .card-icon{font-size:30px;margin-bottom:10px;display:block}

  .stat-box{text-align:center;padding:16px}
  .stat-number{font-size:clamp(32px,4.5vw,50px);font-weight:700;font-family:'Playfair Display',serif;line-height:1;margin-bottom:6px}
  .stat-number--gold{color:var(--gold)}.stat-number--white{color:#FFF}.stat-number--navy{color:var(--navy)}
  .stat-label{font-size:13px;text-transform:uppercase;letter-spacing:2px;color:var(--text-muted)}

  .data-table{width:100%;max-width:900px;border-collapse:collapse;text-align:left}
  .data-table th{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--rose-beige);padding:10px 20px;border-bottom:2px solid var(--rose-beige);font-weight:600}
  .data-table td{padding:10px 20px;font-size:15px;border-bottom:1px solid rgba(0,0,0,0.06)}
  .data-table tr:last-child td{border-bottom:none}
  .highlight-value{color:var(--cta-orange);font-weight:700}

  .amenity-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;width:100%;max-width:1100px}
  .amenity-item{background:rgba(255,255,255,0.08);border-radius:10px;padding:14px 10px;text-align:center;border:1px solid rgba(255,255,255,0.1)}
  .amenity-item .icon{font-size:24px;margin-bottom:6px;display:block}
  .amenity-item .name{font-size:11px;color:rgba(255,255,255,0.8);line-height:1.3}

  .policy-row{display:flex;gap:16px;width:100%;max-width:1100px;justify-content:center}
  .policy-card{flex:1;background:#FFF;border-radius:14px;padding:20px 16px;text-align:center;box-shadow:0 4px 24px rgba(0,0,0,0.06);border-top:3px solid var(--rose-beige)}
  .policy-card .value{font-size:24px;font-weight:700;color:var(--cta-orange);font-family:'Playfair Display',serif;margin-bottom:4px}
  .policy-card .label{font-size:12px;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px}

  .chart-container{width:100%;max-width:480px;height:260px}

  .cta-hotline{font-size:clamp(28px,4vw,48px);font-weight:700;color:var(--gold);letter-spacing:4px;margin:20px 0;font-family:'Inter',sans-serif}
  .cta-button{display:inline-block;background:var(--cta-orange);color:#FFF;padding:16px 48px;border-radius:8px;font-size:16px;font-weight:600;text-transform:uppercase;letter-spacing:2px;text-decoration:none;margin-top:20px;cursor:pointer;transition:background 0.3s;border:none}
  .cta-button:hover{background:#E64A19}

  .product-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;width:100%;max-width:1100px}
  .product-card{background:#FFF;border-radius:14px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.08);text-align:center;transition:transform 0.3s}
  .product-card:hover{transform:translateY(-6px)}
  .product-visual{height:110px;display:flex;align-items:center;justify-content:center;font-size:42px}
  .product-card h3{font-size:15px;font-weight:600;color:var(--navy);padding:12px 12px 2px;font-family:'Inter',sans-serif}
  .product-card p{font-size:12px;color:var(--text-muted);padding:0 12px 16px}

  @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
  .sl.active .animate-fade-up{animation:fadeUp 0.6s ease-out forwards}
  .sl.active .stagger>*:nth-child(1){animation-delay:.1s}.sl.active .stagger>*:nth-child(2){animation-delay:.2s}.sl.active .stagger>*:nth-child(3){animation-delay:.3s}.sl.active .stagger>*:nth-child(4){animation-delay:.35s}.sl.active .stagger>*:nth-child(5){animation-delay:.4s}

  .progress-bar{position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,var(--rose-beige),var(--gold));transition:width 0.3s;z-index:1000}
  .nav-controls{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:18px;z-index:1000;background:rgba(255,255,255,0.9);backdrop-filter:blur(8px);padding:8px 20px;border-radius:40px;box-shadow:0 4px 20px rgba(0,0,0,0.1)}
  .nav-btn{background:none;border:1px solid rgba(0,0,0,0.15);color:var(--charcoal);width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;transition:all 0.2s}
  .nav-btn:hover{background:var(--navy);color:#FFF;border-color:var(--navy)}
  .slide-counter{color:var(--text-muted);font-size:13px;font-weight:500;min-width:50px;text-align:center}
  .fullscreen-hint{position:fixed;top:12px;right:16px;font-size:11px;color:rgba(0,0,0,0.3);z-index:999;letter-spacing:1px}

  /* ======================== TABLET (<1024px) ======================== */
  @media(max-width:1024px){
    .sl{padding:40px 40px 80px}
    .grid-2{grid-template-columns:1fr;gap:24px}
    .grid-3{grid-template-columns:repeat(2,1fr);gap:20px}
    .grid-4{grid-template-columns:repeat(2,1fr);gap:20px}
    .product-grid{grid-template-columns:repeat(2,1fr);gap:20px}
    .amenity-grid{grid-template-columns:repeat(3,1fr);gap:12px}
    .policy-row{flex-wrap:wrap;gap:16px}
    .policy-card{flex:1 1 calc(33% - 16px);min-width:140px}
    .chart-container{max-width:400px;height:250px}
  }

  /* ======================== MOBILE (<640px) ======================== */
  @media(max-width:640px){
    .sl{padding:24px 20px 80px;justify-content:flex-start;padding-top:40px}
    .slide-title{font-size:clamp(28px,8vw,48px)}
    .slide-heading{font-size:clamp(22px,6vw,36px);margin-bottom:14px}
    .slide-subtitle{font-size:clamp(13px,3.5vw,18px);letter-spacing:2px}
    .slide-body{font-size:14px}
    .section-label{font-size:10px;letter-spacing:3px;margin-bottom:8px}
    .accent-line,.accent-line-gold{margin:12px auto}
    .logo-badge{font-size:11px;letter-spacing:4px;margin-bottom:16px}

    .grid-2,.grid-3,.grid-4{grid-template-columns:1fr;gap:16px}
    .product-grid{grid-template-columns:1fr 1fr;gap:12px}
    .amenity-grid{grid-template-columns:repeat(3,1fr);gap:10px}
    .amenity-item{padding:12px 8px}
    .amenity-item .icon{font-size:22px;margin-bottom:4px}
    .amenity-item .name{font-size:10px}

    .policy-row{flex-direction:column;gap:12px}
    .policy-card{padding:20px 16px}
    .policy-card .value{font-size:22px}

    .card{padding:20px 16px}
    .card-icon{font-size:28px;margin-bottom:10px}
    .card h3{font-size:15px}
    .card p{font-size:12px}
    .card-dark{padding:20px 16px}

    .stat-box{padding:12px}
    .stat-number{font-size:clamp(28px,8vw,40px)}
    .stat-label{font-size:11px;letter-spacing:1px}

    .data-table th{padding:8px 12px;font-size:10px}
    .data-table td{padding:10px 12px;font-size:14px}

    .chart-container{max-width:100%;height:220px}

    .cta-hotline{font-size:clamp(22px,6vw,36px);letter-spacing:2px}
    .cta-button{padding:12px 32px;font-size:14px}

    .product-visual{height:100px;font-size:36px}
    .product-card h3{font-size:14px;padding:12px 8px 2px}
    .product-card p{font-size:11px;padding:0 8px 12px}

    .nav-controls{bottom:12px;padding:6px 14px;gap:12px}
    .nav-btn{width:32px;height:32px;font-size:14px}
    .slide-counter{font-size:12px}
    .fullscreen-hint{display:none}
  }

  /* ======================== SMALL MOBILE (<380px) ======================== */
  @media(max-width:380px){
    .sl{padding:16px 12px 70px}
    .amenity-grid{grid-template-columns:repeat(2,1fr)}
    .product-grid{grid-template-columns:1fr}
  }
`;

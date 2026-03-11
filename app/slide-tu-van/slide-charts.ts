type ChartInstance = { destroy: () => void };

let paymentChart: ChartInstance | null = null;
let growthChart: ChartInstance | null = null;

export function initPaymentChart(): void {
  if (paymentChart) return;
  const ctx = document.getElementById('paymentChart') as HTMLCanvasElement | null;
  // eslint-disable-next-line
  const Chart = (window as any).Chart as new (ctx: HTMLCanvasElement, config: unknown) => ChartInstance;
  if (!ctx || !Chart) return;

  paymentChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Đợt 1 (Ký HĐMB)', 'Đợt 2-8 (Tiến độ)', 'Nhận nhà', 'Cấp sổ'],
      datasets: [{
        data: [15, 55, 25, 5],
        backgroundColor: ['#FF5722', '#C39F93', '#0B3D5C', '#D4AF37'],
        borderColor: '#FFFFFF',
        borderWidth: 3,
        hoverOffset: 8,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '55%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#6B7280', font: { size: 12 }, padding: 16, usePointStyle: true, pointStyleWidth: 12 },
        },
      },
    },
  });
}

export function initGrowthChart(): void {
  if (growthChart) return;
  const ctx = document.getElementById('growthChart') as HTMLCanvasElement | null;
  // eslint-disable-next-line
  const Chart = (window as any).Chart as new (ctx: HTMLCanvasElement, config: unknown) => ChartInstance;
  if (!ctx || !Chart) return;

  growthChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2024', '2025', '2026', '2027', '2028', '2029'],
      datasets: [{
        label: 'Giá trị BĐS (% tăng)',
        data: [100, 112, 128, 148, 170, 195],
        borderColor: '#D4AF37',
        backgroundColor: 'rgba(212,175,55,0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#D4AF37',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.5)', font: { size: 12 } } },
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.5)', font: { size: 12 }, callback: (v: unknown) => v + '%' }, min: 80, max: 220 },
      },
    },
  });
}

export function initChartForSlide(slideNumber: number): void {
  if (slideNumber === 10) initPaymentChart();
  if (slideNumber === 11) initGrowthChart();
}

import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Coastal Quảng Ngãi | Biểu Tượng Đô Thị Sinh Thái Biển',
  description:
    'Dự án Coastal Quảng Ngãi - Đô thị sinh thái biển đẳng cấp tại Quảng Ngãi. Shophouse, Biệt thự, Căn hộ từ Haus Group. Hotline: 089 999 0917',
  keywords: [
    'Coastal Quảng Ngãi',
    'Haus Quảng Ngãi',
    'biệt thự biển Quảng Ngãi',
    'đô thị sinh thái biển',
    'bất động sản Quảng Ngãi',
  ],
  openGraph: {
    title: 'Coastal Quảng Ngãi | Biểu Tượng Đô Thị Sinh Thái Biển',
    description:
      'Dự án Coastal Quảng Ngãi - Đô thị sinh thái biển đẳng cấp tại Quảng Ngãi.',
    type: 'website',
    locale: 'vi_VN',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

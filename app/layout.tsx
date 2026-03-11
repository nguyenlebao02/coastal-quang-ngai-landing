import type { Metadata } from 'next';
import { Alumni_Sans, Pathway_Extreme } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const GA_ID = 'G-HHW4ZZ4BN2';

const alumniSans = Alumni_Sans({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  variable: '--font-alumni',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const pathwayExtreme = Pathway_Extreme({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  variable: '--font-pathway',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hauscoastal.com.vn'),
  title: 'Coastal Quảng Ngãi | Biểu Tượng Đô Thị Sinh Thái Biển',
  description:
    'Dự án Coastal Quảng Ngãi - Đô thị sinh thái biển đẳng cấp tại Quảng Ngãi. Shophouse, Biệt thự, Căn hộ từ Haus Group. Hotline: 098 624 3450',
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
    images: [{ url: '/images/hero/hero-banner-coastal-aerial.jpg', width: 1200, height: 630, alt: 'Coastal Quảng Ngãi' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${alumniSans.variable} ${pathwayExtreme.variable}`}>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

import type { Metadata, Viewport } from 'next';
import { Alumni_Sans, Pathway_Extreme } from 'next/font/google';
import Script from 'next/script';
import FloatingCta from '@/app/components/floating-cta';
import { SITE_URL } from '@/app/lib/constants';
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B3D5C',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Coastal Quảng Ngãi | Biểu Tượng Đô Thị Sinh Thái Biển',
  description:
    'Dự án Coastal Quảng Ngãi 93.9ha - Đô thị sinh thái biển đẳng cấp. Biệt thự biển, Shophouse, Căn hộ ven biển Quảng Ngãi. Sổ đỏ lâu dài. CĐT Haus Group. Hotline: 098 624 3450',
  authors: [{ name: 'Haus Group' }],
  keywords: [
    'hauscoastal',
    'haus coastal',
    'haus coastal quảng ngãi',
    'Coastal Quảng Ngãi',
    'Haus Quảng Ngãi',
    'dự án coastal quảng ngãi',
    'biệt thự biển Quảng Ngãi',
    'đô thị sinh thái biển',
    'bất động sản Quảng Ngãi',
    'shophouse Quảng Ngãi',
    'dự án Quảng Ngãi',
    'nhà đất Quảng Ngãi',
    'Haus Group',
    'dự án haus group',
    'khu đô thị mới Quảng Ngãi',
    'coastal quang ngai',
  ],
  verification: { google: 'rDKdN-qp0M3vhY3KN4J3bzAmjxKQpj0awXJMoB3YtKU' },
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Coastal Quảng Ngãi | Biểu Tượng Đô Thị Sinh Thái Biển',
    description:
      'Dự án Coastal Quảng Ngãi 93.9ha - Biệt thự biển, Shophouse, Căn hộ ven biển. Sổ đỏ lâu dài. CĐT Haus Group.',
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Coastal Quảng Ngãi',
    url: SITE_URL,
    images: [{ url: '/images/hero/hero-banner-coastal-aerial.jpg', width: 1200, height: 630, alt: 'Coastal Quảng Ngãi - Đô thị sinh thái biển đẳng cấp' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coastal Quảng Ngãi | Biểu Tượng Đô Thị Sinh Thái Biển',
    description: 'Dự án Coastal Quảng Ngãi 93.9ha - Biệt thự biển, Shophouse, Căn hộ ven biển. Sổ đỏ lâu dài.',
    images: ['/images/hero/hero-banner-coastal-aerial.jpg'],
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
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* Organization + WebSite JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Haus Group',
              url: SITE_URL,
              logo: `${SITE_URL}/images/misc/coastal-logo-identity.png`,
              contactPoint: { '@type': 'ContactPoint', telephone: '+84-986-243-450', contactType: 'sales' },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Coastal Quảng Ngãi',
              url: SITE_URL,
              publisher: { '@type': 'Organization', name: 'Haus Group' },
            },
          ]) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <FloatingCta />
        {/* GA scripts placed in body to avoid Next.js <head> warnings */}
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
      </body>
    </html>
  );
}

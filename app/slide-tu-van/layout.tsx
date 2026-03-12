import type { Metadata } from 'next';

/** Prevent search engines from indexing the internal sales presentation */
export const metadata: Metadata = {
  title: 'Slide Tư Vấn | Coastal Quảng Ngãi',
  robots: { index: false, follow: false },
};

export default function SlideLayout({ children }: { children: React.ReactNode }) {
  return children;
}

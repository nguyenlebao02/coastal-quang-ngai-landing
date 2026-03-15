import Link from 'next/link';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-cream-gradient">
        <div className="text-center px-6">
          <h1 className="font-heading text-6xl text-cta-orange font-bold mb-4">404</h1>
          <h2 className="font-heading text-xl text-charcoal mb-2">Không tìm thấy trang</h2>
          <p className="text-charcoal/60 mb-8">Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển.</p>
          <Link href="/" className="px-6 py-3 bg-cta-orange text-white rounded-lg hover:brightness-110 transition-all font-semibold inline-block">
            Về trang chủ
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

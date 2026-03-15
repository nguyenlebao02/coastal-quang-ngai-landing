export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-gradient">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-cta-orange/30 border-t-cta-orange rounded-full animate-spin mx-auto mb-4" />
        <p className="text-charcoal/60 text-sm">Đang tải...</p>
      </div>
    </div>
  );
}

export default function BlogLoading() {
  return (
    <div className="min-h-screen pt-28 pb-16 bg-cream-gradient">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <div className="h-10 w-56 bg-rose-beige/20 rounded mx-auto mb-4 animate-pulse" />
          <div className="rose-line mb-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
              <div className="h-48 bg-gray-200" />
              <div className="p-5 space-y-3">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

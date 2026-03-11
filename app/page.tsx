import { Suspense } from 'react';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';
import FloatingCta from '@/app/components/floating-cta';
import HeroSection from '@/app/components/sections/hero-section';
import IntroductionSection from '@/app/components/sections/introduction-section';
import RegistrationFormSection from '@/app/components/sections/registration-form-section';
import OverviewSection from '@/app/components/sections/overview-section';
import LocationSection from '@/app/components/sections/location-section';
import AmenitiesSection from '@/app/components/sections/amenities-section';
import ArchitectureSection from '@/app/components/sections/architecture-section';
import PolicySection from '@/app/components/sections/policy-section';
import ProductsSection from '@/app/components/sections/products-section';
import LayoutSection from '@/app/components/sections/layout-section';
import ProgressSection from '@/app/components/sections/progress-section';
import NewsSection from '@/app/components/sections/news-section';
import ContactSection from '@/app/components/sections/contact-section';

function NewsSkeleton() {
  return (
    <div className="py-16 bg-cream-gradient">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <div className="h-8 w-48 bg-rose-beige/20 rounded mx-auto mb-2" />
          <div className="rose-line mb-6" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
              <div className="h-48 bg-gray-200" />
              <div className="p-5 space-y-3">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <IntroductionSection />
        <RegistrationFormSection />
        <OverviewSection />
        <LocationSection />
        <AmenitiesSection />
        <ArchitectureSection />
        <PolicySection />
        <ProductsSection />
        <LayoutSection />
        <ProgressSection />
        <Suspense fallback={<NewsSkeleton />}>
          <NewsSection />
        </Suspense>
        <ContactSection />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}

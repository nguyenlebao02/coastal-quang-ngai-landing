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
        <NewsSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}

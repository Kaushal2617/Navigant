import React, { Suspense } from 'react';
import AppLayout from '../components/layout/AppLayout';
import HeroBanner from '../components/hero/HeroBanner';
import ClientLogos from '../components/clients/ClientLogos';
import ShimmerServicesSection from '../components/services/ShimmerServicesSection';
import CertificatesSection from '../components/commons/CertificatesSection';
import CaseStudiesSection from '../components/commons/CaseStudiesSection';
import TeamMembersSection from '../components/commons/TeamMembersSection';
import TestimonialsCarouselSection from '../components/commons/TestimonialsCarouselSection';
import ContactFormSection from '../components/commons/ContactFormSection';
import { lazyWithDelay } from '../utils/lazyWithDelay';

// Lazy load heavy components with delay for demo (set delay to 0 in production)
const ServicesSection = lazyWithDelay(() => import('../components/services/ServicesSection'));

const HomePage: React.FC = () => {
  return (
    <AppLayout>
      {/* Hero Banner - Full Width */}
      <div className="w-full">
        <HeroBanner />
      </div>

      {/* Client Logos Section */}
      <ClientLogos />

      {/* Services Section - Lazy Loaded */}
      <Suspense fallback={<ShimmerServicesSection />}>
        <ServicesSection />
      </Suspense>

      {/* Certificates Section */}
      <CertificatesSection />

      {/* Case Studies Section */}
      <CaseStudiesSection />

      {/* Team Members Section */}
      <TeamMembersSection />

      {/* Testimonials Carousel Section */}
      <TestimonialsCarouselSection />

      {/* Contact Form Section */}
      <ContactFormSection />

      {/* Page Content - Constrained Width */}
      <div className="w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-4 sm:py-6 md:py-8 lg:py-10 max-w-7xl">
        {/* Your page content goes here */}
      </div>
    </AppLayout>
  );
};

export default HomePage;




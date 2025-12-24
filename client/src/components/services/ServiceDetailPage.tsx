import React, { Suspense, useState } from 'react';
import type { ServiceData } from './serviceTypes';
import ServiceHero from './ServiceHero';
import type { HeroSlide as HeroSlideType } from '../hero/HeroBanner';
import ServiceCard from '../commons/ServiceCard';
import BrandShowcase from './BrandShowcase';
import { lazyWithDelay } from '../../utils/lazyWithDelay';
import DotGrid from '../commons/DotGrid';
import ServiceModal from '../commons/ServiceModal';

// Lazy load heavy components with delay for demo (set delay to 0 in production)
const IndustrySolutions = lazyWithDelay(() => import('./IndustrySolutions'));
const ServiceCategorySection = lazyWithDelay(() => import('./ServiceCategorySection'));
const ServiceDetailSection = lazyWithDelay(() => import('./ServiceDetailSection'));
const TestimonialsSection = lazyWithDelay(() => import('./TestimonialsSection'));
const ContactFormSection = lazyWithDelay(() => import('./ContactFormSection'));

// Shimmer placeholders for individual sections
const ShimmerSection = () => (
  <div className="py-12 md:py-16 lg:py-20">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="h-64 bg-gray-100 rounded-2xl animate-pulse"></div>
    </div>
  </div>
);

interface ServiceDetailPageProps {
  serviceData: ServiceData;
}

const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ serviceData }) => {
  const [selectedService, setSelectedService] = useState<{ title: string; content: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Convert hero slides if they exist
  const heroSlides: HeroSlideType[] | undefined = serviceData.heroSlides?.map((slide) => ({
    id: slide.id,
    title: slide.title,
    subtitle: slide.subtitle,
    image: slide.image,
    imageAlt: slide.imageAlt,
    primaryButton: {
      text: 'Connect With Us',
      href: '/contact',
    },
    // secondaryButton: {
    //   text: 'Watch Video',
    //   href: '#',
    // },
  }));

  return (
    <div className="w-full">
      {/* 1. Service Hero Section - Unique Design with Glassmorphism */}
      {heroSlides && heroSlides.length > 0 ? (
        <div className="w-full">
          <ServiceHero
            slides={heroSlides}
            autoplay={true}
            autoplayDelay={5000}
            showNavigation={false}
            showPagination={false}
            badgeText={serviceData.name}
          />
        </div>
      ) : (
        // Fallback hero section if no slides
        <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-white via-gray-50 to-white overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
            <DotGrid
              dotSize={12}
              gap={40}
              baseColor="#E5E7EB"
              activeColor="#CA1411"
              proximity={120}
              speedTrigger={80}
              shockRadius={200}
              shockStrength={4}
              maxSpeed={4000}
              resistance={800}
              returnDuration={1.2}
              className="w-full h-full"
            />
          </div>
          <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#CA1411] rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 pt-20 md:pt-24 lg:pt-28">
            <div className="max-w-4xl mx-auto text-center">
              {serviceData.subtitle && (
                <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed">
                  {serviceData.subtitle}
                </p>
              )}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                {serviceData.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                {serviceData.description}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 2. Brand Showcase Section - Companies using the service */}
      {serviceData.brandLogos && serviceData.brandLogos.length > 0 && (
        <BrandShowcase
          title="Our Clients"
          subtitle="People Who Worked With Us"
          brands={serviceData.brandLogos}
        />
      )}

      {/* 3. About Section */}
      {serviceData.aboutSection && (
        <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
            <DotGrid
              dotSize={12}
              gap={40}
              baseColor="#E5E7EB"
              activeColor="#CA1411"
              proximity={120}
              speedTrigger={80}
              shockRadius={200}
              shockStrength={4}
              maxSpeed={4000}
              resistance={800}
              returnDuration={1.2}
              className="w-full h-full"
            />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight text-center">
                {serviceData.aboutSection.title}
              </h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center whitespace-pre-line">
                {serviceData.aboutSection.content}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 4. Industry Solutions Section (Tata Tele Business pattern) */}
      {serviceData.industries && serviceData.industries.length > 0 && (
        <Suspense fallback={<ShimmerSection />}>
          <IndustrySolutions industries={serviceData.industries} />
        </Suspense>
      )}

      {/* 5. Detailed Service Sections (Original BPO page pattern - alternating layouts) */}
      {serviceData.detailSections && serviceData.detailSections.length > 0 && (
        <Suspense fallback={<ShimmerSection />}>
          <div className="w-full space-y-0">
            {serviceData.detailSections.map((section, index) => (
              <ServiceDetailSection
                key={section.id}
                section={section}
                index={index}
                variant="alternate"
              />
            ))}
          </div>
        </Suspense>
      )}

      {/* 6. Why Choose Us Section (Tata Tele Business pattern) */}
      {serviceData.highlights && serviceData.highlights.length > 0 && (
        <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
            <DotGrid
              dotSize={12}
              gap={40}
              baseColor="#E5E7EB"
              activeColor="#CA1411"
              proximity={120}
              speedTrigger={80}
              shockRadius={200}
              shockStrength={4}
              maxSpeed={4000}
              resistance={800}
              returnDuration={1.2}
              className="w-full h-full"
            />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            {/* Section Header */}
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-block mb-4">
                <span className="text-sm md:text-base font-semibold text-[#CA1411] uppercase tracking-wider">
                  Why Choose Us
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Bringing the Best{' '}
                <span className="text-[#CA1411] relative">
                  Technology and Services
                  <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#CA1411]/10 -z-10 transform -skew-x-12" />
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Navigant Technologies, with its pioneering spirit of innovation and distinctive customer value proposition, provides solutions that allow enterprises to be resilient, maintain business continuity, and grow in a flexible, scalable, and secure manner.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-7">
              {serviceData.highlights.map((highlight, index) => (
                <div
                  key={highlight.id}
                  className="relative group"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div
                    className="relative rounded-2xl p-8 bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 ease-out h-full"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    }}
                  >
                    {/* Icon and Title - Side by Side */}
                    <div className="flex items-start gap-4 mb-4">
                    {/* Icon */}
                      <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out bg-gradient-to-br from-[#CA1411] to-[#CA1411] shadow-lg shadow-[#CA1411]/20">
                        <span className="text-3xl">{highlight.icon || '✨'}</span>
                      </div>
                    </div>

                    {/* Title */}
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-[#CA1411] transition-colors duration-300 flex-1 pt-1">
                      {highlight.title}
                    </h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {highlight.description}
                    </p>

                    {/* Hover effect */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(202, 20, 17, 0.05) 0%, transparent 100%)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Service Categories Section (Tata Tele Business pattern) */}
      {serviceData.serviceCategories && serviceData.serviceCategories.length > 0 && (
        <Suspense fallback={<ShimmerSection />}>
          <ServiceCategorySection categories={serviceData.serviceCategories} />
        </Suspense>
      )}

      {/* 8. Additional Services Grid (Original BPO page pattern) */}
      {serviceData.additionalServices && serviceData.additionalServices.length > 0 && (
        <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
            <DotGrid
              dotSize={12}
              gap={40}
              baseColor="#E5E7EB"
              activeColor="#CA1411"
              proximity={120}
              speedTrigger={80}
              shockRadius={200}
              shockStrength={4}
              maxSpeed={4000}
              resistance={800}
              returnDuration={1.2}
              className="w-full h-full"
            />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            {/* Section Header */}
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-block mb-4">
                <span className="text-sm md:text-base font-semibold text-[#CA1411] uppercase tracking-wider">
                  Additional Services
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                More <span className="text-[#CA1411] relative">
                  Solutions
                  <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#CA1411]/10 -z-10 transform -skew-x-12" />
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Explore our comprehensive range of additional BPO services designed to support your business needs.
              </p>
            </div>

            {/* Additional Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 lg:gap-8">
              {serviceData.additionalServices.map((service, index) => (
                <div
                  key={service.id}
                  className="service-card-wrapper h-full"
                  style={{
                    animationDelay: `${index * 0.08}s`,
                  }}
                >
                  <ServiceCard
                    service={{
                      id: service.id,
                      title: service.title,
                      name: service.title,
                      shortDescription: service.content,
                      description: service.content,
                    }}
                    index={index}
                    variant="simple"
                    showLearnMore={true}
                    onLearnMoreClick={() => {
                      setSelectedService({ title: service.title, content: service.content });
                      setIsModalOpen(true);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. Testimonials Section (Both patterns) */}
      {serviceData.testimonials && serviceData.testimonials.length > 0 && (
        <Suspense fallback={<ShimmerSection />}>
          <TestimonialsSection testimonials={serviceData.testimonials} />
        </Suspense>
      )}

      {/* 10. CTA Section with Form (Tata Tele Business pattern) */}
      {serviceData.cta && (
        <>
          {serviceData.cta.showForm ? (
            <Suspense fallback={<ShimmerSection />}>
              <ContactFormSection
                title={serviceData.cta.title}
                subtitle={serviceData.cta.description}
              />
            </Suspense>
          ) : (
            <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#CA1411] to-[#CA1411] relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
              </div>
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
                <div className="text-center">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    {serviceData.cta.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
                    {serviceData.cta.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                      href={serviceData.cta.primaryButton.href}
                      className="inline-block px-8 py-4 bg-white text-[#CA1411] font-semibold rounded-lg transition-all duration-300 text-center shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:bg-gray-50 text-base md:text-lg"
                    >
                      {serviceData.cta.primaryButton.text}
                    </a>
                    {serviceData.cta.secondaryButton && (
                      <a
                        href={serviceData.cta.secondaryButton.href}
                        className="inline-block px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-[#CA1411] font-semibold rounded-lg transition-all duration-300 text-center shadow-md hover:shadow-lg hover:-translate-y-0.5 text-base md:text-lg"
                      >
                        {serviceData.cta.secondaryButton.text}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Service Modal */}
      {selectedService && (
        <ServiceModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setTimeout(() => setSelectedService(null), 300);
          }}
          title={selectedService.title}
          content={selectedService.content}
        />
      )}
    </div>
  );
};

export default ServiceDetailPage;

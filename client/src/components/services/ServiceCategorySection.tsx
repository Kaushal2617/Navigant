import React from 'react';
import type { ServiceCategory } from './serviceTypes';
import ServiceCard from '../commons/ServiceCard';
import DotGrid from '../commons/DotGrid';

interface ServiceCategorySectionProps {
  categories: ServiceCategory[];
}

const ServiceCategorySection: React.FC<ServiceCategorySectionProps> = ({ categories }) => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white relative overflow-hidden">
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
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="inline-block mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm md:text-base font-semibold text-[#CA1411] uppercase tracking-wider">
              Our Services
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 leading-tight px-2">
            Services Crafted to Take Your{' '}
            <span className="text-[#CA1411] relative">
              Business Ahead
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#CA1411]/10 -z-10 transform -skew-x-12" />
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-3">
            Find tailored solutions for your collaboration, communication, & connectivity needs with services that push the limits & unfold new possibilities.
          </p>
        </div>

        {/* Service Categories */}
        <div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16">
          {categories.map((category, categoryIndex) => (
            <div key={category.id} className="space-y-4 sm:space-y-5 md:space-y-6">
              {/* Category Header */}
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-7 md:mb-8">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                  {category.name}
                </h3>
                <div className="flex-grow h-px bg-gradient-to-r from-[#CA1411] to-transparent" />
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
                {category.services.map((service, serviceIndex) => (
                  <div
                    key={service.id}
                    className="service-card-wrapper"
                    style={{
                      animationDelay: `${(categoryIndex * 10 + serviceIndex) * 0.08}s`,
                    }}
                  >
                    <ServiceCard
                      service={{
                        id: service.id,
                        title: service.title,
                        name: service.title,
                        shortDescription: service.shortDescription,
                        description: service.fullDescription,
                        iconPath: service.iconPath,
                        icon: service.icon,
                      }}
                      index={categoryIndex * 10 + serviceIndex}
                      variant="default"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategorySection;




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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm md:text-base font-semibold text-[#CA1411] uppercase tracking-wider">
              Our Services
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Services Crafted to Take Your{' '}
            <span className="text-[#CA1411] relative">
              Business Ahead
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#CA1411]/10 -z-10 transform -skew-x-12" />
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Find tailored solutions for your collaboration, communication, & connectivity needs with services that push the limits & unfold new possibilities.
          </p>
        </div>

        {/* Service Categories */}
        <div className="space-y-12 md:space-y-16">
          {categories.map((category, categoryIndex) => (
            <div key={category.id} className="space-y-6">
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {category.name}
                </h3>
                <div className="flex-grow h-px bg-gradient-to-r from-[#CA1411] to-transparent" />
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 lg:gap-8">
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




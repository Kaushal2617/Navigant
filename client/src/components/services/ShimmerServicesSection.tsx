import React from 'react';
import ShimmerServiceCard from '../commons/ShimmerServiceCard';

/**
 * Shimmer Services Section - For ServicesSection loading state
 */
const ShimmerServicesSection: React.FC = () => {
  return (
    <section className="py-20 md:py-24 lg:py-28 bg-gradient-to-b from-white via-gray-50/50 to-white w-full relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header Shimmer */}
        <div className="text-center mb-16 md:mb-20 lg:mb-24">
          <div className="inline-block mb-4">
            <div className="h-4 w-32 bg-gray-200 rounded mx-auto animate-pulse"></div>
          </div>
          <div className="h-12 md:h-16 w-3/4 max-w-2xl bg-gray-200 rounded mx-auto mb-6 animate-pulse"></div>
          <div className="h-6 w-2/3 max-w-xl bg-gray-200 rounded mx-auto animate-pulse"></div>
        </div>

        {/* Services Grid Shimmer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 lg:gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="service-card-wrapper"
              style={{
                animationDelay: `${index * 0.08}s`,
              }}
            >
              <ShimmerServiceCard />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShimmerServicesSection;


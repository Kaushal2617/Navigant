import React from 'react';
import Shimmer, { ShimmerImage, ShimmerText } from '../commons/Shimmer';
import ShimmerServiceCard from '../commons/ShimmerServiceCard';

/**
 * Shimmer Service Detail Page - For service page loading state
 */
const ShimmerServiceDetailPage: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Banner Shimmer */}
      <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
        <ShimmerImage height="100%" className="w-full" rounded={false} />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <Shimmer height="4rem" width="80%" className="mb-4" rounded="rounded" />
              <Shimmer height="1.5rem" width="90%" className="mb-6" rounded="rounded" />
              <div className="flex gap-4">
                <Shimmer height="3rem" width="150px" rounded="rounded-lg" />
                <Shimmer height="3rem" width="150px" rounded="rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section Shimmer */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-4xl mx-auto">
            <Shimmer height="2.5rem" width="70%" className="mx-auto mb-8" rounded="rounded" />
            <ShimmerText lines={4} lineHeight="1.25rem" className="text-center" />
          </div>
        </div>
      </section>

      {/* Industry Solutions Shimmer */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-white via-gray-50/50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <Shimmer height="2.5rem" width="60%" className="mx-auto mb-6" rounded="rounded" />
            <Shimmer height="1.25rem" width="50%" className="mx-auto" rounded="rounded" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="rounded-2xl p-6 md:p-8 bg-white border border-gray-100 shadow-sm">
                <Shimmer width={64} height={64} rounded="rounded-2xl" className="mb-6" />
                <Shimmer height="1.5rem" width="80%" className="mb-4" rounded="rounded" />
                <ShimmerText lines={2} lineHeight="1rem" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Cards Shimmer */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <Shimmer height="2.5rem" width="70%" className="mx-auto mb-6" rounded="rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 lg:gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <ShimmerServiceCard key={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShimmerServiceDetailPage;


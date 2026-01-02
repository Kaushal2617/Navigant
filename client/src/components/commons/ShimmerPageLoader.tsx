import React from 'react';
import Shimmer, { ShimmerText } from './Shimmer';

/**
 * Page Loader with Shimmer - For route-based lazy loading
 */
const ShimmerPageLoader: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/50 to-white w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        {/* Header Shimmer */}
        <div className="text-center mb-16">
          <Shimmer height="0.75rem" width="120px" className="mx-auto mb-4" rounded="rounded" />
          <Shimmer height="3rem" width="60%" className="mx-auto mb-6" rounded="rounded" />
          <Shimmer height="1.25rem" width="80%" className="mx-auto" rounded="rounded" />
        </div>

        {/* Content Grid Shimmer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 lg:gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 md:p-8">
              <div className="flex flex-col h-full">
                <div className="mb-6 flex items-start gap-4">
                  <Shimmer width={64} height={64} rounded="rounded-2xl" />
                  <div className="flex-grow">
                    <Shimmer height="1.5rem" width="70%" className="mb-3" rounded="rounded" />
                    <Shimmer height="0.5rem" width="100%" rounded="rounded-full" />
                  </div>
                </div>
                <div className="flex-grow mb-4">
                  <ShimmerText lines={3} lineHeight="1rem" />
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <Shimmer height="2rem" width="120px" rounded="rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShimmerPageLoader;


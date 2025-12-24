import React from 'react';
import Shimmer from './Shimmer';

/**
 * Shimmer Service Card - Matches the exact structure of ServiceCard
 * Used as loading placeholder for service cards
 */
const ShimmerServiceCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`service-card relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm ${className}`}>
      {/* Content */}
      <div className="relative z-10 p-7 md:p-8 lg:p-9 flex-grow flex flex-col">
        {/* Icon and Title Row */}
        <div className="mb-6 flex items-start gap-4">
          {/* Icon Shimmer */}
          <div className="flex-shrink-0">
            <Shimmer width={64} height={64} rounded="rounded-2xl" />
          </div>

          {/* Title Shimmer */}
          <div className="flex-grow min-w-0">
            <Shimmer height="1.75rem" width="80%" className="mb-3" rounded="rounded" />
            <Shimmer height="0.25rem" width="100%" rounded="rounded-full" />
          </div>
        </div>

        {/* Description Shimmer */}
        <div className="mb-6 flex-grow space-y-2">
          <Shimmer height="1rem" width="100%" rounded="rounded" />
          <Shimmer height="1rem" width="100%" rounded="rounded" />
          <Shimmer height="1rem" width="70%" rounded="rounded" />
        </div>

        {/* Read More Button Shimmer */}
        <div className="mt-auto pt-5 border-t border-gray-100">
          <Shimmer height="1.5rem" width="100px" rounded="rounded" />
        </div>
      </div>

      {/* Corner accent shimmer */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-20">
        <Shimmer width={96} height={96} rounded="rounded-full" />
      </div>
    </div>
  );
};

export default ShimmerServiceCard;


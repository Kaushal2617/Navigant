import React from 'react';

interface ShimmerProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean | string;
  variant?: 'default' | 'pulse' | 'wave';
}

/**
 * Base Shimmer Component - Animated loading placeholder
 */
const Shimmer: React.FC<ShimmerProps> = ({
  className = '',
  width = '100%',
  height = '1rem',
  rounded = false,
  variant = 'wave',
}) => {
  const roundedClass = rounded === true 
    ? 'rounded-full' 
    : typeof rounded === 'string' 
    ? rounded 
    : 'rounded';

  const variantClass = variant === 'pulse' 
    ? 'shimmer-pulse' 
    : variant === 'wave'
    ? 'shimmer-wave'
    : 'shimmer-default';

  return (
    <div
      className={`shimmer-base ${variantClass} ${roundedClass} ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  );
};

export default Shimmer;

/**
 * Shimmer Text - For text placeholders
 */
export const ShimmerText: React.FC<{
  lines?: number;
  className?: string;
  lineHeight?: string;
}> = ({ lines = 1, className = '', lineHeight = '1.5rem' }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Shimmer
          key={index}
          height={lineHeight}
          width={index === lines - 1 ? '80%' : '100%'}
          rounded="rounded"
        />
      ))}
    </div>
  );
};

/**
 * Shimmer Card - For card placeholders
 */
export const ShimmerCard: React.FC<{
  className?: string;
  showIcon?: boolean;
  showButton?: boolean;
}> = ({ className = '', showIcon = true, showButton = true }) => {
  return (
    <div className={`rounded-2xl bg-white border border-gray-100 shadow-sm p-6 md:p-8 ${className}`}>
      <div className="flex flex-col h-full">
        {showIcon && (
          <div className="mb-6 flex items-start gap-4">
            <Shimmer width={64} height={64} rounded="rounded-2xl" />
            <div className="flex-grow">
              <Shimmer height="1.5rem" width="70%" className="mb-3" rounded="rounded" />
              <Shimmer height="0.5rem" width="100%" rounded="rounded-full" />
            </div>
          </div>
        )}
        <div className="flex-grow mb-4">
          <ShimmerText lines={3} lineHeight="1rem" />
        </div>
        {showButton && (
          <div className="pt-4 border-t border-gray-100">
            <Shimmer height="2rem" width="120px" rounded="rounded-lg" />
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Shimmer Image - For image placeholders
 */
export const ShimmerImage: React.FC<{
  width?: string | number;
  height?: string | number;
  className?: string;
  rounded?: boolean | string;
}> = ({ width = '100%', height = 200, className = '', rounded = 'rounded-2xl' }) => {
  return (
    <Shimmer
      width={width}
      height={height}
      rounded={rounded}
      className={`${className}`}
    />
  );
};

/**
 * Shimmer Button - For button placeholders
 */
export const ShimmerButton: React.FC<{
  width?: string | number;
  height?: string | number;
  className?: string;
}> = ({ width = 120, height = 40, className = '' }) => {
  return (
    <Shimmer
      width={width}
      height={height}
      rounded="rounded-lg"
      className={className}
    />
  );
};

/**
 * Shimmer Service Card Grid - For service cards loading
 */
export const ShimmerServiceCardGrid: React.FC<{
  count?: number;
  className?: string;
}> = ({ count = 6, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 lg:gap-8 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <ShimmerCard key={index} />
      ))}
    </div>
  );
};

/**
 * Shimmer List - For list items loading
 */
export const ShimmerList: React.FC<{
  items?: number;
  className?: string;
}> = ({ items = 5, className = '' }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center gap-3">
          <Shimmer width={20} height={20} rounded="rounded-full" />
          <Shimmer height="1rem" width={index % 2 === 0 ? '80%' : '100%'} rounded="rounded" />
        </div>
      ))}
    </div>
  );
};


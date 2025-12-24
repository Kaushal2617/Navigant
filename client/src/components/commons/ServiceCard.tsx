import React from 'react';
import { getServiceIcon } from '../../utils/serviceIcons';

export interface ServiceCardData {
  id: string;
  title: string;
  name?: string; // For backward compatibility
  description?: string;
  shortDescription?: string;
  slug?: string;
  href?: string;
  iconPath?: string;
  icon?: string;
}

interface ServiceCardProps {
  service: ServiceCardData;
  index?: number;
  variant?: 'default' | 'compact' | 'simple';
  showLearnMore?: boolean;
  learnMoreText?: string;
  className?: string;
  onLearnMoreClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  index = 0,
  variant = 'default',
  showLearnMore = true,
  learnMoreText = 'Learn More',
  className = '',
  onLearnMoreClick,
}) => {
  const serviceName = service.name || service.title;
  const serviceTitle = service.title || service.name || '';
  const description = service.shortDescription || service.description || '';
  const iconPath = service.iconPath || getServiceIcon(serviceName);
  const linkHref = service.href || (service.slug ? `/services/${service.slug}` : '#');

  // Simple variant - for additional services
  if (variant === 'simple') {
    return (
      <div
        className={`relative group rounded-2xl p-6 md:p-8 bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 ease-out h-full flex flex-col ${className}`}
        style={{
          animationDelay: `${index * 0.1}s`,
        }}
      >
        {/* Gradient overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(202, 20, 17, 0.05) 0%, rgba(202, 20, 17, 0.02) 50%, transparent 100%)',
          }}
        />

        {/* Icon */}
        <div className="mb-4 flex-shrink-0 relative z-10">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out"
            style={{
              background: 'linear-gradient(135deg, rgba(202, 20, 17, 0.08), rgba(202, 20, 17, 0.04))',
            }}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#CA1411] to-[#CA1411] flex items-center justify-center shadow-lg shadow-[#CA1411]/20 transform group-hover:rotate-6 transition-transform duration-500 ease-out">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d={iconPath} />
              </svg>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#CA1411] transition-colors duration-300 relative z-10">
          {serviceTitle}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-base leading-relaxed line-clamp-3 group-hover:text-gray-700 transition-colors duration-300 relative z-10 flex-grow mb-4">
          {description}
        </p>

        {/* Learn More Button */}
        {showLearnMore && (
          <div className="mt-auto pt-4 border-t border-gray-100 group-hover:border-[#CA1411]/30 transition-colors duration-300 relative z-10">
            <button
              onClick={onLearnMoreClick}
              className="inline-flex items-center text-[#CA1411] font-semibold text-sm md:text-base hover:text-[#CA1411] transition-all duration-300 group/link"
            >
              <span className="relative">
                {learnMoreText}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#CA1411] group-hover/link:w-full transition-all duration-500 ease-out" />
              </span>
              <svg
                className="w-5 h-5 ml-2 transform group-hover/link:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  }

  // Compact variant - for service features
  if (variant === 'compact') {
    return (
      <div
        className={`service-feature-card group relative rounded-2xl overflow-hidden h-full flex flex-col cursor-pointer bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 ease-out ${className}`}
        style={{
          animationDelay: `${index * 0.1}s`,
        }}
      >
        {/* Gradient overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(202, 20, 17, 0.03) 0%, rgba(202, 20, 17, 0.01) 50%, transparent 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-6 md:p-8 flex-grow flex flex-col">
          {/* Icon */}
          <div className="mb-4 flex-shrink-0">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center transform group-hover:scale-105 group-hover:-rotate-3 transition-all duration-500 ease-out"
              style={{
                background: 'linear-gradient(135deg, rgba(202, 20, 17, 0.08), rgba(202, 20, 17, 0.04))',
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#CA1411] to-[#CA1411] flex items-center justify-center shadow-lg shadow-[#CA1411]/20 transform group-hover:rotate-6 transition-transform duration-500 ease-out">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d={iconPath} />
                </svg>
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#CA1411] transition-colors duration-300 leading-tight">
            {serviceTitle}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-base leading-relaxed flex-grow group-hover:text-gray-700 transition-colors duration-300">
            {description}
          </p>

          {/* Read More Link */}
          {showLearnMore && (
            <div className="mt-6 pt-4 border-t border-gray-100 group-hover:border-[#CA1411]/30 transition-colors duration-300">
              <a
                href={linkHref}
                className="inline-flex items-center text-[#CA1411] font-semibold text-sm md:text-base hover:text-[#CA1411] transition-all duration-300 group/link"
              >
                <span className="relative">
                  {learnMoreText}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#CA1411] group-hover/link:w-full transition-all duration-500 ease-out" />
                </span>
                <svg
                  className="w-5 h-5 ml-2 transform group-hover/link:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          )}
        </div>

        {/* Corner accent */}
        <div
          className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(202, 20, 17, 0.08) 0%, transparent 70%)',
            transform: 'translate(25%, -25%)',
          }}
        />
      </div>
    );
  }

  // Default variant - for home page services section
  return (
    <div
      className={`service-card relative rounded-2xl overflow-hidden group h-full flex flex-col cursor-pointer bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 ease-out ${className}`}
    >
      {/* Subtle gradient overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(202, 20, 17, 0.03) 0%, rgba(202, 20, 17, 0.01) 50%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="service-card-content relative z-10 p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 flex-grow flex flex-col">
        {/* Icon and Title Row */}
        <div className="mb-3 sm:mb-4 md:mb-5 lg:mb-6 flex items-start gap-2 sm:gap-3 md:gap-4">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div
              className="service-card-icon w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center transform group-hover:scale-105 group-hover:-rotate-3 transition-all duration-500 ease-out"
              style={{
                background: 'linear-gradient(135deg, rgba(202, 20, 17, 0.08), rgba(202, 20, 17, 0.04))',
              }}
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#CA1411] to-[#CA1411] flex items-center justify-center shadow-lg shadow-[#CA1411]/20 transform group-hover:rotate-6 transition-transform duration-500 ease-out">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d={iconPath} />
                </svg>
              </div>
            </div>
          </div>

          {/* Service Title */}
          <div className="flex-grow min-w-0">
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 md:mb-3 group-hover:text-[#CA1411] transition-colors duration-300 leading-tight">
              {serviceTitle}
            </h3>
            <div className="relative h-1 bg-gray-100 rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#CA1411] to-transparent w-12 group-hover:w-full transition-all duration-700 ease-out"></div>
              <div
                className="absolute inset-0 bg-[#CA1411] w-12 rounded-full opacity-0 group-hover:opacity-100 group-hover:w-full transition-all duration-700 ease-out"
                style={{
                  boxShadow: '0 0 12px rgba(202, 20, 17, 0.4)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Service Description */}
        <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4 md:mb-5 lg:mb-6 line-clamp-2 sm:line-clamp-3 flex-grow group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>

        {/* Read More Button */}
        {showLearnMore && (
          <div className="mt-auto pt-3 sm:pt-4 md:pt-5 border-t border-gray-100 group-hover:border-[#CA1411]/30 transition-colors duration-300">
            <a
              href={linkHref}
              className="inline-flex items-center text-[#CA1411] font-semibold text-xs sm:text-sm md:text-base hover:text-[#CA1411] transition-all duration-300 group/link"
            >
              <span className="relative">
                {learnMoreText}
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#CA1411] group-hover/link:w-full transition-all duration-500 ease-out"
                />
              </span>
              <svg
                className="w-5 h-5 ml-2 transform group-hover/link:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        )}
      </div>

      {/* Subtle corner accent */}
      <div
        className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(202, 20, 17, 0.08) 0%, transparent 70%)',
          transform: 'translate(25%, -25%)',
        }}
      />
    </div>
  );
};

export default ServiceCard;


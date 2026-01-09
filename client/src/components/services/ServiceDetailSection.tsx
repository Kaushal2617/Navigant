import React, { useEffect, useRef, useState } from 'react';
import type { ServiceDetailSection as ServiceDetailSectionType } from './serviceTypes';
import DotGrid from '../commons/DotGrid';

interface ServiceDetailSectionProps {
  section: ServiceDetailSectionType;
  index: number;
  variant?: 'default' | 'alternate';
}

const ServiceDetailSection: React.FC<ServiceDetailSectionProps> = ({
  section,
  index,
  variant = 'default',
}) => {
  const isAlternate = variant === 'alternate' && index % 2 === 1;
  const imageRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <section
      className={`py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 relative overflow-hidden ${
        isAlternate ? 'bg-gradient-to-br from-gray-50 to-white' : 'bg-white'
      }`}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
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
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 xl:gap-10 items-center ${
          isAlternate ? 'lg:grid-flow-dense' : ''
        }`}>
          {/* Content */}
          <div className={isAlternate ? 'lg:col-start-2' : ''}>
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              {/* Title with accent */}
              <div className="relative">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#CA1411] mb-4 sm:mb-5 md:mb-6 leading-tight px-1">
                  {section.title}
                  <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#CA1411]/10 -z-10 transform -skew-x-12" />
                </h2>
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line px-1">
                  {section.content}
                </p>
              </div>

              {/* Features List */}
              {section.features && section.features.length > 0 && (
                <div className="mt-6 sm:mt-7 md:mt-8">
                  <ul className="space-y-2.5 sm:space-y-3">
                    {section.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 sm:gap-3">
                        <div className="flex-shrink-0 mt-1.5">
                          <div className="w-2 h-2 rounded-full bg-[#CA1411]" />
                        </div>
                        <span className="text-gray-700 text-sm sm:text-base md:text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Image or Decorative Element */}
          <div 
            ref={imageRef}
            className={isAlternate ? 'lg:col-start-1 lg:row-start-1' : ''}
          >
            {section.image ? (
              <div 
                className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl group"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                  transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`,
                }}
              >
                {/* Image with zoom effect */}
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
                  <img
                    src={section.image}
                    alt={section.imageAlt || section.title}
                    className="w-full h-auto object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
                    style={{
                      transform: 'translateZ(0)',
                      willChange: 'transform',
                    }}
                  />
                  
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                </div>
              </div>
            ) : (
              <div
                className="relative rounded-xl sm:rounded-2xl overflow-hidden h-48 sm:h-56 md:h-64 lg:h-80 xl:h-96 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(202, 20, 17, 0.1) 0%, rgba(202, 20, 17, 0.05) 100%)',
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#CA1411]/20 to-[#CA1411]/10 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-[#CA1411]/30"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailSection;




import React from 'react';
import type { ServiceHighlight } from './serviceTypes';

interface ServiceHighlightsProps {
  highlights: ServiceHighlight[];
}

const ServiceHighlights: React.FC<ServiceHighlightsProps> = ({ highlights }) => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {highlights.map((highlight, index) => (
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
                {/* Icon */}
                <div className="mb-6 flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out bg-gradient-to-br from-[#CA1411] to-[#CA1411] shadow-lg shadow-[#CA1411]/20">
                    <span className="text-3xl">{highlight.icon || '✨'}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#CA1411] transition-colors duration-300">
                  {highlight.title}
                </h3>

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
  );
};

export default ServiceHighlights;




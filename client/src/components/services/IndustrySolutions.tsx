import React from 'react';
import type { Industry } from './serviceTypes';
import DotGrid from '../commons/DotGrid';

interface IndustrySolutionsProps {
  industries: Industry[];
}

const IndustrySolutions: React.FC<IndustrySolutionsProps> = ({ industries }) => {
  const defaultIconPath = 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z';

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden">
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
              Our Industry
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Find Solutions Customized for{' '}
            <span className="text-[#CA1411] relative">
              Your Industry
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#CA1411]/10 -z-10 transform -skew-x-12" />
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Navigant BPO Services are the best in these fields
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-7">
          {industries.map((industry, index) => {
            const iconPath = industry.iconPath || defaultIconPath;
            
            return (
              <div
                key={industry.id}
                className="relative group rounded-2xl p-6 md:p-8 bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 ease-out h-full flex flex-col"
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

                {/* Icon and Title - Side by Side */}
                <div className="flex items-start gap-4 mb-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 ease-out bg-gradient-to-br from-[#CA1411] to-[#CA1411] shadow-lg shadow-[#CA1411]/20">
                      {industry.icon ? (
                        <span className="text-3xl">{industry.icon}</span>
                      ) : (
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d={iconPath} />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-[#CA1411] transition-colors duration-300 leading-tight flex-1 pt-1">
                    {industry.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {industry.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustrySolutions;




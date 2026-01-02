import React, { useState } from 'react';
import { caseStudiesData, caseStudiesSectionConfig, type CaseStudy } from './caseStudiesData';
import DotGrid from './DotGrid';
import CaseStudyModal from './CaseStudyModal';

interface CaseStudiesSectionProps {
  caseStudies?: CaseStudy[];
  title?: string;
  subtitle?: string;
  showViewAllButton?: boolean; // Control whether to show the "View All" button
  enableHorizontalScroll?: boolean; // Control whether to enable horizontal scroll on mobile
}

const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  caseStudies = caseStudiesData,
  title = caseStudiesSectionConfig.title,
  subtitle = caseStudiesSectionConfig.subtitle,
  showViewAllButton = true, // Default to true for home page
  enableHorizontalScroll = true, // Default to true for home page
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  const handleReadMore = (caseStudy: CaseStudy, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedCaseStudy(caseStudy);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCaseStudy(null), 300);
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden">
      {/* DotGrid Background */}
      <div className="absolute inset-0 pointer-events-none">
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
          className="opacity-40"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 leading-[1.1] sm:leading-tight px-4 sm:px-0">
            {title || 'Case Studies & Customer Stories'}{' '}
            <span className="text-[#CA1411]">| NAVIGANT</span>
          </h2>
          {subtitle && (
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
              {subtitle}
            </p>
          )}
        </div>

        {/* Case Studies Container */}
        <div className="relative">
          {/* Horizontal Scroll Container - Mini Devices - Only if enabled */}
          {enableHorizontalScroll && (
            <div className="overflow-x-auto scrollbar-hide pb-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 md:hidden">
              <div className="flex gap-4 sm:gap-5 min-w-max">
              {caseStudies.map((caseStudy, index) => (
                <div
                  key={caseStudy.id}
                  className="group relative flex-shrink-0 w-[280px] sm:w-[320px]"
                  style={{
                    animationDelay: `${index * 0.15}s`,
                  }}
                >
                  <div
                    className="relative h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    }}
                  >
                    {/* Image Container */}
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <img
                        src={caseStudy.image}
                        alt={caseStudy.alt || caseStudy.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/800x600/E5E7EB/6B7280?text=${encodeURIComponent(caseStudy.title)}`;
                        }}
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Category Badge */}
                      {caseStudy.category && (
                        <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                          <span
                            className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold text-white backdrop-blur-md"
                            style={{
                              background: 'linear-gradient(135deg, rgba(202, 20, 17, 0.9), rgba(202, 20, 17, 0.7))',
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                            }}
                          >
                            {caseStudy.category}
                          </span>
                        </div>
                      )}

                      {/* Hover Icon Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div
                          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center backdrop-blur-md"
                          style={{
                            background: 'linear-gradient(135deg, rgba(202, 20, 17, 0.9), rgba(202, 20, 17, 0.7))',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                          }}
                        >
                          <svg
                            className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-[#CA1411] transition-colors duration-300 leading-tight">
                        {caseStudy.title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                        {caseStudy.description}
                      </p>

                      {/* Read More Button */}
                      <button
                        onClick={(e) => handleReadMore(caseStudy, e)}
                        className="inline-flex items-center gap-1.5 sm:gap-2 text-[#CA1411] font-semibold hover:text-[#B0120F] transition-colors duration-300 group/btn text-xs sm:text-sm"
                      >
                        <span>Read More</span>
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20">
                        <svg className="w-full h-full" viewBox="0 0 80 80">
                          <path
                            d="M0,0 L80,0 L80,80 Z"
                            fill="rgba(202, 20, 17, 0.1)"
                            className="transition-all duration-500"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          )}

          {/* Grid Layout - Mobile (when horizontal scroll is disabled) and Desktop */}
          <div className={`${enableHorizontalScroll ? 'hidden md:grid' : 'grid'} grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8 lg:gap-10`}>
            {caseStudies.map((caseStudy, index) => (
              <div
                key={caseStudy.id}
                className="group relative"
                style={{
                  animationDelay: `${index * 0.15}s`,
                }}
              >
                <div
                  className="relative h-full rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  }}
                >
                  {/* Image Container */}
                  <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
                    <img
                      src={caseStudy.image}
                      alt={caseStudy.alt || caseStudy.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/800x600/E5E7EB/6B7280?text=${encodeURIComponent(caseStudy.title)}`;
                      }}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Category Badge */}
                    {caseStudy.category && (
                      <div className="absolute top-4 left-4">
                        <span
                          className="px-3 py-1.5 rounded-full text-xs font-semibold text-white backdrop-blur-md"
                          style={{
                            background: 'linear-gradient(135deg, rgba(202, 20, 17, 0.9), rgba(202, 20, 17, 0.7))',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                          }}
                        >
                          {caseStudy.category}
                        </span>
                      </div>
                    )}

                    {/* Hover Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md"
                        style={{
                          background: 'linear-gradient(135deg, rgba(202, 20, 17, 0.9), rgba(202, 20, 17, 0.7))',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                        }}
                      >
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 md:p-8">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#CA1411] transition-colors duration-300 leading-tight">
                      {caseStudy.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 sm:mb-5 md:mb-6 line-clamp-3">
                      {caseStudy.description}
                    </p>

                    {/* Read More Button */}
                    <button
                      onClick={(e) => handleReadMore(caseStudy, e)}
                      className="inline-flex items-center gap-2 text-[#CA1411] font-semibold hover:text-[#B0120F] transition-colors duration-300 group/btn"
                    >
                      <span>Read More</span>
                      <svg
                        className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 right-0 w-20 h-20">
                      <svg className="w-full h-full" viewBox="0 0 80 80">
                        <path
                          d="M0,0 L80,0 L80,80 Z"
                          fill="rgba(202, 20, 17, 0.1)"
                          className="transition-all duration-500"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button - Mobile - Only show if showViewAllButton is true */}
          {showViewAllButton && (
            <div className="text-center mt-6 sm:mt-8 md:hidden">
              <a
                href="/explore/case-studies"
                className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-[#CA1411] hover:bg-[#B0120F] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 relative z-10 text-sm sm:text-base"
                style={{ color: '#ffffff' }}
              >
                <span style={{ color: '#ffffff' }}>View All Case Studies</span>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 transform transition-transform duration-300 hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  style={{ color: '#ffffff' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>
            </div>
          )}

          {/* View All Button - Desktop - Only show if showViewAllButton is true */}
          {showViewAllButton && (
            <div className="hidden md:flex justify-center mt-10 md:mt-12 lg:mt-16">
              <a
                href="/explore/case-studies"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#CA1411] hover:bg-[#B0120F] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 relative z-10"
                style={{ color: '#ffffff' }}
              >
                <span style={{ color: '#ffffff' }}>View All Case Studies</span>
                <svg
                  className="w-5 h-5 transform transition-transform duration-300 hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  style={{ color: '#ffffff' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        caseStudy={selectedCaseStudy}
      />
    </section>
  );
};

export default CaseStudiesSection;


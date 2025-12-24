import React from 'react';
import { certificatesData, certificatesSectionConfig, type Certificate } from './certificatesData';
import DotGrid from './DotGrid';

interface CertificatesSectionProps {
  certificates?: Certificate[];
  title?: string;
  subtitle?: string;
  showYear?: boolean;
  showDescription?: boolean;
}

const CertificatesSection: React.FC<CertificatesSectionProps> = ({
  certificates = certificatesData,
  title = certificatesSectionConfig.title,
  subtitle = certificatesSectionConfig.subtitle,
  showYear = certificatesSectionConfig.showYear,
  showDescription = certificatesSectionConfig.showDescription,
}) => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden">
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
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="inline-block mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm md:text-base font-semibold text-[#CA1411] uppercase tracking-wider">
              Certifications
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 leading-[1.1] sm:leading-tight px-4 sm:px-0">
            <span className="text-[#CA1411] relative">
              {title}
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#CA1411]/10 -z-10 transform -skew-x-12" />
            </span>
          </h2>
          {subtitle && (
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {certificates.map((certificate, index) => (
            <div
              key={certificate.id}
              className="relative group"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div
                className="relative rounded-xl sm:rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 ease-out overflow-hidden aspect-[2/3] min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px]"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                }}
              >
                {/* Certificate Image - Fills entire card */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <img
                    src={certificate.image}
                    alt={certificate.alt || `${certificate.name} Certificate`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/400x600/E5E7EB/6B7280?text=${encodeURIComponent(certificate.name)}`;
                    }}
                  />
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-500 rounded-2xl" />

                {/* Certificate Info - Hidden by default, shown on hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 md:p-5 lg:p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <div className="relative z-10">
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white mb-1 sm:mb-2 drop-shadow-lg">
                      {certificate.name}
                    </h3>
                    <div className="space-y-0.5 sm:space-y-1">
                      {certificate.issuer && (
                        <p className="text-xs sm:text-sm text-white/90 drop-shadow-md">
                          {certificate.issuer}
                        </p>
                      )}
                      {showYear && certificate.year && (
                        <p className="text-[10px] sm:text-xs text-white/80 font-medium drop-shadow-md">
                          Year: {certificate.year}
                        </p>
                      )}
                      {showDescription && certificate.description && (
                        <p className="text-[10px] sm:text-xs text-white/80 mt-1 sm:mt-2 leading-relaxed drop-shadow-md line-clamp-2">
                          {certificate.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Decorative badge icon - Top right */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;


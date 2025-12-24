import React from 'react';
import DotGrid from '../commons/DotGrid';

interface BrandLogo {
  name: string;
  logo: string;
  alt?: string;
}

interface BrandShowcaseProps {
  title?: string;
  subtitle?: string;
  brands: BrandLogo[];
}

const BrandShowcase: React.FC<BrandShowcaseProps> = ({
  title = 'Our Clients',
  subtitle = 'People Who Worked With Us',
  brands,
}) => {
  if (!brands || brands.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50 w-full relative overflow-hidden">
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
      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-12 lg:mb-16 max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg md:text-xl text-gray-600">
              {subtitle}
            </p>
          )}
        </div>

        {/* Single moving row (left to right), logos only */}
        <div className="max-w-6xl mx-auto overflow-hidden">
          <style>
            {`
              @keyframes marquee-ltr {
                0% { transform: translateX(-50%); }
                100% { transform: translateX(0%); }
              }
            `}
          </style>
          <div
            className="flex gap-10 items-center"
            style={{
              width: '200%',
              animation: 'marquee-ltr 25s linear infinite',
            }}
          >
            {[...brands, ...brands].map((brand, idx) => (
              <div
                key={`${brand.name}-${idx}`}
                className="flex items-center justify-center p-2 min-w-[180px]"
              >
                <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 flex items-center justify-center">
                  <img
                    src={brand.logo}
                    alt={brand.alt || `${brand.name} Logo`}
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const fallback = `https://via.placeholder.com/220x110/E5E7EB/6B7280?text=${encodeURIComponent(brand.name)}`;
                      target.src = fallback;
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;


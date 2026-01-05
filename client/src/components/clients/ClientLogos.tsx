import React from 'react';
import DotGrid from '../commons/DotGrid';

interface ClientLogo {
  name: string;
  logo: string;
  alt?: string;
}

interface ClientLogosProps {
  className?: string;
}

// Your full list of 19 logos
const clientLogos: ClientLogo[] = [
    {
      name: 'Amazon',
      logo: '/logos/Amazon.png',
      alt: 'Amazon Logo',
    },
    {
      name: 'HCL',
      logo: '/logos/HCL.png',
      alt: 'HCL Logo',
    },
    {
      name: 'Meesho',
      logo: '/logos/Meesho.png',
      alt: 'Meesho Logo',
    },
    {
      name: 'Siemens',
      logo: '/logos/Siemens.png',
      alt: 'Siemens Logo',
    },
    {
      name: 'Progress',
      logo: '/logos/Progress.png',
      alt: 'Progress Logo',
    },
    {
      name: 'Dassault Systemes',
      logo: '/logos/Dassaultsystemes.png',
      alt: 'Dassault Systemes Logo',
    },
    {
      name: 'Matchpoint GPS',
      logo: '/logos/Matchpoint.png',
      alt: 'Matchpoint GPS Logo',
    },
    {
      name: 'Shopee',
      logo: '/logos/Shopee.png',
      alt: 'Shopee Logo',
    },
    {
      name: 'Indraprastha Gas Limited',
      logo: '/logos/indraprasthagaslimited.png',
      alt: 'Indraprastha Gas Limited Logo',
    },
    {
      name: 'Avaya',
      logo: '/logos/Avaya.png',
      alt: 'Avaya Logo',
    },
    {
      name: 'Tata Tele Business Service',
      logo: '/logos/TATA.png',
      alt: 'Tata Tele Business Service Logo',
    },
    {
      name: 'Snapdeal',
      logo: '/logos/Snapdeal.png',
      alt: 'Snapdeal Logo',
    },
    {
      name: 'ICRA',
      logo: '/logos/ICRA.png',
      alt: 'ICRA Logo',
    },
    {
      name: 'NIIT',
      logo: '/logos/NIIT.png',
      alt: 'NIIT Logo',
    },
  ];

const ClientLogos: React.FC<ClientLogosProps> = ({ className = '' }) => {
  // Split logos into two groups - upper and lower rows
  const midPoint = Math.ceil(clientLogos.length / 2);
  const upperRowLogos = clientLogos.slice(0, midPoint);
  const lowerRowLogos = clientLogos.slice(midPoint);

  // Duplicate logos multiple times for seamless infinite scroll
  // We need enough duplicates to cover screen width + some buffer
  const duplicatedUpperLogos = Array(3)
    .fill(0)
    .flatMap(() => upperRowLogos);
  
  const duplicatedLowerLogos = Array(3)
    .fill(0)
    .flatMap(() => lowerRowLogos);

  return (
    <section className={`py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50 w-full relative overflow-hidden ${className}`}>
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
      
      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-[1.2] sm:leading-tight">
            The World's Most Innovative Companies Use{' '}
            <span className="text-[#CA1411]">Navigant Technologies</span>
          </h2>
        </div>

        {/* Two continuous infinite scrolling rows */}
        <div className="space-y-6 md:space-y-8">
          {/* Upper Row: Scroll Right to Left - First half of logos */}
          <div className="overflow-hidden relative">
            <div className="flex animate-scroll-left">
              {/* First set of logos */}
              {duplicatedUpperLogos.map((client, index) => (
                <div
                  key={`upper-1-${index}`}
                  className="flex-shrink-0 flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 group"
                  style={{ minWidth: '140px' }}
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <img
                      src={client.logo}
                      alt={client.alt || `${client.name} Logo`}
                      className="max-h-full max-w-full object-contain opacity-100 hover:opacity-90 transition-opacity"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const fallback = `https://via.placeholder.com/160x80/E5E7EB/6B7280?text=${encodeURIComponent(client.name)}`;
                        target.src = fallback;
                      }}
                    />
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {duplicatedUpperLogos.map((client, index) => (
                <div
                  key={`upper-2-${index}`}
                  className="flex-shrink-0 flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 group"
                  style={{ minWidth: '140px' }}
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <img
                      src={client.logo}
                      alt={client.alt || `${client.name} Logo`}
                      className="max-h-full max-w-full object-contain opacity-100 hover:opacity-90 transition-opacity"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const fallback = `https://via.placeholder.com/160x80/E5E7EB/6B7280?text=${encodeURIComponent(client.name)}`;
                        target.src = fallback;
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lower Row: Scroll Left to Right - Second half of logos */}
          <div className="overflow-hidden relative">
            <div className="flex animate-scroll-right">
              {/* First set of logos */}
              {duplicatedLowerLogos.map((client, index) => (
                <div
                  key={`lower-1-${index}`}
                  className="flex-shrink-0 flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 group"
                  style={{ minWidth: '140px' }}
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <img
                      src={client.logo}
                      alt={client.alt || `${client.name} Logo`}
                      className="max-h-full max-w-full object-contain opacity-100 hover:opacity-90 transition-opacity"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const fallback = `https://via.placeholder.com/160x80/E5E7EB/6B7280?text=${encodeURIComponent(client.name)}`;
                        target.src = fallback;
                      }}
                    />
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {duplicatedLowerLogos.map((client, index) => (
                <div
                  key={`lower-2-${index}`}
                  className="flex-shrink-0 flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 group"
                  style={{ minWidth: '140px' }}
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <img
                      src={client.logo}
                      alt={client.alt || `${client.name} Logo`}
                      className="max-h-full max-w-full object-contain opacity-100 hover:opacity-90 transition-opacity"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const fallback = `https://via.placeholder.com/160x80/E5E7EB/6B7280?text=${encodeURIComponent(client.name)}`;
                        target.src = fallback;
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
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

// Your full list of 18 logos
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
      name: 'Dassault Systemes',
      logo: '/logos/Dassaultsystemes.png',
      alt: 'Dassault Systemes Logo',
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
    {
      name: 'Stratasys',
      logo: '/logos/stratasys.png',
      alt: 'Stratasys Logo',
    },
    {
      name: 'GEM',
      logo: '/logos/gem.png',
      alt: 'GEM Logo',
    },
    {
      name: 'Intellect Design',
      logo: '/logos/intellectdesign.png',
      alt: 'Intellect Design Logo',
    },
    {
      name: 'Shine',
      logo: '/logos/shine.png',
      alt: 'Shine Logo',
    },
    {
      name: 'Redington',
      logo: '/logos/redington.png',
      alt: 'Redington Logo',
    },
    {
      name: 'DHBVN',
      logo: '/logos/dhbvn.png',
      alt: 'DHBVN Logo',
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
    <section className={`pt-6 md:pt-8 lg:pt-8 pb-2 md:pb-3 lg:pb-2 bg-white w-full relative overflow-hidden ${className}`}>
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
        <div className="text-center mb-0 max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-0 leading-[1.2] sm:leading-tight">
            The World's Most Innovative Companies Use{' '}
            <span className="text-[#CA1411]">Navigant </span>
            <span className="text-[#CA1411] relative">
              Technologies
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#CA1411]/10 -z-10 transform -skew-x-12" />
            </span>
          </h2>
        </div>

        {/* Two continuous infinite scrolling rows */}
        <div className="space-y-0 -mt-2 sm:-mt-3 md:-mt-4">
          {/* Upper Row: Scroll Right to Left - First half of logos */}
          <div className="overflow-hidden relative">
            <div className="flex animate-scroll-left">
              {/* First set of logos */}
              {duplicatedUpperLogos.map((client, index) => {
                const isIGL = client.name === 'Indraprastha Gas Limited';
                return (
                  <div
                    key={`upper-1-${index}`}
                    className="flex-shrink-0 flex items-center justify-center px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 group"
                    style={{ minWidth: isIGL ? '140px' : '100px' }}
                  >
                    <div className={`${isIGL ? 'w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64' : 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32'} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
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
                );
              })}
              {/* Duplicate set for seamless loop */}
              {duplicatedUpperLogos.map((client, index) => {
                const isIGL = client.name === 'Indraprastha Gas Limited';
                return (
                  <div
                    key={`upper-2-${index}`}
                    className="flex-shrink-0 flex items-center justify-center px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 group"
                    style={{ minWidth: isIGL ? '140px' : '100px' }}
                  >
                    <div className={`${isIGL ? 'w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64' : 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32'} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
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
                );
              })}
            </div>
          </div>

          {/* Lower Row: Scroll Left to Right - Second half of logos */}
          <div className="overflow-hidden relative -mt-8 md:-mt-12 lg:-mt-16">
            <div className="flex animate-scroll-right">
              {/* First set of logos */}
              {duplicatedLowerLogos.map((client, index) => {
                const isIGL = client.name === 'Indraprastha Gas Limited';
                return (
                  <div
                    key={`lower-1-${index}`}
                    className="flex-shrink-0 flex items-center justify-center px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 group"
                    style={{ minWidth: isIGL ? '140px' : '100px' }}
                  >
                    <div className={`${isIGL ? 'w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64' : 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32'} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
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
                );
              })}
              {/* Duplicate set for seamless loop */}
              {duplicatedLowerLogos.map((client, index) => {
                const isIGL = client.name === 'Indraprastha Gas Limited';
                return (
                  <div
                    key={`lower-2-${index}`}
                    className="flex-shrink-0 flex items-center justify-center px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 group"
                    style={{ minWidth: isIGL ? '140px' : '100px' }}
                  >
                    <div className={`${isIGL ? 'w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64' : 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32'} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
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
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
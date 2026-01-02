import React, { useState, useEffect } from 'react';
import ServiceCard from '../commons/ServiceCard';
import DotGrid from '../commons/DotGrid';

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  icon?: string;
  iconPath?: string;
}

const ServicesSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Check on mount
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Services data matching the dropdown services
  // Priority services appear first: BPO, Lead Generation, Ecommerce Management, End to End Sales
  const services: Service[] = [
    {
      id: '2',
      name: 'BPO Services',
      slug: 'bpo-services',
      description: 'Comprehensive Business Process Outsourcing services to help you focus on core business activities.',
      shortDescription: 'End-to-end BPO solutions designed to optimize your business processes and reduce costs.',
    },
    {
      id: '11',
      name: 'Lead Generation',
      slug: 'lead-generation',
      description: 'Professional lead generation services to identify, qualify, and convert prospects into customers.',
      shortDescription: 'Data-driven lead generation strategies to grow your sales pipeline.',
    },
    {
      id: '10',
      name: 'Ecommerce Management',
      slug: 'ecommerce-management',
      description: 'Complete ecommerce management services including order processing, inventory management, and customer support.',
      shortDescription: 'End-to-end ecommerce solutions to streamline your online business operations.',
    },
    {
      id: '12',
      name: 'End to End Sales',
      slug: 'end-to-end-sales',
      description: 'Comprehensive end-to-end sales services from lead qualification to closing deals and customer retention.',
      shortDescription: 'Complete sales solutions to drive revenue growth and customer satisfaction.',
    },
    {
      id: '1',
      name: 'Digital Workers',
      slug: 'digital-workers',
      description: 'Leverage AI-powered digital workers to automate your business processes and increase efficiency.',
      shortDescription: 'AI-powered automation solutions that transform your workforce and streamline operations.',
    },
    {
      id: '3',
      name: 'Healthcare Services',
      slug: 'healthcare-services',
      description: 'Specialized healthcare BPO services including medical billing, coding, and patient support.',
      shortDescription: 'Dedicated healthcare outsourcing services to support medical practices and facilities.',
    },
    {
      id: '4',
      name: 'Tata Tele Services',
      slug: 'tata-tele-services',
      description: 'Connectivity, collaboration, cloud, and security solutions from TTBS.',
      shortDescription: 'ICT solutions for resilient, secure, and scalable operations.',
    },
    {
      id: '5',
      name: 'Market Research',
      slug: 'market-research',
      description: 'Comprehensive market research and analytics services to drive informed business decisions.',
      shortDescription: 'Data-driven market insights and research services to guide your strategic decisions.',
    },
    {
      id: '6',
      name: 'HR Services',
      slug: 'hr-services',
      description: 'Human Resources outsourcing services including recruitment, payroll, and employee management.',
      shortDescription: 'Complete HR solutions to manage your workforce efficiently and effectively.',
    },
    {
      id: '7',
      name: 'Finance & Accounting',
      slug: 'finance-accounting',
      description: 'Professional finance and accounting services including bookkeeping, tax preparation, and financial analysis.',
      shortDescription: 'Expert financial management and accounting services for your business growth.',
    },
    {
      id: '8',
      name: 'IT Services',
      slug: 'it-services',
      description: 'Comprehensive IT services including infrastructure management, cloud solutions, and technical support.',
      shortDescription: 'End-to-end IT solutions to drive your business forward with cutting-edge technology.',
    },
    {
      id: '9',
      name: 'Digital Marketing',
      slug: 'digital-marketing',
      description: 'Digital marketing services including SEO, social media marketing, and content creation.',
      shortDescription: 'Strategic digital marketing solutions to grow your online presence and reach.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-gradient-to-b from-white via-gray-50/50 to-white w-full relative overflow-hidden">
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
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-14 md:mb-16 lg:mb-20 xl:mb-24">
          <div className="inline-block mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm md:text-base font-semibold text-[#CA1411] uppercase tracking-wider">
              What We Offer
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 leading-[1.1] sm:leading-tight px-4 sm:px-0">
            Our <span className="text-[#CA1411] relative">
              Services
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#CA1411]/10 -z-10 transform -skew-x-12"></span>
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Comprehensive solutions designed to transform your business and drive sustainable growth
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
          {/* Show only 4 services on mobile, all on larger screens */}
          {(isMobile ? services.slice(0, 4) : services).map((service, index) => (
            <div
              key={service.id}
              className="service-card-wrapper"
              style={{
                animationDelay: `${index * 0.08}s`,
              }}
            >
              <ServiceCard
                service={{
                  id: service.id,
                  title: service.name,
                  name: service.name,
                  shortDescription: service.shortDescription,
                  description: service.description,
                  slug: service.slug,
                  iconPath: service.iconPath,
                }}
                index={index}
                variant="default"
              />
            </div>
          ))}
        </div>

        {/* View All Button - Mobile Only */}
        {isMobile && (
          <div className="flex justify-center mt-8">
            <a
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#CA1411] hover:bg-[#B0120F] font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              style={{ color: '#ffffff' }}
            >
              <span style={{ color: '#ffffff' }}>View All</span>
              <svg
                className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
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
    </section>
  );
};

export default ServicesSection;


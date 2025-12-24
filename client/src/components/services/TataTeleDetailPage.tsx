import React, { Suspense, useMemo, useRef, useState } from 'react';
import type { ServiceData, HeroSlide as HeroSlideType } from './serviceTypes';
import ServiceHero from './ServiceHero';
import BrandShowcase from './BrandShowcase';
import { lazyWithDelay } from '../../utils/lazyWithDelay';
import Masonry from '../commons/Masonry';
import type { MasonryItem } from '../commons/Masonry';
import DotGrid from '../commons/DotGrid';

const ServiceCategorySection = lazyWithDelay(() => import('./ServiceCategorySection'));
const ServiceDetailSection = lazyWithDelay(() => import('./ServiceDetailSection'));
const TestimonialsSection = lazyWithDelay(() => import('./TestimonialsSection'));
const ContactFormSection = lazyWithDelay(() => import('./ContactFormSection'));

const ShimmerSection = () => (
  <div className="py-12 md:py-16 lg:py-20">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="h-64 bg-gray-100 rounded-2xl animate-pulse"></div>
    </div>
  </div>
);

interface TataTeleDetailPageProps {
  serviceData: ServiceData;
}

const TataTeleDetailPage: React.FC<TataTeleDetailPageProps> = ({ serviceData }) => {
  const heroSlides: HeroSlideType[] | undefined = serviceData.heroSlides?.map((slide) => ({
    id: slide.id,
    title: slide.title,
    subtitle: slide.subtitle,
    image: slide.image,
    imageAlt: slide.imageAlt,
    primaryButton: {
      text: 'Connect With Us',
      href: '/contact',
    },
    // secondaryButton: {
    //   text: 'Watch Video',
    //   href: '#',
    // },
  }));

  const tataIndustries = useMemo(
    () => [
      {
        id: 'telecom',
        title: 'Telecom, Media & Entertainment',
        icon: '🎬',
        description:
          'Ensure always-on availability, effortless scaling-up, and elevate user experience with innovative solutions.',
      },
      {
        id: 'retail',
        title: 'Retail',
        icon: '🛍️',
        description: 'Drive seamless omni-channel retail with secure connectivity and intelligent cloud-based solutions.',
      },
      {
        id: 'bfsi',
        title: 'BFSI',
        icon: '💳',
        description:
          'Secure digital capabilities to make your customer experience smart, secure, and efficient - anytime, anywhere.',
      },
      {
        id: 'it-ites',
        title: 'IT/ITeS',
        icon: '💻',
        description:
          'Rethink operations for seamless & secure collaboration in the right technology to pivot to a future-ready digital workplace.',
      },
      {
        id: 'services',
        title: 'Services',
        icon: '🤝',
        description:
          'Leverage best-in-class connectivity & marketing solutions to garner customer loyalty to reach new heights.',
      },
      {
        id: 'education',
        title: 'Education',
        icon: '🎓',
        description:
          'Digitalise education with intuitive collaboration tools, web conferencing apps, robust cybersecurity systems and more.',
      },
      {
        id: 'healthcare',
        title: 'Healthcare',
        icon: '🏥',
        description:
          'Adopt from a range of digital solutions to manage patient engagement and access in a secure and reliable way.',
      },
    ],
    []
  );

  const [industryIndex, setIndustryIndex] = useState(0);
  const [showAllServices, setShowAllServices] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const servicesSectionRef = useRef<HTMLDivElement>(null);
  const faqItems = [
    {
       id: 'experience',
       title: 'Years of Experience',
       content:
         'Over 25+ years of experience in delivering and delighting enterprises with pioneering products and solutions.',
     },
     {
       id: 'portfolio',
       title: 'Comprehensive Portfolio',
       content:
         'One of the most comprehensive portfolio of ICT solutions spanning connectivity, collaboration, cloud, SaaS, security, IoT and marketing solutions.',
     },
     {
       id: 'operations',
       title: 'Operations in India',
       content: 'Operations in over 60 cities in India.',
     },
     {
       id: 'trusted',
       title: '100% Trusted',
       content: 'One of the widest reach in enterprise segment, through 1500+ partners across geographies.',
     },
   ];
 const totalIndustries = tataIndustries.length;
 const stepIndustry = (dir: 1 | -1) => {
   setIndustryIndex((prev) => (prev + dir + totalIndustries) % totalIndustries);
 };
 const aboutImage = '/solutions.webp';
 const hasAboutImage = !!aboutImage;
 const whyImage = '/wahl.webp';
 const hasWhyImage = !!whyImage;

  const serviceMasonryItems: MasonryItem[] = [
    { id: 'smart-office', label: 'Smart Office', height: 360, background: 'linear-gradient(135deg,#CA1411,#ff7043)' },
    { id: 'zoom', label: 'Zoom', height: 320, background: 'linear-gradient(135deg,#0f172a,#334155)' },
    { id: 'm365', label: 'Microsoft 365', height: 360, background: 'linear-gradient(135deg,#2563eb,#1e40af)' },
    { id: 'smart-flo', label: 'Smart Flo', height: 300, background: 'linear-gradient(135deg,#9333ea,#7c3aed)' },
    { id: 'azure', label: 'Microsoft Azure', height: 380, background: 'linear-gradient(135deg,#0ea5e9,#0284c7)' },
    { id: 'cdn', label: 'Content Delivery Network', height: 340, background: 'linear-gradient(135deg,#111827,#6b7280)' },
    { id: 'conferencing', label: 'Conferencing', height: 320, background: 'linear-gradient(135deg,#f59e0b,#d97706)' },
    { id: 'bridging', label: 'International Bridging', height: 360, background: 'linear-gradient(135deg,#312e81,#4c1d95)' },
    { id: 'webcasting', label: 'Webcasting Services', height: 320, background: 'linear-gradient(135deg,#0f766e,#115e59)' },
    { id: 'smart-internet', label: 'Smart Internet', height: 360, background: 'linear-gradient(135deg,#2563eb,#0ea5e9)' },
    { id: 'dawan', label: 'DA-WAN iFLX', height: 300, background: 'linear-gradient(135deg,#1f2937,#111827)' },
    { id: 'smart-vpn', label: 'Smart VPN - MPLS', height: 360, background: 'linear-gradient(135deg,#6d28d9,#4c1d95)' },
    { id: 'ez-cloud', label: 'EZ Cloud Connect', height: 320, background: 'linear-gradient(135deg,#14b8a6,#0d9488)' },
    { id: 'leased-line', label: 'Leased Line - P2P', height: 360, background: 'linear-gradient(135deg,#374151,#1f2937)' },
    { id: 'wifi', label: 'Tata Tele WiFi', height: 300, background: 'linear-gradient(135deg,#f97316,#ea580c)' },
    { id: 'ultra-lola', label: 'Ultra Lola', height: 320, background: 'linear-gradient(135deg,#0f172a,#1e293b)' },
    { id: 'broadband', label: 'Business Broadband', height: 340, background: 'linear-gradient(135deg,#dc2626,#b91c1c)' },
    { id: 'centrex', label: 'Centrex', height: 320, background: 'linear-gradient(135deg,#be123c,#9f1239)' },
    { id: 'pri', label: 'PRI', height: 300, background: 'linear-gradient(135deg,#111827,#4b5563)' },
    { id: 'sip', label: 'SIP Trunk', height: 320, background: 'linear-gradient(135deg,#0ea5e9,#0284c7)' },
    { id: 'toll-free', label: 'Toll Free Services', height: 360, background: 'linear-gradient(135deg,#059669,#047857)' },
    { id: 'call-register', label: 'Call Register Services', height: 320, background: 'linear-gradient(135deg,#facc15,#eab308)' },
    { id: 'hosted-ivr', label: 'Hosted IVR', height: 340, background: 'linear-gradient(135deg,#dc2626,#991b1b)' },
    { id: 'hosted-obd', label: 'Hosted OBD Service', height: 320, background: 'linear-gradient(135deg,#312e81,#4338ca)' },
    { id: 'sms', label: 'SMS Solution', height: 320, background: 'linear-gradient(135deg,#2563eb,#4338ca)' },
    { id: 'email-sec', label: 'Email Security', height: 360, background: 'linear-gradient(135deg,#0f172a,#334155)' },
    { id: 'endpoint-sec', label: 'Endpoint Security', height: 320, background: 'linear-gradient(135deg,#4d7c0f,#3f6212)' },
    { id: 'mfa', label: 'Multifactor Authentication', height: 360, background: 'linear-gradient(135deg,#db2777,#be185d)' },
    { id: 'virtual-fw', label: 'Virtual Firewall', height: 320, background: 'linear-gradient(135deg,#1d4ed8,#1e3a8a)' },
    { id: 'web-security', label: 'Web Security', height: 320, background: 'linear-gradient(135deg,#6b21a8,#581c87)' },
  ];

  const testimonials = (serviceData.testimonials && serviceData.testimonials.length > 0) ? serviceData.testimonials : [
    {
      id: '1',
      content: 'Impressive range of data solutions, tailor-made to support growth and resiliency.',
      name: 'Sangram Pattanayak',
      role: '',
      company: '',
    },
    {
      id: '2',
      content: 'TTBS Smartflo has helped us with business continuity and their customer service is outstanding',
      name: 'Atanu Ghosh',
      role: '',
      company: '',
    },
    {
      id: '3',
      content: 'TTBS Voice Services has helped us grow faster and the service is excellent',
      name: 'N K Sinha',
      role: '',
      company: '',
    },
    {
      id: '4',
      content: 'Zoom audio/video functionality and quality is exceptional, while TTBS support is always to be trusted.',
      name: 'Anil Goyal',
      role: '',
      company: '',
    },
  ];

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };


  return (
    <div className="w-full relative">
      {/* Content - All sections */}
      <div className="relative z-10">
      {/* HERO */}
      {heroSlides && heroSlides.length > 0 && (
        <div className="w-full">
          <ServiceHero
            slides={heroSlides}
            autoplay
            autoplayDelay={5000}
            showNavigation={false}
            showPagination={false}
            badgeText={serviceData.name}
          />
        </div>
      )}

      {/* BRAND LOGOS */}
      {serviceData.brandLogos && serviceData.brandLogos.length > 0 && (
        <BrandShowcase title="Our Clients" subtitle="People Who Worked With Us" brands={serviceData.brandLogos} />
      )}

      {/* ABOUT SECTION (unchanged) */}
      {serviceData.aboutSection && (
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
            <div className={`grid gap-10 items-center ${hasAboutImage ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
              <div className="space-y-4">
                <div className="inline-flex px-4 py-2 rounded-full bg-[#CA1411]/10 text-[#CA1411] text-sm font-semibold uppercase tracking-wide">
                  Digital Solution for your Business
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Transforming Businesses through Digitalization
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                  {serviceData.aboutSection.content}
                </p>
              </div>
              {hasAboutImage && (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#CA1411]/15 to-transparent rounded-3xl blur-3xl" />
                  <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
                    <img
                      src={aboutImage}
                      alt="Digital solutions"
                      className="w-full h-full object-cover animate-pulse"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&q=80';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ⭐ UPDATED 3D CAROUSEL BELOW ⭐ */}
      <section className="py-12 md:py-16 lg:py-20 bg-white relative overflow-hidden">
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-flex px-4 py-2 rounded-full bg-[#CA1411]/10 text-[#CA1411] text-sm font-semibold uppercase tracking-wide">
              Our Industry
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              Find Solutions Customized for Your Industry
            </h2>
            <p className="mt-3 text-lg text-gray-600">Tata Tele Business Services are the best in these fields</p>
          </div>

          {/* 3D CONTAINER */}
          <div className="relative h-[420px] sm:h-[460px] flex justify-center items-center">

            {/* LEFT ARROW */}
            <button
              onClick={() => stepIndustry(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-gray-200 bg-white shadow-lg flex items-center justify-center text-[#CA1411] hover:bg-[#CA1411]/10 transition z-40"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* RIGHT ARROW */}
            <button
              onClick={() => stepIndustry(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-gray-200 bg-white shadow-lg flex items-center justify-center text-[#CA1411] hover:bg-[#CA1411]/10 transition z-40"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* 3D STAGE */}
            <div
              className="relative w-full h-full"
              style={{
                perspective: '1400px',
                transformStyle: 'preserve-3d',
              }}
            >
              {tataIndustries.map((item, index) => {
                let rel = (index - industryIndex + totalIndustries) % totalIndustries;
                if (rel > totalIndustries / 2) rel -= totalIndustries;

                if (Math.abs(rel) > 2) return null;

                const depth = 300 - Math.abs(rel) * 120;
                const xShift = rel * 200;
                const rotateY = rel * -15;
                const scale = 1 - Math.abs(rel) * 0.12;
                const opacity = 1 - Math.abs(rel) * 0.25;

                return (
                  <div
                    key={item.id}
                    className="absolute top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2"
                    style={{
                      transform: `
                        translateX(${xShift}px)
                        translateZ(${depth}px)
                        rotateY(${rotateY}deg)
                        scale(${scale})
                      `,
                      opacity,
                      transition: 'transform 0.6s ease, opacity 0.6s ease',
                      zIndex: 1000 - Math.abs(rel),
                    }}
                  >
                    <div
                      className="rounded-3xl border border-[#CA1411] shadow-xl p-6 md:p-7 text-white"
                      style={{
                        background: '#CA1411',
                        color: '#FFFFFF',
                      }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-white/15 text-white text-xl font-semibold">
                          {item.icon}
                        </div>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-white/90 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us (Tata-only) */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
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
          {/* Centered Header */}
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-flex px-4 py-2 rounded-full bg-[#CA1411]/10 text-[#CA1411] text-sm font-semibold uppercase tracking-wide mb-4">
              Why Choose Us
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Bringing the Best Technology and Services
            </h2>
          </div>

          {/* Image + Intro + FAQ grid */}
          <div
            className={`grid gap-8 lg:gap-12 items-start ${
              hasWhyImage ? 'md:grid-cols-2 md:auto-rows-min' : 'md:grid-cols-1 max-w-4xl mx-auto'
            }`}
          >
            {hasWhyImage && (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#CA1411]/15 to-transparent rounded-3xl blur-3xl" />
                <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                  <img
                    src={whyImage}
                    alt="Why Choose Us"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&q=80';
                    }}
                  />
                </div>
              </div>
            )}

            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Tata Tele Business Services, with its pioneering spirit of innovation and distinctive customer value
                proposition, provides solutions that allow enterprises to be resilient, maintain business continuity, and
                grow in a flexible, scalable, and secure manner.
              </p>

              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5 md:p-6">
                <h3 className="text-lg font-semibold text-[#CA1411] mb-3">Overview</h3>
                <p className="text-gray-700 leading-relaxed">
                  Tata Tele Business Services is focused on democratising cutting-edge technology for businesses and
                  providing them with solutions that significantly impact their competitiveness, enabling them to become
                  future-ready and "Do Big."
                </p>
              </div>
            </div>

            {/* FAQs full width to avoid empty space */}
            <div className="space-y-4 md:col-span-2">
              <h1 className="text-center text-2xl font-bold text-[#CA1411]">FAQs</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {faqItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5 md:p-6 transition-all duration-200 hover:shadow-md space-y-2"
                  >
                    <div className="text-base font-semibold text-[#CA1411]">{item.title}</div>
                    <p className="text-gray-700 text-sm leading-relaxed">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Masonry */}
      <section ref={servicesSectionRef} className="py-14 md:py-18 lg:py-20 bg-white relative overflow-hidden">
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
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-flex px-4 py-2 rounded-full bg-[#CA1411]/10 text-[#CA1411] text-sm font-semibold uppercase tracking-wide mb-4">
              Our Services
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Services Crafted to Take Your Business Ahead
            </h2>
            <p className="mt-3 text-lg text-gray-700 max-w-3xl mx-auto">
              Find tailored solutions for your collaboration, communication, & connectivity needs with services that push
              the limits & unfold new possibilities.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4 sm:p-6 lg:p-8 shadow-sm">
            <Masonry
              items={showAllServices ? serviceMasonryItems : serviceMasonryItems.slice(0, Math.ceil(serviceMasonryItems.length / 2))}
              ease="power3.out"
              duration={0.6}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover
              hoverScale={0.97}
              blurToFocus
              colorShiftOnHover={false}
            />
          </div>
          <div className="text-center mt-8">
            {!showAllServices ? (
              <button
                onClick={() => setShowAllServices(true)}
                className="inline-flex items-center px-8 py-4 bg-[#CA1411] text-white font-semibold rounded-lg transition-all duration-300 hover:bg-[#A0100E] hover:shadow-lg hover:-translate-y-0.5"
              >
                View More
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            ) : (
              <button
                onClick={(e) => {
                  const buttonElement = e.currentTarget;
                  const buttonPosition = buttonElement.getBoundingClientRect().top + window.scrollY;
                  
                  setShowAllServices(false);
                  
                  // Smooth scroll after animation completes (600ms duration + stagger)
                  setTimeout(() => {
                    if (servicesSectionRef.current) {
                      const sectionTop = servicesSectionRef.current.getBoundingClientRect().top + window.scrollY;
                      // Scroll to maintain button position or section top, whichever is higher
                      const targetPosition = Math.min(buttonPosition, sectionTop);
                      
                      window.scrollTo({
                        top: Math.max(0, targetPosition - 120),
                        behavior: 'smooth'
                      });
                    }
                  }, 700);
                }}
                className="inline-flex items-center px-8 py-4 bg-[#CA1411] text-white font-semibold rounded-lg transition-all duration-300 hover:bg-[#A0100E] hover:shadow-lg hover:-translate-y-0.5"
              >
                View Less
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-flex px-4 py-2 rounded-full bg-[#CA1411]/10 text-[#CA1411] text-sm font-semibold uppercase tracking-wide mb-4">
              Testimonial
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Our Customers Feedback
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to your success! Here's what our customers have to say...
            </p>
          </div>

          {/* Testimonials Slider - 1 Card at a time */}
          {testimonials && testimonials.length > 0 ? (
            <div className="relative max-w-4xl mx-auto">
              {/* Left Arrow */}
              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 rounded-full bg-purple-100 hover:bg-purple-200 flex items-center justify-center text-white transition shadow-md z-10"
                aria-label="Previous testimonial"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Cards Container */}
              <div className="overflow-hidden px-4">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}>
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="flex-shrink-0 w-full px-4"
                    >
                      <div className="group relative rounded-2xl shadow-lg p-6 md:p-8 transition-all duration-300 h-full flex flex-col bg-[#CA1411] text-white">
                        {/* Profile Picture */}
                        <div className="flex justify-center mb-5">
                          {testimonial.avatar ? (
                            <img
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              className="w-20 h-20 rounded-full object-cover border-4 border-white/30 shadow-md"
                            />
                          ) : (
                            <div className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-2xl border-4 border-white/30 shadow-md bg-white/20 text-white">
                              {testimonial.name.charAt(0)}
                            </div>
                          )}
                        </div>

                        {/* Name */}
                        <h4 className="text-center font-bold text-lg md:text-xl mb-5 text-white">
                          {testimonial.name}
                        </h4>

                        {/* Testimonial Content */}
                        <p className="text-center text-sm md:text-base leading-relaxed flex-grow text-white/90">
                          {testimonial.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Arrow */}
              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 rounded-full bg-purple-100 hover:bg-purple-200 flex items-center justify-center text-white transition shadow-md z-10"
                aria-label="Next testimonial"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No testimonials available at the moment.
            </div>
          )}
        </div>
      </section>

      {/* REMAINING SECTIONS (unchanged) */}
      {serviceData.serviceCategories && serviceData.serviceCategories.length > 0 && (
        <Suspense fallback={<ShimmerSection />}>
          <ServiceCategorySection categories={serviceData.serviceCategories} />
        </Suspense>
      )}

      {serviceData.detailSections && serviceData.detailSections.length > 0 && (
        <Suspense fallback={<ShimmerSection />}>
          <div className="w-full space-y-0">
            {serviceData.detailSections.map((section, index) => (
              <ServiceDetailSection key={section.id} section={section} index={index} variant="alternate" />
            ))}
          </div>
        </Suspense>
      )}

      {serviceData.additionalServices && serviceData.additionalServices.length > 0 && (
        <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-block mb-4">
                <span className="text-sm md:text-base font-semibold text-[#CA1411] uppercase tracking-wider">
                  Additional Services
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                More{' '}
                <span className="text-[#CA1411] relative">
                  Solutions
                  <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#CA1411]/10 -z-10 transform -skew-x-12" />
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Explore our comprehensive range of additional services designed to support your business needs.
              </p>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 lg:gap-8">
               {serviceData.additionalServices.map((service, index) => (
                 <div key={service.id} className="service-card-wrapper">
                   <ServiceDetailSection section={service} index={index} variant="alternate" />
                 </div>
               ))}
             </div>
          </div>
        </section>
      )}

      {serviceData.testimonials && serviceData.testimonials.length > 0 && (
        <Suspense fallback={<ShimmerSection />}>
          <TestimonialsSection testimonials={serviceData.testimonials} />
        </Suspense>
      )}

      {serviceData.cta && (
        <>
          {serviceData.cta.showForm ? (
            <Suspense fallback={<ShimmerSection />}>
              <ContactFormSection title={serviceData.cta.title} subtitle={serviceData.cta.description} />
            </Suspense>
          ) : (
            <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#CA1411] to-[#CA1411] relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
              </div>
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
                <div className="text-center">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    {serviceData.cta.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
                    {serviceData.cta.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                      href={serviceData.cta.primaryButton.href}
                      className="inline-block px-8 py-4 bg-white text-[#CA1411] font-semibold rounded-lg transition-all duration-300 text-center shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:bg-gray-50 text-base md:text-lg"
                    >
                      {serviceData.cta.primaryButton.text}
                    </a>
                    {serviceData.cta.secondaryButton && (
                      <a
                        href={serviceData.cta.secondaryButton.href}
                        className="inline-block px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-[#CA1411] font-semibold rounded-lg transition-all duration-300 text-center shadow-md hover:shadow-lg hover:-translate-y-0.5 text-base md:text-lg"
                      >
                        {serviceData.cta.secondaryButton.text}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
      </div>
      {/* End of Content */}
    </div>
  );
};

export default TataTeleDetailPage;

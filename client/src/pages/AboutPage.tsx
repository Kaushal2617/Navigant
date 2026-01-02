import React, { useState, useEffect } from 'react';
import AppLayout from '../components/layout/AppLayout';
import DotGrid from '../components/commons/DotGrid';

const AboutPage: React.FC = () => {
  const [readMore, setReadMore] = useState(false);
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    employees: 0,
    locations: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const targetValue = parseInt(target.dataset.target || '0');
            const duration = 2000;
            const increment = targetValue / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
              current += increment;
              if (current >= targetValue) {
                current = targetValue;
                clearInterval(timer);
              }

              const key = target.dataset.key as keyof typeof counters;
              setCounters((prev) => ({
                ...prev,
                [key]: Math.floor(current),
              }));
            }, 16);
          }
        });
      },
      { threshold: 0.5 }
    );

    const elements = document.querySelectorAll('[data-target]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <AppLayout>
      <section className="relative pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-20 bg-gradient-to-br from-white via-gray-50/50 to-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
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
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-4">
              <span className="text-sm md:text-base font-semibold text-[#CA1411] uppercase tracking-wider">
                About Navigant
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Our{' '}
              <span className="text-[#CA1411] relative">
                Story
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#CA1411]/10 -z-10 transform -skew-x-12" />
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Navigant's vision is to be the undisputed choice for companies looking to maximize their revenue through outsourced operations that deploy the right mix of technology and human resources.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div
              className="relative rounded-3xl p-8 md:p-10 bg-white border border-gray-100 shadow-xl"
              style={{
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Navigant Technologies{' '}
                <span className="text-[#CA1411]">Private Limited</span>
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Navigant Technologies Private Limited (NTPL) is a global outsourcing firm headquartered in New Delhi, India. It was founded in 2003 with a single mission of delivering high quality services for clients looking to outsource their business operations.
                </p>
                {readMore ? (
                  <>
                    <p>
                      Its dedicated team of over 600 professionals cater to a complete range of BPO & KPO services for its clients spread across UK, USA, Canada and India. The BPO currently employees 600 people at a 55,000 sq. ft. facility located in New Delhi.
                    </p>
                    <button
                      onClick={() => setReadMore(false)}
                      className="text-[#CA1411] font-semibold hover:underline mt-4 inline-flex items-center gap-2"
                    >
                      Read Less
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setReadMore(true)}
                    className="text-[#CA1411] font-semibold hover:underline mt-4 inline-flex items-center gap-2"
                  >
                    Read More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#CA1411]/10 to-transparent rounded-3xl transform rotate-3"></div>
              <div
                className="relative rounded-3xl p-8 md:p-10 bg-white border border-gray-100 shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(202, 20, 17, 0.05), rgba(255, 255, 255, 0.95))',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                }}
              >
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#CA1411]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-[#CA1411]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Headquarters</h3>
                      <p className="text-gray-600">New Delhi, India</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#CA1411]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-[#CA1411]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Founded</h3>
                      <p className="text-gray-600">2003</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#CA1411]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-[#CA1411]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Team Size</h3>
                      <p className="text-gray-600">600+ Professionals</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#CA1411]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-[#CA1411]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Facility</h3>
                      <p className="text-gray-600">55,000 sq. ft. in New Delhi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
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
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Our{' '}
              <span className="text-[#CA1411] relative">
                Achievements
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#CA1411]/10 -z-10 transform -skew-x-12" />
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { key: 'projects', value: counters.projects, label: 'Projects Done', icon: '📊', target: 500 },
              { key: 'clients', value: counters.clients, label: 'Happy Clients', icon: '😊', target: 50 },
              { key: 'employees', value: counters.employees, label: 'Employees', icon: '👥', target: 600 },
              { key: 'locations', value: counters.locations, label: 'Number Of Locations', icon: '📍', target: 3 },
            ].map((stat) => (
              <div
                key={stat.key}
                data-target={stat.target}
                data-key={stat.key}
                className="group relative rounded-2xl p-6 md:p-8 bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 text-center"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                }}
              >
                <div className="text-4xl md:text-5xl mb-4">{stat.icon}</div>
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#CA1411] mb-2">
                  {stat.value}+
                </div>
                <p className="text-gray-600 font-semibold text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm md:text-base font-semibold text-[#CA1411] uppercase tracking-wider">
                Leadership
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Meet Our{' '}
              <span className="text-[#CA1411] relative">
                Founder
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#CA1411]/10 -z-10 transform -skew-x-12" />
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#CA1411]/20 to-transparent rounded-3xl transform -rotate-3"></div>
              <div
                className="relative rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-xl"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                }}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src="/team-assets/ankur2.jpg"
                    alt="Ankur Bhatia - Founder and CEO"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/400x400/CA1411/FFFFFF?text=${encodeURIComponent('Ankur Bhatia')}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
                    <div className="text-center text-white p-8 w-full">
                      <h3 className="text-3xl md:text-4xl font-bold mb-2">Ankur Bhatia</h3>
                      <p className="text-xl text-white/90">Founder and CEO</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="relative rounded-3xl p-8 md:p-10 bg-white border border-gray-100 shadow-xl"
              style={{
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              }}
            >
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  Navigant's founder and CEO, <span className="font-semibold text-gray-900">Ankur Bhatia</span>, started Navigant in 2003 and is responsible for strategic global business planning for the company. With a vision to be the preferred partner for international businesses, he spearheads the mid-size BPO catering to diverse and unique needs of a marquee list of International and domestic clients in the area of business consulting, Information technology and Outsourcing Services.
                </p>
                <p>
                  From the start, Ankur always dreamed of being an entrepreneur who would create a big company to provide satisfying job opportunities to the burgeoning pool of India's young talent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
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
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Ankur Comes With Over{' '}
              <span className="text-[#CA1411] relative">
                35 Years
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#CA1411]/10 -z-10 transform -skew-x-12" />
              </span>{' '}
              Of Experience
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              In <span className="font-semibold text-gray-900">MARKETING AND SALES</span> functions across sectors such as IT, telecom, Software & Security among others.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className="relative rounded-3xl p-8 md:p-10 bg-white border border-gray-100 shadow-xl"
              style={{
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-12 h-12 rounded-full bg-[#CA1411]/10 flex items-center justify-center text-[#CA1411] font-bold text-xl">
                  1
                </span>
                Previous Leadership Roles
              </h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  Before venturing to become an entrepreneur, Ankur served in leadership roles including <span className="font-semibold text-gray-900">Business Development at HCL</span>, a leading Indian multinational IT company.
                </p>
                <p>
                  His earlier stint was at <span className="font-semibold text-gray-900">Digital Equipment Corporation</span> (now part of HP), <span className="font-semibold text-gray-900">Unicorp Industries</span>, <span className="font-semibold text-gray-900">HCL Comnet</span> & <span className="font-semibold text-gray-900">PTC.com</span>, where he was responsible for generation revenue for the organisation.
                </p>
              </div>
            </div>

            <div
              className="relative rounded-3xl p-8 md:p-10 bg-white border border-gray-100 shadow-xl"
              style={{
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-12 h-12 rounded-full bg-[#CA1411]/10 flex items-center justify-center text-[#CA1411] font-bold text-xl">
                  2
                </span>
                Beyond Work
              </h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  Aside from work, Ankur is passionate about <span className="font-semibold text-gray-900">mentoring startups</span>, helping young talent design their business and financial plans, across many verticals such as:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>E-commerce</li>
                  <li>Startups</li>
                  <li>Financial Go to Market Strategies</li>
                  <li>Travel</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm md:text-base font-semibold text-[#CA1411] uppercase tracking-wider">
                Our Team
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Navigantians{' '}
              <span className="text-[#CA1411] relative">
                Family
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#CA1411]/10 -z-10 transform -skew-x-12" />
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the talented professionals who make Navigant Technologies a success
            </p>
          </div>
        </div>
        <TeamMembersSection initialCount={6} />
      </section> */}
    </AppLayout>
  );
};

export default AboutPage;


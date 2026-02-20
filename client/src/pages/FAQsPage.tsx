import React, { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import DotGrid from '../components/commons/DotGrid';
import { Link } from 'react-router-dom';
import { FAQ_DATA } from '../data/faqData';

const FAQsPage: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-28 lg:pt-32 pb-10 md:pb-14 bg-gradient-to-br from-white via-gray-50/50 to-white overflow-hidden">
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
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex px-4 py-2 rounded-full bg-[#CA1411]/10 text-[#CA1411] text-sm font-semibold uppercase tracking-wide mb-4">
              FAQ
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Frequently Asked{' '}
              <span className="text-[#CA1411] relative">
                Questions
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#CA1411]/10 -z-10 transform -skew-x-12" />
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Quick answers about our services, onboarding, and how we work with clients worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          <div className="space-y-3 sm:space-y-4">
            {FAQ_DATA.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md focus-within:ring-2 focus-within:ring-[#CA1411]/20 focus-within:ring-inset"
                >
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    className="w-full flex items-center justify-between gap-3 sm:gap-4 text-left px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-5 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 pr-2 leading-snug">
                      {item.question}
                    </span>
                    <span
                      className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#CA1411]/10 text-[#CA1411] transition-transform duration-300"
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      aria-hidden
                    >
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300 ease-out"
                    style={{ maxHeight: isOpen ? '600px' : '0px' }}
                    aria-hidden={!isOpen}
                  >
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 md:px-6 md:pb-6 pt-0 border-t border-gray-100">
                      <p className="text-gray-700 text-sm sm:text-base leading-relaxed pt-4">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-12 md:mt-16 text-center rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 md:p-10">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Our team is here to help. Get in touch for tailored advice and solutions.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-[#CA1411] !text-white font-semibold rounded-lg transition-all duration-300 hover:bg-[#A0100E] hover:!text-white hover:shadow-lg hover:-translate-y-0.5"
            >
              Contact Us
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default FAQsPage;

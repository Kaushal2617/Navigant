import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DotGrid from './DotGrid';
import { FAQ_DATA, HOME_FAQ_COUNT } from '../../data/faqData';

const HomeFAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const items = FAQ_DATA.slice(0, HOME_FAQ_COUNT);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="pt-6 pb-4 md:pt-8 md:pb-6 lg:pt-10 lg:pb-8 bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden">
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
        <div className="text-center mb-0">
          <div className="inline-flex px-4 py-2 rounded-full bg-[#CA1411]/10 text-[#CA1411] text-sm font-semibold uppercase tracking-wide mb-2">
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-0">
            Frequently Asked{' '}
            <span className="text-[#CA1411] relative">
              Questions
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#CA1411]/10 -z-10 transform -skew-x-12" />
            </span>
          </h2>
          <p className="mt-3 sm:mt-4 mb-0 text-lg text-gray-600 max-w-2xl mx-auto leading-snug">
            Quick answers about our services and how we work with clients worldwide.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-5">
          {items.map((item) => {
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

        <div className="text-center mt-8 md:mt-10">
          <Link
            to="/faqs"
            className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-[#CA1411] !text-white font-semibold rounded-lg transition-all duration-300 hover:bg-[#A0100E] hover:!text-white hover:shadow-lg hover:-translate-y-0.5"
          >
            View all
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
  );
};

export default HomeFAQSection;

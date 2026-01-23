import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import DotGrid from '../components/commons/DotGrid';

const BeetelPage: React.FC = () => {
  return (
    <AppLayout>
      <section className="relative pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-20 lg:pb-24 min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50/50 to-white overflow-hidden">
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

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center relative z-10">
          {/* Loading Spinner */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* Outer rotating ring */}
              <div className="w-20 h-20 md:w-24 md:h-24 border-4 border-gray-200 border-t-[#CA1411] rounded-full animate-spin"></div>
              {/* Inner pulsing dot */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-[#CA1411] rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Main Message */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Waiting for{' '}
            <span className="text-[#CA1411] relative">
              Data
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#CA1411]/10 -z-10 transform -skew-x-12" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            We're fetching the latest information. Please wait...
          </p>

          {/* Animated Dots */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <div className="w-2 h-2 bg-[#CA1411] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-[#CA1411] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-[#CA1411] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>

          {/* Status Card */}
          <div className="mt-12 max-w-md mx-auto">
            <div
              className="relative rounded-2xl p-6 md:p-8 bg-white border border-gray-100 shadow-lg"
              style={{
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <svg
                  className="w-5 h-5 text-[#CA1411] animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span className="text-sm font-semibold text-gray-700">Loading content...</span>
              </div>
              <p className="text-sm text-gray-500">
                Data will be displayed here once it's ready
              </p>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default BeetelPage;

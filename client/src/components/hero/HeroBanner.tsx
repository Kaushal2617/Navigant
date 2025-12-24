import React, { useState } from 'react';

interface HeroBannerProps {
  className?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  className = '',
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className={`hero-banner relative w-full ${className}`}>
      <div className="relative w-full h-[600px] sm:h-[650px] md:h-[700px] lg:h-[750px] xl:h-[750px] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Glassmorphism Content Section - Left Side */}
        <div className="absolute inset-0 z-10 flex items-end sm:items-end lg:items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8 sm:pb-16 lg:pb-0 lg:pt-28">
            <div className="max-w-2xl">
              <div
                className="p-6 sm:p-8 md:p-10 rounded-2xl backdrop-blur-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.1))',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.2)',
                }}
              >
                {/* Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg">
                  Scale Smarter. Operate Faster. Grow Stronger.
                </h1>

                {/* Sub-headline */}
                <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed drop-shadow-md">
                  With Navigant's end-to-end outsourcing and staffing solutions, businesses unlock efficiency, agility, and measurable growth.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                    style={{ 
                      backgroundColor: '#CA1411',
                      color: '#ffffff'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#B0120F';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#CA1411';
                    }}
                  >
                     Get Started
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsVideoOpen(true)}
                    className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                    style={{
                      backgroundColor: '#CA1411',
                      color: '#ffffff'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#B0120F';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#CA1411';
                    }}
                  >
                    Watch Video
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-4xl">
            <div className="overflow-hidden rounded-2xl bg-black shadow-2xl border border-white/10">
              <video
                src="/navigantvideo.mp4"
                controls
                autoPlay
                className="w-full h-auto max-h-[70vh] object-contain bg-black"
              />
            </div>
            <button
              type="button"
              aria-label="Close video"
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-4 -right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 font-bold shadow-lg hover:scale-105 transition-transform"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroBanner;


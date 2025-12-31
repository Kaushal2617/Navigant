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
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 w-full pb-4 sm:pb-8 md:pb-12 lg:pb-0 lg:pt-28">
            <div className="w-full max-w-full sm:max-w-2xl">
              <div
                className="hero-glass-effect p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 rounded-lg sm:rounded-xl md:rounded-2xl"
              >
                {/* Headline */}
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-5 lg:mb-6 leading-tight drop-shadow-lg">
                  Scale Smarter. Operate Faster. Grow Stronger.
                </h1>

                {/* Sub-headline */}
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 mb-4 sm:mb-5 md:mb-6 lg:mb-8 leading-relaxed drop-shadow-md">
                  With Navigant's end-to-end outsourcing and staffing solutions, businesses unlock efficiency, agility, and measurable growth.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 text-xs sm:text-sm md:text-base font-semibold rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
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
                    className="inline-flex items-center justify-center px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 text-xs sm:text-sm md:text-base font-semibold rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
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


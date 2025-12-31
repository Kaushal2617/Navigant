import React from 'react';
import type { HeroSlide } from './serviceTypes';
import Carousel, { type CarouselItem } from '../commons/Carousel';

type ServiceHeroSlide = HeroSlide & {
  primaryButton?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryButton?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
};

interface ServiceHeroProps {
  slides: ServiceHeroSlide[];
  autoplay?: boolean;
  autoplayDelay?: number;
  showNavigation?: boolean;
  showPagination?: boolean;
  badgeText?: string;
}

const ServiceHero: React.FC<ServiceHeroProps> = ({
  slides,
  autoplay = true,
  autoplayDelay = 5000,
  showNavigation = false,
  showPagination = false,
  badgeText = 'Services',
}) => {
  const carouselItems: CarouselItem[] = slides.map((slide) => ({
    id: slide.id,
    content: (
      <div className="relative w-full h-[500px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat service-hero-bg"
          style={{
            backgroundImage: `url(${slide.image})`,
            // Slightly reduce scale so the background is more visible
            transform: 'scale(1.05)',
            transformOrigin: 'center center',
          }}
        >
          {/* Softer overlays to keep the image visible while maintaining contrast */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 via-gray-800/20 to-gray-900/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>

        {/* Content Container - Centered with Glassmorphism */}
        <div className="relative z-10 h-full flex items-start sm:items-center justify-center service-hero-content-wrapper">
          <div className="container mx-auto px-2.5 sm:px-3 md:px-4 lg:px-6 xl:px-8 w-full">
            <div className="max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto">
              {/* Main Glass Card - Centered, More Compact */}
              <div
                className="service-hero-glass-effect relative p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl service-hero-card"
              >
                {/* Decorative glass elements - Smaller/Hidden on mini devices */}
                <div
                  className="hidden sm:block absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full blur-3xl opacity-25"
                  style={{
                    background: 'radial-gradient(circle, rgba(202, 20, 17, 0.4), transparent)',
                    transform: 'translate(-20%, -20%)',
                  }}
                />
                <div
                  className="hidden sm:block absolute bottom-0 right-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full blur-3xl opacity-15"
                  style={{
                    background: 'radial-gradient(circle, rgba(202, 20, 17, 0.3), transparent)',
                    transform: 'translate(20%, 20%)',
                  }}
                />

                {/* Content - More Compact */}
                <div className="relative z-10 text-center space-y-1 sm:space-y-1.5 md:space-y-2 lg:space-y-3">
                  {/* Badge/Tag - Smaller */}
                  {badgeText && (
                  <div className="inline-block mb-0.5 sm:mb-1">
                    <div
                      className="service-hero-badge px-1.5 sm:px-2.5 md:px-3 py-0.5 sm:py-1 md:py-1.5 rounded-full text-[8px] sm:text-[10px] md:text-xs font-semibold text-white"
                    >
                        {badgeText}
                      </div>
                    </div>
                  )}

                  {/* Title - Smaller and more refined */}
                  {slide.title && (
                    <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold leading-tight sm:leading-[1.1] md:leading-[1.15] tracking-tight text-white drop-shadow-2xl px-1">
                      {slide.title}
                    </h1>
                  )}

                  {/* Subtitle - Smaller */}
                  {slide.subtitle && (
                    <p className="text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg text-white/90 max-w-full sm:max-w-lg md:max-w-xl mx-auto leading-snug sm:leading-relaxed drop-shadow-lg px-1 sm:px-1.5 md:px-2">
                      {slide.subtitle}
                    </p>
                  )}

                  {/* Action Buttons - Smaller */}
                  {(slide.primaryButton || slide.secondaryButton) && (
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 md:gap-3 justify-center items-center pt-1.5 sm:pt-2 md:pt-3 lg:pt-4">
                      {slide.primaryButton && (
                        <a
                          href={slide.primaryButton.href || '#'}
                          onClick={slide.primaryButton.onClick}
                          className="service-hero-primary-btn group relative px-2.5 py-1 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-2.5 rounded-md sm:rounded-lg font-semibold text-[9px] sm:text-xs md:text-sm lg:text-base transition-all duration-300 overflow-hidden w-full sm:w-auto md:backdrop-blur-[10px]"
                          style={{
                            background: 'linear-gradient(135deg, rgba(202, 20, 17, 0.9), rgba(202, 20, 17, 0.8))',
                            color: '#ffffff',
                          }}
                        >
                          <span className="relative z-10">{slide.primaryButton.text}</span>
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent)',
                            }}
                          />
                        </a>
                      )}
                      {slide.secondaryButton && (
                        <a
                          href={slide.secondaryButton.href || '#'}
                          onClick={slide.secondaryButton.onClick}
                          className="service-hero-secondary-btn group relative px-2.5 py-1 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-2.5 rounded-md sm:rounded-lg font-semibold text-[9px] sm:text-xs md:text-sm lg:text-base transition-all duration-300 overflow-hidden w-full sm:w-auto md:backdrop-blur-[10px]"
                          style={{
                            color: '#ffffff',
                          }}
                        >
                          <span className="relative z-10">{slide.secondaryButton.text}</span>
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent)',
                            }}
                          />
                        </a>
                      )}
                    </div>
                  )}

                  {/* Stats or Features - More Compact */}
                  <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 xl:gap-4 pt-1.5 sm:pt-2 md:pt-3 lg:pt-4 border-t border-white/20 mt-1.5 sm:mt-2 md:mt-3">
                    <div
                      className="service-hero-stats px-1.5 py-1 sm:px-2 sm:py-1.5 md:px-3 md:py-2 lg:px-4 lg:py-3 rounded-md sm:rounded-lg text-center md:backdrop-blur-sm"
                    >
                      <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white mb-0 sm:mb-0.5">20+</div>
                      <div className="text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] xl:text-xs text-white/80 leading-tight">Years Experience</div>
                    </div>
                    <div
                      className="service-hero-stats px-1.5 py-1 sm:px-2 sm:py-1.5 md:px-3 md:py-2 lg:px-4 lg:py-3 rounded-md sm:rounded-lg text-center md:backdrop-blur-sm"
                    >
                      <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white mb-0 sm:mb-0.5">500+</div>
                      <div className="text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] xl:text-xs text-white/80 leading-tight">Happy Clients</div>
                    </div>
                    <div
                      className="service-hero-stats px-1.5 py-1 sm:px-2 sm:py-1.5 md:px-3 md:py-2 lg:px-4 lg:py-3 rounded-md sm:rounded-lg text-center md:backdrop-blur-sm"
                    >
                      <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white mb-0 sm:mb-0.5">24/7</div>
                      <div className="text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] xl:text-xs text-white/80 leading-tight">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Glass Orbs - Decorative - Hidden on mini devices */}
        <div className="hidden sm:block absolute top-20 left-10 w-20 h-20 rounded-full blur-2xl opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(202, 20, 17, 0.5), transparent)',
            animation: 'float 6s ease-in-out infinite',
          }}
        />
        <div className="hidden sm:block absolute bottom-20 right-10 w-32 h-32 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(202, 20, 17, 0.4), transparent)',
            animation: 'float 8s ease-in-out infinite reverse',
          }}
        />
      </div>
    ),
  }));

  return (
    <div className="service-hero relative">
      <Carousel
        items={carouselItems}
        autoplay={autoplay}
        autoplayDelay={autoplayDelay}
        showNavigation={showNavigation}
        showPagination={showPagination}
        effect="fade"
        loop={true}
        className="service-hero-carousel"
        slideClassName="service-hero-slide"
      />
    </div>
  );
};

export default ServiceHero;


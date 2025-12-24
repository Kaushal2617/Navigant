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
      <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
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
        <div className="relative z-10 h-full flex items-center justify-center pt-222 md:pt-24 lg:pt-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-4 w-full">
            <div className="max-w-3xl mx-auto">
              {/* Main Glass Card - Centered, More Compact */}
              <div
                className="relative p-4 md:p-5 lg:p-6 rounded-2xl service-hero-card"
                style={{
                  // Lighten the glass card so the background shines through more
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.04))',
                  backdropFilter: 'blur(30px) saturate(200%)',
                  WebkitBackdropFilter: 'blur(30px) saturate(200%)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  boxShadow: '0 20px 60px 0 rgba(0, 0, 0, 0.25), 0 8px 32px 0 rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.18)',
                }}
              >
                {/* Decorative glass elements - Smaller */}
                <div
                  className="absolute top-0 left-0 w-24 h-24 rounded-full blur-3xl opacity-25"
                  style={{
                    background: 'radial-gradient(circle, rgba(202, 20, 17, 0.4), transparent)',
                    transform: 'translate(-20%, -20%)',
                  }}
                />
                <div
                  className="absolute bottom-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-15"
                  style={{
                    background: 'radial-gradient(circle, rgba(202, 20, 17, 0.3), transparent)',
                    transform: 'translate(20%, 20%)',
                  }}
                />

                {/* Content - More Compact */}
                <div className="relative z-10 text-center space-y-3">
                  {/* Badge/Tag - Smaller */}
                  {badgeText && (
                  <div className="inline-block">
                    <div
                      className="px-3 py-1.5 rounded-full text-xs font-semibold text-white"
                      style={{
                        background: 'linear-gradient(135deg, rgba(202, 20, 17, 0.3), rgba(202, 20, 17, 0.2))',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                      }}
                    >
                        {badgeText}
                      </div>
                    </div>
                  )}

                  {/* Title - Smaller and more refined */}
                  {slide.title && (
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight text-white drop-shadow-2xl">
                      {slide.title}
                    </h1>
                  )}

                  {/* Subtitle - Smaller */}
                  {slide.subtitle && (
                    <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-xl mx-auto leading-relaxed drop-shadow-lg">
                      {slide.subtitle}
                    </p>
                  )}

                  {/* Action Buttons - Smaller */}
                  {(slide.primaryButton || slide.secondaryButton) && (
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
                      {slide.primaryButton && (
                        <a
                          href={slide.primaryButton.href || '#'}
                          onClick={slide.primaryButton.onClick}
                          className="group relative px-6 py-2.5 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 overflow-hidden"
                          style={{
                            background: 'linear-gradient(135deg, rgba(202, 20, 17, 0.9), rgba(202, 20, 17, 0.8))',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 8px 32px 0 rgba(202, 20, 17, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
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
                          className="group relative px-6 py-2.5 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 overflow-hidden"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.1))',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
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
                  <div className="flex flex-wrap justify-center gap-3 md:gap-4 pt-5 border-t border-white/20">
                    <div
                      className="px-4 py-3 rounded-lg text-center backdrop-blur-sm"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                      }}
                    >
                      <div className="text-xl md:text-2xl font-bold text-white mb-0.5">20+</div>
                      <div className="text-[10px] md:text-xs text-white/80">Years Experience</div>
                    </div>
                    <div
                      className="px-4 py-3 rounded-lg text-center backdrop-blur-sm"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                      }}
                    >
                      <div className="text-xl md:text-2xl font-bold text-white mb-0.5">500+</div>
                      <div className="text-[10px] md:text-xs text-white/80">Happy Clients</div>
                    </div>
                    <div
                      className="px-4 py-3 rounded-lg text-center backdrop-blur-sm"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                      }}
                    >
                      <div className="text-xl md:text-2xl font-bold text-white mb-0.5">24/7</div>
                      <div className="text-[10px] md:text-xs text-white/80">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Glass Orbs - Decorative */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full blur-2xl opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(202, 20, 17, 0.5), transparent)',
            animation: 'float 6s ease-in-out infinite',
          }}
        />
        <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full blur-3xl opacity-15 pointer-events-none"
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


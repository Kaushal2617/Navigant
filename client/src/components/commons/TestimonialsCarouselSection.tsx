import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  testimonialsData,
  testimonialsSectionConfig,
  type TestimonialWithRating,
} from "./testimonialsData";
import { getActiveTestimonials, type Testimonial as ApiTestimonial } from "../../services/testimonialsApi";
import DotGrid from "./DotGrid";

interface TestimonialsCarouselSectionProps {
  testimonials?: TestimonialWithRating[];
  title?: string;
  subtitle?: string;
  useApi?: boolean; // Flag to enable/disable API calls
}

const TestimonialsCarouselSection: React.FC<TestimonialsCarouselSectionProps> = ({
  testimonials: propTestimonials,
  title = testimonialsSectionConfig.title,
  subtitle = testimonialsSectionConfig.subtitle,
  useApi = false, // Default to false (use mock data) until backend API is ready
}) => {
  const [testimonials, setTestimonials] = useState<TestimonialWithRating[]>(propTestimonials || testimonialsData);

  // Fetch testimonials from API if useApi is true
  useEffect(() => {
    if (useApi && !propTestimonials) {
      const fetchTestimonials = async () => {
        try {
          const response = await getActiveTestimonials();
          if (response.success && response.data) {
            // Map API response to component format
            const mappedTestimonials: TestimonialWithRating[] = response.data.map((testimonial: ApiTestimonial) => ({
              id: testimonial.id,
              name: testimonial.name,
              role: testimonial.role,
              company: testimonial.company,
              content: testimonial.content,
              avatar: testimonial.avatar,
              rating: testimonial.rating,
            }));
            setTestimonials(mappedTestimonials);
          } else {
            // Fallback to local data if API fails
            console.warn('Failed to fetch testimonials from API, using fallback data');
            setTestimonials(testimonialsData);
          }
        } catch (error) {
          console.error('Error fetching testimonials:', error);
          // Fallback to local data on error
          setTestimonials(testimonialsData);
        }
      };

      fetchTestimonials();
    } else if (propTestimonials) {
      setTestimonials(propTestimonials);
    }
  }, [useApi, propTestimonials]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [rotationY, setRotationY] = useState(0);

  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  /** DUPLICATE ARRAY FOR TRUE INFINITE LOOP */
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  /** START IN THE CENTER CLUSTER */
  useEffect(() => {
    setCurrentIndex(testimonials.length);
  }, [testimonials.length]);

  const actualIndex = currentIndex % testimonials.length;

  /** 3D CARD STYLE */
  const getCardStyle = (index: number): React.CSSProperties => {
    const offset = index - currentIndex;
    const absOffset = Math.abs(offset);

    return {
      transform: `perspective(1000px) rotateY(${offset * 12}deg) translateZ(${
        -absOffset * 80
      }px) translateX(${offset * 40}px) scale(${Math.max(0.75, 1 - absOffset * 0.12)})`,
      opacity: Math.max(0.3, 1 - absOffset * 0.25),
      zIndex: 1000 - absOffset,
      pointerEvents: (absOffset === 0 ? "auto" : "none") as React.CSSProperties["pointerEvents"],
    };
  };

  /** NEXT CARD → infinite loop */
  const nextCard = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev + 1;

      // Jump back to middle clone for seamless infinite loop
      if (next >= testimonials.length * 2) return testimonials.length;

      return next;
    });

    setRotationY(0);
  }, [testimonials.length]);

  /** PREV CARD → infinite loop */
  const prevCard = useCallback(() => {
    setCurrentIndex((prev) => {
      const prevIndex = prev - 1;

      // Jump to end clone on backward wrap
      if (prevIndex < testimonials.length) return testimonials.length * 2 - 1;

      return prevIndex;
    });

    setRotationY(0);
  }, [testimonials.length]);

  /** MOUSE DRAG */
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    setCurrentX(e.clientX);
    setRotationY(deltaX * 0.1);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    const deltaX = currentX - startX;

    if (Math.abs(deltaX) > 50) {
      deltaX > 0 ? prevCard() : nextCard();
    } else {
      setRotationY(0);
    }

    setIsDragging(false);
  };

  /** TOUCH SWIPE */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;

    if (Math.abs(dx) > Math.abs(dy)) {
      e.preventDefault();
      setRotationY(dx * 0.1);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const dx = e.changedTouches[0].clientX - touchStartX.current;

    if (Math.abs(dx) > 50) {
      dx > 0 ? prevCard() : nextCard();
    } else {
      setRotationY(0);
    }

    setIsDragging(false);
  };

  /** CLICK HALF → navigate */
  const handleCardClick = (e: React.MouseEvent) => {
    if (isDragging) return;

    const rect = carouselRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clickX = e.clientX - rect.left;

    clickX < rect.width / 2 ? prevCard() : nextCard();
  };

  /** STAR RENDER */
  const renderStars = (rating: number) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= rating ? "text-yellow-300" : "text-white/30"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  return (
    <section className="relative bg-gradient-to-br from-white via-gray-50/50 to-white pt-14 pb-20 overflow-hidden">
      {/* Background animation */}
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

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-1">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>

        {/* Carousel */}
        <div className="relative w-full h-[500px] flex items-center justify-center mx-auto">
          {/* Left Arrow */}
          <button
            onClick={prevCard}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-[#CA1411]/40 shadow-xl hover:bg-white transition-all items-center justify-center"
          >
            <svg className="w-6 h-6 text-[#CA1411]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextCard}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-[#CA1411]/40 shadow-xl hover:bg-white transition-all items-center justify-center"
          >
            <svg className="w-6 h-6 text-[#CA1411]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* 3D Cards */}
          <div
            ref={carouselRef}
            className="relative w-full h-full flex items-center justify-center"
            style={{ perspective: "1000px" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={handleCardClick}
          >
            {duplicatedTestimonials.map((t, i) => {
              const style = getCardStyle(i);
              const isActive = i === currentIndex;

              return (
                <div
                  key={`${t.id}-${i}`}
                  className="absolute w-[85%] sm:w-[70%] md:w-[60%] lg:w-[50%] max-w-lg"
                  style={{
                    ...style,
                    transform: `${style.transform} ${isActive && rotationY !== 0 ? `rotateY(${rotationY}deg)` : ""}`,
                    transition: isDragging
                      ? "none"
                      : "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease-out",
                    top: "50%",
                    left: "50%",
                    transformOrigin: "center center",
                    translate: "-50% -50%",
                  }}
                >
                  <div
                    className="relative rounded-2xl p-6 border border-[#CA1411]/20 shadow-xl flex flex-col"
                    style={{
                      background: isActive
                        ? "linear-gradient(to bottom, rgba(202, 20, 17, 0.95), rgba(180, 15, 12, 0.95))"
                        : "linear-gradient(to bottom, rgba(202, 20, 17, 0.85), rgba(180, 15, 12, 0.85))",
                      backdropFilter: "blur(20px) saturate(180%)",
                    }}
                  >
                    <svg className="w-10 h-10 text-white/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.996 3.638-3.996 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>

                    {renderStars(t.rating)}

                    <p className="text-white/95 text-base leading-relaxed italic mt-4 flex-1">
                      "{t.content}"
                    </p>

                    <div className="flex items-center gap-4 pt-4 border-t border-white/20">
                      {t.avatar ? (
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-white/50"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white text-lg font-bold ring-2 ring-white/50">
                          {t.name.charAt(0)}
                        </div>
                      )}

                      <div>
                        <h4 className="text-white font-bold text-lg">{t.name}</h4>
                        <p className="text-white/80 text-sm">
                          {t.role} {t.company && `• ${t.company}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-40 flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(testimonials.length + i)}
                className={`h-2 rounded-full transition-all ${
                  actualIndex === i ? "bg-[#CA1411] w-6" : "bg-gray-300 w-2"
                }`}
              />
            ))}
          </div>
        </div>

        {/* <p className="text-center text-sm text-gray-500 mt-6">
          Click or swipe to navigate
        </p> */}
      </div>
    </section>
  );
};

export default TestimonialsCarouselSection;

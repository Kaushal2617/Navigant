import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export interface CarouselItem {
  id: string | number;
  content: React.ReactNode;
}

interface CarouselProps {
  items: CarouselItem[];
  autoplay?: boolean;
  autoplayDelay?: number;
  showNavigation?: boolean;
  showPagination?: boolean;
  effect?: 'slide' | 'fade';
  loop?: boolean;
  className?: string;
  slideClassName?: string;
  onSlideChange?: (swiper: SwiperType) => void;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  autoplay = true,
  autoplayDelay = 5000,
  showNavigation = true,
  showPagination = true,
  effect = 'slide',
  loop = true,
  className = '',
  slideClassName = '',
  onSlideChange,
}) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, EffectFade]}
      spaceBetween={0}
      slidesPerView={1}
      loop={loop}
      autoplay={
        autoplay
          ? {
              delay: autoplayDelay,
              disableOnInteraction: false,
            }
          : false
      }
      navigation={showNavigation}
      pagination={
        showPagination
          ? {
              clickable: true,
              dynamicBullets: true,
            }
          : false
      }
      effect={effect}
      fadeEffect={
        effect === 'fade'
          ? {
              crossFade: true,
            }
          : undefined
      }
      onSlideChange={onSlideChange}
      className={className}
    >
      {items.map((item) => (
        <SwiperSlide key={item.id} className={slideClassName}>
          {item.content}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;


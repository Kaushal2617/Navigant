# Carousel Component Documentation

## Overview
A reusable carousel component built with SwiperJS that can be used throughout the project for banners, image galleries, testimonials, and more.

## Components

### 1. Carousel Component (`Carousel.tsx`)
A flexible, reusable carousel component with SwiperJS.

**Props:**
- `items: CarouselItem[]` - Array of items to display
- `autoplay?: boolean` - Enable/disable autoplay (default: true)
- `autoplayDelay?: number` - Delay between slides in ms (default: 5000)
- `showNavigation?: boolean` - Show prev/next buttons (default: true)
- `showPagination?: boolean` - Show pagination dots (default: true)
- `effect?: 'slide' | 'fade'` - Transition effect (default: 'slide')
- `loop?: boolean` - Enable infinite loop (default: true)
- `className?: string` - Additional CSS classes
- `slideClassName?: string` - CSS classes for individual slides
- `onSlideChange?: (swiper: SwiperType) => void` - Callback when slide changes

**Example:**
```tsx
import Carousel, { type CarouselItem } from './components/commons/Carousel';

const items: CarouselItem[] = [
  {
    id: 1,
    content: <div>Slide 1 Content</div>
  },
  {
    id: 2,
    content: <div>Slide 2 Content</div>
  }
];

<Carousel 
  items={items}
  autoplay={true}
  autoplayDelay={3000}
  effect="fade"
/>
```

### 2. HeroBanner Component (`HeroBanner.tsx`)
A specialized hero banner component using the Carousel.

**Props:**
- `slides: HeroSlide[]` - Array of hero slides
- `autoplay?: boolean` - Enable/disable autoplay (default: true)
- `autoplayDelay?: number` - Delay between slides in ms (default: 5000)
- `showNavigation?: boolean` - Show navigation arrows (default: true)
- `showPagination?: boolean` - Show pagination dots (default: true)
- `className?: string` - Additional CSS classes

**HeroSlide Interface:**
```tsx
interface HeroSlide {
  id: string | number;
  title: string;
  subtitle?: string;
  location?: string;
  time?: string;
  image: string;
  imageAlt?: string;
  primaryButton?: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
  secondaryButton?: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
}
```

**Example:**
```tsx
import HeroBanner from './components/hero/HeroBanner';

const slides = [
  {
    id: 1,
    title: 'Event Title',
    subtitle: 'Event Subtitle',
    time: '7:30 PM',
    location: 'Venue Name',
    image: '/path/to/image.jpg',
    primaryButton: {
      text: 'BUY NOW',
      href: '/tickets'
    },
    secondaryButton: {
      text: 'MORE INFO',
      href: '/event-details'
    }
  }
];

<HeroBanner slides={slides} />
```

## Usage Examples

### Image Gallery Carousel
```tsx
const galleryItems: CarouselItem[] = images.map((img, index) => ({
  id: index,
  content: (
    <div className="h-96">
      <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
    </div>
  )
}));

<Carousel 
  items={galleryItems}
  showNavigation={true}
  showPagination={true}
  effect="slide"
/>
```

### Testimonials Carousel
```tsx
const testimonialItems: CarouselItem[] = testimonials.map((testimonial) => ({
  id: testimonial.id,
  content: (
    <div className="p-8 text-center">
      <p className="text-lg italic">"{testimonial.quote}"</p>
      <p className="mt-4 font-semibold">- {testimonial.author}</p>
    </div>
  )
}));

<Carousel 
  items={testimonialItems}
  autoplay={true}
  autoplayDelay={7000}
  effect="fade"
/>
```

## Styling
Custom Swiper styles are defined in `index.css` under `.hero-carousel`. You can extend these styles or create new classes for different carousel types.

## Dependencies
- `swiper` - Carousel library
- React 19+
- TypeScript


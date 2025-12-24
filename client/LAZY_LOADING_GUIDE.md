# Lazy Loading Guide for Navigant Project

## Overview
This guide covers different lazy loading strategies you can implement in your React + Vite + TypeScript application.

---

## 1. Route-Based Lazy Loading (React.lazy + Suspense)

### Best For: Code splitting pages/routes

**Implementation:**

```tsx
// App.tsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const ServicePage = lazy(() => import('./pages/ServicePage'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CA1411] mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services/:slug" element={<ServicePage />} />
          </Routes>
        </Suspense>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
```

**Benefits:**
- Reduces initial bundle size
- Only loads code when route is accessed
- Better performance on first load

---

## 2. Component Lazy Loading

### Best For: Heavy components that aren't immediately visible

**Implementation:**

```tsx
// Lazy load heavy components
const TestimonialsSection = lazy(() => import('./components/services/TestimonialsSection'));
const ContactFormSection = lazy(() => import('./components/services/ContactFormSection'));
const IndustrySolutions = lazy(() => import('./components/services/IndustrySolutions'));

// In ServiceDetailPage.tsx
<Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>}>
  {serviceData.industries && serviceData.industries.length > 0 && (
    <IndustrySolutions industries={serviceData.industries} />
  )}
</Suspense>
```

---

## 3. Image Lazy Loading

### Option A: Native Browser Lazy Loading (Recommended)

**Implementation:**

```tsx
// For images below the fold
<img
  src={slide.image}
  alt={slide.imageAlt || slide.title}
  loading="lazy"  // Native browser lazy loading
  className="w-full h-full object-cover"
/>

// In HeroBanner.tsx - don't lazy load above-the-fold images
// In ServiceDetailSection.tsx - lazy load images
<img
  src={section.image}
  alt={section.imageAlt || section.title}
  loading="lazy"
  className="w-full h-auto object-cover"
/>
```

### Option B: Intersection Observer API (More Control)

**Create a LazyImage component:**

```tsx
// components/commons/LazyImage.tsx
import React, { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0U1RTdFQiIvPjwvc3ZnPg==',
  onLoad,
  onError,
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    if (onError) onError();
  };

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
};

export default LazyImage;
```

**Usage:**

```tsx
import LazyImage from '../commons/LazyImage';

<LazyImage
  src={section.image}
  alt={section.imageAlt || section.title}
  className="w-full h-auto object-cover rounded-2xl"
/>
```

### Option C: react-lazy-load-image-component (Library)

**Install:**
```bash
npm install react-lazy-load-image-component
```

**Usage:**
```tsx
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

<LazyLoadImage
  src={image}
  alt={alt}
  effect="blur"
  placeholderSrc={placeholder}
  className="w-full h-auto"
/>
```

---

## 4. Data Lazy Loading (API Calls)

### Best For: Loading data on scroll or when component is visible

**Implementation with Intersection Observer:**

```tsx
// hooks/useLazyLoad.ts
import { useState, useEffect, useRef } from 'react';

export const useLazyLoad = <T,>(
  fetchFn: () => Promise<T>,
  options?: { rootMargin?: string; threshold?: number }
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !data && !loading) {
            setLoading(true);
            fetchFn()
              .then(setData)
              .catch(setError)
              .finally(() => setLoading(false));
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: options?.rootMargin || '100px',
        threshold: options?.threshold || 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [fetchFn, data, loading, options]);

  return { ref, data, loading, error };
};
```

**Usage:**

```tsx
const { ref, data, loading } = useLazyLoad(() => 
  fetch('/api/testimonials').then(res => res.json())
);

return (
  <div ref={ref}>
    {loading && <div>Loading testimonials...</div>}
    {data && <TestimonialsSection testimonials={data} />}
  </div>
);
```

---

## 5. Recommended Libraries

### react-intersection-observer
**Install:**
```bash
npm install react-intersection-observer
```

**Usage:**
```tsx
import { useInView } from 'react-intersection-observer';

const MyComponent = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div ref={ref}>
      {inView && <HeavyComponent />}
    </div>
  );
};
```

### react-window (For long lists)
**Install:**
```bash
npm install react-window
```

**Usage:**
```tsx
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={items.length}
  itemSize={100}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>
      <ServiceCard service={items[index]} />
    </div>
  )}
</FixedSizeList>
```

---

## 6. Implementation Priority

### High Priority (Implement First):
1. ✅ **Route-based lazy loading** - Biggest performance impact
2. ✅ **Image lazy loading** - Use native `loading="lazy"` for below-fold images
3. ✅ **Heavy component lazy loading** - Testimonials, Forms, etc.

### Medium Priority:
4. **LazyImage component** - For more control over image loading
5. **Data lazy loading** - For API calls that aren't immediately needed

### Low Priority (If Needed):
6. **react-intersection-observer** - If you need more complex intersection logic
7. **react-window** - Only if you have very long lists (100+ items)

---

## 7. Quick Implementation Checklist

- [ ] Add React.lazy() to App.tsx for routes
- [ ] Add Suspense boundaries with loading fallbacks
- [ ] Add `loading="lazy"` to images below the fold
- [ ] Lazy load heavy components (Testimonials, Forms)
- [ ] Test bundle size reduction (check Network tab)
- [ ] Monitor performance improvements

---

## 8. Performance Monitoring

Check your improvements:
```bash
# Build and analyze bundle
npm run build
npm run preview

# Check bundle size in Network tab
# Before: ~500KB initial bundle
# After: ~200KB initial bundle + lazy chunks
```

---

## Notes:
- Don't lazy load above-the-fold content (hero images, critical CSS)
- Always provide loading fallbacks for better UX
- Test on slow networks to ensure good experience
- Monitor Core Web Vitals (LCP, FID, CLS)


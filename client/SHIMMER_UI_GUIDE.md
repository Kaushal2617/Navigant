# Shimmer UI Implementation Guide

## Overview
Shimmer UI (skeleton loading) provides smooth, animated placeholders while content loads, improving perceived performance and user experience.

---

## Components Created

### 1. Base Components

#### `Shimmer` - Base shimmer component
```tsx
import Shimmer from './components/commons/Shimmer';

<Shimmer width="100%" height="2rem" rounded="rounded-lg" />
```

**Props:**
- `width`: string | number - Width of shimmer
- `height`: string | number - Height of shimmer
- `rounded`: boolean | string - Rounded corners
- `variant`: 'default' | 'pulse' | 'wave' - Animation variant
- `className`: string - Additional classes

#### `ShimmerText` - Text placeholders
```tsx
import { ShimmerText } from './components/commons/Shimmer';

<ShimmerText lines={3} lineHeight="1.5rem" />
```

#### `ShimmerCard` - Card placeholder
```tsx
import { ShimmerCard } from './components/commons/Shimmer';

<ShimmerCard showIcon={true} showButton={true} />
```

#### `ShimmerImage` - Image placeholder
```tsx
import { ShimmerImage } from './components/commons/Shimmer';

<ShimmerImage width="100%" height={200} rounded="rounded-2xl" />
```

---

### 2. Specialized Components

#### `ShimmerServiceCard` - Service card placeholder
Matches exact structure of ServiceCard component.

```tsx
import ShimmerServiceCard from './components/commons/ShimmerServiceCard';

<ShimmerServiceCard />
```

#### `ShimmerServiceCardGrid` - Grid of service cards
```tsx
import { ShimmerServiceCardGrid } from './components/commons/Shimmer';

<ShimmerServiceCardGrid count={6} />
```

#### `ShimmerPageLoader` - Full page loader
```tsx
import ShimmerPageLoader from './components/commons/ShimmerPageLoader';

<Suspense fallback={<ShimmerPageLoader />}>
  <YourComponent />
</Suspense>
```

#### `ShimmerServicesSection` - Services section loader
```tsx
import ShimmerServicesSection from './components/services/ShimmerServicesSection';

{loading ? <ShimmerServicesSection /> : <ServicesSection />}
```

#### `ShimmerServiceDetailPage` - Service detail page loader
```tsx
import ShimmerServiceDetailPage from './components/services/ShimmerServiceDetailPage';

{loading ? <ShimmerServiceDetailPage /> : <ServiceDetailPage />}
```

---

## Usage Examples

### 1. Route-Based Lazy Loading (App.tsx)
```tsx
import { lazy, Suspense } from 'react';
import ShimmerPageLoader from './components/commons/ShimmerPageLoader';

const HomePage = lazy(() => import('./pages/HomePage'));

<Suspense fallback={<ShimmerPageLoader />}>
  <Routes>
    <Route path="/" element={<HomePage />} />
  </Routes>
</Suspense>
```

### 2. Service Cards Loading
```tsx
import { ShimmerServiceCardGrid } from './components/commons/Shimmer';

{servicesLoading ? (
  <ShimmerServiceCardGrid count={6} />
) : (
  <ServicesGrid services={services} />
)}
```

### 3. Dropdown Loading
```tsx
// Already implemented in Dropdown.tsx
// Shows shimmer automatically when loading={true}
```

### 4. Image Loading
```tsx
import LazyImage from './components/commons/LazyImage';

<LazyImage
  src={imageUrl}
  alt="Description"
  className="w-full h-auto rounded-2xl"
  showShimmer={true}
/>
```

### 5. Custom Loading States
```tsx
import Shimmer, { ShimmerText } from './components/commons/Shimmer';

{loading ? (
  <div>
    <Shimmer width={200} height={40} rounded="rounded-lg" className="mb-4" />
    <ShimmerText lines={3} />
  </div>
) : (
  <ActualContent />
)}
```

---

## Animation Variants

### Wave (Default)
Smooth sliding wave effect - best for most use cases.

### Pulse
Fading pulse effect - good for subtle loading states.

### Default
Standard shimmer effect - balanced animation.

---

## CSS Animations

All shimmer animations are defined in `index.css`:

- `shimmer-slide` - Wave animation
- `shimmer-pulse` - Pulse animation
- `shimmer-sweep` - Card sweep effect

---

## Best Practices

1. **Match Structure**: Shimmer should match the actual content structure
2. **Appropriate Size**: Use similar dimensions to actual content
3. **Not Too Long**: Don't show shimmer for more than 2-3 seconds
4. **Above Fold**: Use shimmer for above-the-fold content
5. **Progressive Loading**: Show shimmer for sections as they load

---

## Where Shimmer is Used

✅ **Implemented:**
- Route lazy loading (App.tsx)
- Dropdown loading states
- Service cards (via ShimmerServiceCard)
- Page loaders
- Image loading (LazyImage component)

🔄 **Can Be Added:**
- Form loading states
- Table row loading
- List item loading
- Hero banner loading
- Testimonials loading

---

## Performance Notes

- Shimmer animations use CSS transforms (GPU accelerated)
- Minimal performance impact
- Smooth 60fps animations
- No JavaScript required for animations

---

## Customization

### Change Shimmer Color
Edit `index.css`:
```css
.shimmer-base {
  background: linear-gradient(
    90deg,
    #your-color-1 0%,
    #your-color-2 20%,
    #your-color-1 40%,
    #your-color-1 100%
  );
}
```

### Change Animation Speed
```css
.shimmer-wave {
  animation: shimmer-slide 2s ease-in-out infinite; /* Change 1.5s to desired duration */
}
```

---

## Testing

Test shimmer UI on:
- Slow 3G network (Chrome DevTools)
- Different screen sizes
- Various content lengths
- Multiple simultaneous loads


# Service Detail Page System

A reusable, modern service detail page system that can be used for all services on the Navigant website.

## Overview

This system provides a complete, reusable service page template that automatically generates beautiful, modern pages based on service data. The design matches the existing project's modern UI with glass morphism effects, smooth animations, and responsive design.

## Structure

```
services/
├── serviceTypes.ts              # TypeScript interfaces and types
├── ServiceDetailPage.tsx        # Main reusable page component
├── ServiceFeatureCard.tsx       # Feature card component
├── ServiceDetailSection.tsx    # Detailed content section
├── ServiceHighlights.tsx        # Highlights section
├── TestimonialsSection.tsx     # Testimonials section
├── serviceData/
│   ├── index.ts                 # Service data registry
│   └── bpoServices.ts          # BPO Services data
└── README.md                    # This file
```

## Usage

### 1. Create Service Data File

Create a new file in `serviceData/` directory following the structure:

```typescript
import type { ServiceData } from '../serviceTypes';

export const yourServiceData: ServiceData = {
  id: 'your-service-id',
  slug: 'your-service-slug',
  name: 'Your Service Name',
  title: 'Your Service Title',
  subtitle: 'Optional subtitle',
  description: 'Main description',
  features: [
    {
      id: 'feature-1',
      title: 'Feature Title',
      iconPath: 'SVG path data',
      shortDescription: 'Brief description',
    },
  ],
  detailSections: [
    {
      id: 'section-1',
      title: 'Section Title',
      content: 'Detailed content...',
      features: ['Feature 1', 'Feature 2'], // Optional
    },
  ],
  // ... other optional fields
};
```

### 2. Register Service Data

Add your service to the registry in `serviceData/index.ts`:

```typescript
import { yourServiceData } from './yourService';

export const serviceDataRegistry: Record<string, ServiceData> = {
  'bpo-services': bpoServicesData,
  'your-service-slug': yourServiceData, // Add here
};
```

### 3. Access the Page

The page will be automatically available at `/services/your-service-slug` through the dynamic route in `App.tsx`.

## Service Data Structure

### Required Fields

- `id`: Unique identifier
- `slug`: URL slug (e.g., 'bpo-services')
- `name`: Service name
- `title`: Page title
- `description`: Main description

### Optional Fields

- `subtitle`: Hero subtitle
- `heroImage`: Hero background image URL
- `features`: Array of service features
- `detailSections`: Detailed content sections
- `additionalServices`: Additional services grid
- `highlights`: Key highlights (3 items recommended)
- `testimonials`: Client testimonials
- `cta`: Call-to-action section

## Components

### ServiceDetailPage

Main component that renders the complete service page.

**Props:**
- `serviceData: ServiceData` - The service data object

### ServiceFeatureCard

Displays individual service features in a card format.

**Props:**
- `feature: ServiceFeature` - Feature data
- `index: number` - Index for animation delay

### ServiceDetailSection

Renders detailed content sections with alternating layouts.

**Props:**
- `section: ServiceDetailSection` - Section data
- `index: number` - Index for layout alternation
- `variant?: 'default' | 'alternate'` - Layout variant

### ServiceHighlights

Displays key highlights in a 3-column grid.

**Props:**
- `highlights: ServiceHighlight[]` - Array of highlights

### TestimonialsSection

Renders client testimonials in a 2-column grid.

**Props:**
- `testimonials: Testimonial[]` - Array of testimonials

## Design Features

- **Glass Morphism**: Modern glassmorphic cards with backdrop blur
- **Smooth Animations**: Fade-in and slide animations with staggered delays
- **Responsive Design**: Mobile-first, works on all screen sizes
- **Hover Effects**: Interactive hover states on cards and buttons
- **Gradient Backgrounds**: Beautiful gradient overlays
- **Brand Colors**: Uses project's brand color (#CA1411)

## Example: BPO Services

The BPO Services page (`/services/bpo-services`) is a complete example showing:
- 6 main service features
- 6 detailed sections
- 7 additional services
- 3 highlights
- 2 testimonials
- CTA section

## Adding New Services

1. Create data file in `serviceData/`
2. Register in `serviceData/index.ts`
3. Page automatically available at `/services/{slug}`

## Customization

All components use Tailwind CSS classes and can be easily customized. The design system follows the project's existing patterns:
- Brand color: `#CA1411`
- Hover color: `#CA1411`
- Glass effects with backdrop blur
- Smooth transitions and animations

## Notes

- SVG icon paths should be provided for feature icons
- Images are optional but recommended for detail sections
- Testimonials can include avatar URLs or will use initials
- All text content supports multi-line formatting




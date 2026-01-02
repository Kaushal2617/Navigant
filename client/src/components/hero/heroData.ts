import type { HeroSlide } from '../services/serviceTypes';

// BPO Services hero slides data
export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: 'BPO Services',
    subtitle: 'Streamline your business operations with our comprehensive BPO solutions',
    location: 'Global Delivery Centers',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80',
    imageAlt: 'BPO Services - Business Process Outsourcing',
    primaryButton: {
      text: 'GET STARTED',
      href: '/services/bpo-services',
      onClick: () => console.log('Get Started clicked'),
    },
    secondaryButton: {
      text: 'LEARN MORE',
      href: '/services',
      onClick: () => console.log('Learn More clicked'),
    },
  },
  {
    id: 2,
    title: 'Digital Workers',
    subtitle: 'Leverage AI-powered automation to transform your workforce',
    location: '24/7 Available',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80',
    imageAlt: 'Digital Workers - AI Automation',
    primaryButton: {
      text: 'EXPLORE SOLUTIONS',
      href: '/services/digital-workers',
    },
    secondaryButton: {
      text: 'CONTACT US',
      href: '/contact',
    },
  },
  {
    id: 3,
    title: 'IT Services & Support',
    subtitle: 'Comprehensive IT solutions to drive your business forward',
    location: 'Worldwide Coverage',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
    imageAlt: 'IT Services - Technology Solutions',
    primaryButton: {
      text: 'VIEW SERVICES',
      href: '/services/it-services',
    },
    secondaryButton: {
      text: 'REQUEST QUOTE',
      href: '/contact',
    },
  },
  {
    id: 4,
    title: 'Finance & Accounting',
    subtitle: 'Expert financial management and accounting services for your business',
    location: 'Certified Professionals',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80',
    imageAlt: 'Finance & Accounting Services',
    primaryButton: {
      text: 'GET STARTED',
      href: '/services/finance-accounting',
    },
    secondaryButton: {
      text: 'MORE INFO',
      href: '/services',
    },
  },
];


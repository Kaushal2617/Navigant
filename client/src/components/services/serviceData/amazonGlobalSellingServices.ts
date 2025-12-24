import type { ServiceData } from '../serviceTypes';

export const amazonGlobalSellingServicesData: ServiceData = {
  id: 'amazon-global-selling',
  slug: 'amazon-global-selling',
  name: 'Amazon Global Selling',
  title: 'Amazon Global Selling Services',
  subtitle: 'Expand your business globally with expert Amazon marketplace management and seller support services.',
  description:
    'Navigant provides comprehensive Amazon Global Selling services to help businesses establish, manage, and scale their presence on Amazon marketplaces worldwide. From account setup to order fulfillment, we handle all aspects of your Amazon seller journey.',

  heroSlides: [
    {
      id: 1,
      title: 'Global Marketplace Expansion',
      subtitle: 'Launch and manage your products across multiple Amazon marketplaces worldwide',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
      imageAlt: 'Amazon global selling',
    },
    {
      id: 2,
      title: 'Product Listing & Optimization',
      subtitle: 'Create compelling product listings that rank higher and convert better',
      image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&q=80',
      imageAlt: 'Product listing optimization',
    },
    {
      id: 3,
      title: 'Order Management & Fulfillment',
      subtitle: 'Streamline order processing, inventory management, and customer service',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
      imageAlt: 'Order fulfillment',
    },
  ],

  aboutSection: {
    title: 'Navigant Amazon Global Selling Services',
    content:
      'Amazon Global Selling opens doors to millions of customers across the world. However, managing multiple marketplaces, product listings, inventory, and customer service can be overwhelming. Navigant offers end-to-end Amazon seller support services to help you navigate the complexities of global e-commerce, optimize your listings for better visibility, manage inventory efficiently, and provide exceptional customer service—all while you focus on growing your business.',
  },

  industries: [
    {
      id: 'account-setup',
      name: 'Account Setup & Registration',
      description: 'Complete Amazon seller account setup, registration, and compliance across global marketplaces.',
      icon: '📝',
    },
    {
      id: 'product-listing',
      name: 'Product Listing & Optimization',
      description: 'Create optimized product listings with SEO-friendly content, images, and A+ content.',
      icon: '📦',
    },
    {
      id: 'inventory-management',
      name: 'Inventory Management',
      description: 'Real-time inventory tracking, stock management, and replenishment across marketplaces.',
      icon: '📊',
    },
    {
      id: 'order-fulfillment',
      name: 'Order Fulfillment',
      description: 'Order processing, shipping coordination, and FBA/FBM management.',
      icon: '🚚',
    },
    {
      id: 'customer-service',
      name: 'Customer Service',
      description: '24/7 customer support, review management, and issue resolution.',
      icon: '💬',
    },
    {
      id: 'advertising-ppc',
      name: 'Advertising & PPC',
      description: 'Amazon PPC campaign management, sponsored ads, and performance optimization.',
      icon: '📈',
    },
  ],

  highlights: [
    {
      id: 'multi-marketplace',
      title: 'Multi-Marketplace Expertise',
      description: 'Experience managing Amazon seller accounts across US, Mexico, Canada, and other global marketplaces.',
      icon: '🌍',
    },
    {
      id: 'amazon-certified',
      title: 'Amazon Certified Team',
      description: 'Trained professionals with deep knowledge of Amazon seller policies, algorithms, and best practices.',
      icon: '✅',
    },
    {
      id: 'scalable-operations',
      title: 'Scalable Operations',
      description: 'Services that scale with your business from startup seller to enterprise-level operations.',
      icon: '📈',
    },
    {
      id: 'data-driven',
      title: 'Data-Driven Optimization',
      description: 'Analytics and reporting to track performance, identify opportunities, and optimize ROI.',
      icon: '📊',
    },
  ],

  detailSections: [
    {
      id: 'account-setup-management',
      title: 'Account Setup & Management',
      content:
        'We handle complete Amazon seller account setup, registration, and ongoing management across multiple marketplaces. Our team ensures compliance with Amazon policies, manages account health metrics, and resolves any account-related issues to keep your business running smoothly.',
      image: '/images/account-setup-management.jpg',
      imageAlt: 'Account Setup & Management',
      features: [
        'Amazon seller account registration and verification',
        'Multi-marketplace account setup (US, Mexico, Canada, etc.)',
        'Account health monitoring and compliance management',
        'Tax and legal documentation support',
        'Account suspension prevention and reinstatement assistance',
      ],
    },
    {
      id: 'product-listing-optimization',
      title: 'Product Listing & Optimization',
      content:
        'Create compelling, SEO-optimized product listings that rank higher in Amazon search results and convert visitors into customers. We craft keyword-rich titles, bullet points, descriptions, and A+ content that showcase your products effectively.',
      image: '/images/product-listing-optimization.jpg',
      imageAlt: 'Product Listing & Optimization',
      features: [
        'Keyword research and SEO optimization',
        'Product title, bullet points, and description writing',
        'A+ Content and Enhanced Brand Content creation',
        'Product image optimization and infographics',
        'Backend search terms and category optimization',
      ],
    },
    {
      id: 'inventory-order-management',
      title: 'Inventory & Order Management',
      content:
        'Maintain optimal inventory levels across marketplaces with real-time tracking and automated replenishment. We manage order processing, coordinate with fulfillment centers, and ensure timely delivery to customers.',
      image: '/images/inventory-order-management.jpg',
      imageAlt: 'Inventory & Order Management',
      features: [
        'Real-time inventory tracking and management',
        'Multi-marketplace inventory synchronization',
        'Order processing and fulfillment coordination',
        'FBA (Fulfillment by Amazon) and FBM management',
        'Stock replenishment and forecasting',
      ],
    },
    {
      id: 'customer-service-support',
      title: 'Customer Service & Support',
      content:
        'Provide exceptional customer service that builds trust and drives positive reviews. Our team handles customer inquiries, manages reviews and ratings, resolves issues, and maintains your seller reputation.',
      image: '/images/customer-service-support.jpg',
      imageAlt: 'Customer Service & Support',
      features: [
        '24/7 customer inquiry handling',
        'Review and rating management',
        'Return and refund processing',
        'A-to-Z claim management',
        'Seller feedback and performance monitoring',
      ],
    },
    {
      id: 'advertising-ppc-management',
      title: 'Advertising & PPC Management',
      content:
        'Maximize your visibility and sales with strategic Amazon advertising campaigns. We manage Sponsored Products, Sponsored Brands, and Display Ads to drive traffic and improve conversion rates.',
      features: [
        'Amazon PPC campaign setup and optimization',
        'Sponsored Products and Sponsored Brands management',
        'Keyword bidding and budget optimization',
        'Performance tracking and ROI analysis',
        'A/B testing and campaign refinement',
      ],
    },
  ],

  additionalServices: [
    {
      id: 'brand-registry',
      title: 'Amazon Brand Registry',
      content: 'Assistance with Amazon Brand Registry enrollment to protect your brand and unlock advanced selling features.',
    },
    {
      id: 'catalog-management',
      title: 'Catalog Management',
      content: 'Bulk product uploads, catalog updates, and product data management across multiple SKUs.',
    },
    {
      id: 'performance-analytics',
      title: 'Performance Analytics & Reporting',
      content: 'Comprehensive reporting on sales, inventory, advertising performance, and marketplace insights.',
    },
    {
      id: 'competitor-analysis',
      title: 'Competitor Analysis',
      content: 'Market research and competitor analysis to identify opportunities and optimize pricing strategies.',
    },
  ],

  features: [
    {
      id: 'amazon-expertise',
      title: 'Amazon Expertise',
      shortDescription: 'Deep knowledge of Amazon algorithms, policies, and marketplace dynamics.',
    },
    {
      id: 'multi-channel',
      title: 'Multi-Channel Support',
      shortDescription: 'Manage multiple Amazon marketplaces and integrate with other sales channels.',
    },
    {
      id: 'cost-effective',
      title: 'Cost-Effective Solutions',
      shortDescription: 'Reduce operational costs while scaling your Amazon business efficiently.',
    },
  ],

  testimonials: [],

  cta: {
    title: 'Start Selling Globally on Amazon',
    description: 'Let us help you establish and grow your presence on Amazon marketplaces worldwide.',
    primaryButton: {
      text: 'Get Started',
      href: '/contact',
    },
    showForm: true,
  },
};


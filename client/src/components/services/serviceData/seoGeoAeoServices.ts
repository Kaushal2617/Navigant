import type { ServiceData } from '../serviceTypes';

export const seoGeoAeoServicesData: ServiceData = {
  id: 'seo-geo-aeo',
  slug: 'seo-geo-aeo',
  name: 'SEO | GEO | AEO Managed Services',
  title: 'SEO | GEO | AEO Managed Services by Navigant',
  subtitle:
    'We engineer your visibility across search engines, AI assistants, and answer platforms so your brand is discovered everywhere your audience searches.',
  description:
    "In today's digital landscape, search is no longer limited to Google. Customers discover brands through AI-powered platforms like ChatGPT, Google Gemini, Perplexity, and Bing Copilot. Navigant helps your brand stay visible everywhere through integrated SEO, GEO, and AEO execution.",

  heroSlides: [
    {
      id: 1,
      title: 'SEO | GEO | AEO Managed Services by Navigant',
      subtitle:
        'We do not just optimize for search engines - we build your presence across search, AI, and answer platforms.',
      image: '/servicebanner/digitalmarketing.jpg',
      imageAlt: 'SEO GEO AEO Managed Services',
    },
  ],

  aboutSection: {
    title: 'A Unified Search Visibility Engine',
    content:
      'Search behavior has changed. Users now move between traditional search engines, AI assistants, and direct-answer experiences. Our managed service combines SEO, GEO, and AEO in one strategy so your content ranks, gets cited, and becomes the answer users trust.',
  },

  industries: [
    {
      id: 'seo-pillar',
      name: 'Search Engine Optimization (SEO)',
      description: 'Improve rankings and organic traffic on Google and Bing with technical, content, and authority optimization.',
      icon: '🔍',
    },
    {
      id: 'geo-pillar',
      name: 'Generative Engine Optimization (GEO)',
      description: 'Increase brand visibility inside AI-generated responses across modern generative platforms.',
      icon: '🤖',
    },
    {
      id: 'aeo-pillar',
      name: 'Answer Engine Optimization (AEO)',
      description: 'Own high-intent answers through snippets, PAA, voice search, and structured content architecture.',
      icon: '💬',
    },
    {
      id: 'ai-visibility-analytics',
      name: 'AI Visibility Analytics',
      description: 'Track ranking, citation, and answer-surface performance across search and AI discovery platforms.',
      icon: '📈',
    },
  ],

  detailSections: [
    {
      id: 'seo-services',
      title: 'Search Engine Optimization (SEO)',
      content:
        'Drive consistent organic traffic and improve rankings on Google and Bing with a comprehensive SEO operating model that aligns technical health, search intent, and content performance.',
      image: '/digital/searchengineoptimization.jpg',
      imageAlt: 'Search Engine Optimization',
      features: [
        'Technical SEO including site speed, indexing, and Core Web Vitals',
        'Keyword research and search intent mapping',
        'On-page optimization for meta tags, headings, and internal linking',
        'Content creation for blogs, landing pages, and SEO-focused articles',
        'High-quality link building and digital PR',
        'Local SEO and eCommerce SEO support where relevant',
        'Result: higher rankings, more organic traffic, and lower cost per lead',
      ],
    },
    {
      id: 'geo-services',
      title: 'Generative Engine Optimization (GEO)',
      content:
        'AI tools now recommend brands directly instead of only ranking websites. We optimize your brand entity, authority signals, and AI-readable content so your business is surfaced in generative responses.',
      image: '/digital/socialmedia.jpg',
      imageAlt: 'Generative Engine Optimization',
      features: [
        'Visibility strategy for ChatGPT, Google Gemini, Perplexity AI, and Bing Copilot',
        'Brand entity optimization with Knowledge Graph and structured references',
        'AI citation strategy and authority building across trusted sources',
        'Content formatted for AI retrieval with Q&A and fact-backed structure',
        'Prompt simulation testing for real brand-query response behavior',
        'Competitor AI visibility tracking and share-of-voice monitoring',
        'Result: more AI mentions, stronger authority, and higher AI share-of-voice',
      ],
    },
    {
      id: 'aeo-services',
      title: 'Answer Engine Optimization (AEO)',
      content:
        'Win direct answers and zero-click opportunities by structuring your content for featured snippets, voice assistants, and conversational search experiences.',
      image: '/digital/facebook.jpg',
      imageAlt: 'Answer Engine Optimization',
      features: [
        'Featured snippet and position-zero optimization',
        'FAQ design with schema markup and structured data implementation',
        'Voice search optimization for Alexa, Siri, and Google Assistant',
        'Knowledge panel and entity-strengthening support',
        'Conversational query targeting and answer-first content design',
        'Result: higher zero-click visibility, niche authority, and stronger brand trust',
      ],
    },
  ],

  highlights: [
    {
      id: 'integrated-search',
      title: 'Integrated SEO + GEO + AEO',
      description: 'One unified execution model instead of disconnected search initiatives.',
      icon: '1',
    },
    {
      id: 'managed-delivery',
      title: 'Fully Managed Delivery',
      description: 'Strategy, implementation, optimization, and reporting handled end-to-end.',
      icon: '2',
    },
    {
      id: 'platform-coverage',
      title: 'Multi-Platform Coverage',
      description: 'Built for search engines, AI assistants, and answer surfaces together.',
      icon: '3',
    },
    {
      id: 'outcome-focused',
      title: 'Outcome-Focused Execution',
      description: 'Measured against traffic growth, visibility, authority, and lead quality.',
      icon: '4',
    },
  ],

  additionalServices: [
    {
      id: 'technical-audits',
      title: 'Technical Search Audits',
      content: 'Crawlability, indexation, site architecture, and performance audits with clear implementation roadmaps.',
    },
    {
      id: 'content-clusters',
      title: 'Topic Cluster Content Programs',
      content: 'Intent-driven content systems designed for ranking, citation, and answer extraction.',
    },
    {
      id: 'schema-implementation',
      title: 'Structured Data Implementation',
      content: 'Schema strategy and deployment to strengthen machine readability and rich-result eligibility.',
    },
  ],

  features: [
    {
      id: 'cross-platform-visibility',
      title: 'Cross-Platform Visibility',
      shortDescription: 'Show up where users search, ask, and validate decisions.',
    },
    {
      id: 'entity-and-authority',
      title: 'Entity and Authority Growth',
      shortDescription: 'Build durable trust signals across search and AI ecosystems.',
    },
    {
      id: 'full-funnel-impact',
      title: 'Full-Funnel Impact',
      shortDescription: 'Connect visibility gains to traffic quality, lead generation, and conversion outcomes.',
    },
  ],

  testimonials: [],

  cta: {
    title: 'Build Your Search and AI Visibility Advantage',
    description:
      'Partner with Navigant for managed SEO, GEO, and AEO services that keep your brand discoverable across modern search journeys.',
    primaryButton: {
      text: 'Talk to Our Team',
      href: '/contact',
    },
    showForm: true,
  },
};

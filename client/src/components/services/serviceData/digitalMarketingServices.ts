import type { ServiceData } from '../serviceTypes';

export const digitalMarketingServicesData: ServiceData = {
  id: 'digital-marketing',
  slug: 'digital-marketing',
  name: 'Digital Marketing',
  title: 'Digital Marketing Services',
  subtitle: 'Full-funnel performance marketing to attract, convert, and retain customers.',
  description:
    'Navigant delivers data-driven digital marketing across SEO, paid media, social, content, and marketing automation—aligned to revenue goals and optimized continuously for ROI.',

  heroSlides: [
    {
      id: 1,
      title: 'Performance-Driven Growth',
      subtitle: 'Campaigns engineered to hit revenue and pipeline goals, not just clicks.',
      image: 'https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?w=1200&q=80',
      imageAlt: 'Performance marketing dashboard',
    },
    {
      id: 2,
      title: 'SEO & Content That Ranks',
      subtitle: 'Technical SEO plus authoritative content to win high-intent traffic.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80',
      imageAlt: 'SEO and content planning',
    },
    {
      id: 3,
      title: 'Paid Media That Converts',
      subtitle: 'Optimized PPC and paid social to capture demand efficiently.',
      image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1200&q=80',
      imageAlt: 'Paid media management',
    },
    {
      id: 4,
      title: 'Automation & Analytics',
      subtitle: 'Lifecycle automation and analytics to personalize, measure, and scale.',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80',
      imageAlt: 'Marketing automation and analytics',
    },
  ],

  aboutSection: {
    title: 'Navigant Digital Marketing',
    content:
      'We combine channel expertise with rigorous experimentation to grow your pipeline and revenue. From strategy to execution, we ship fast, test constantly, and optimize every touchpoint to improve CAC, LTV, and ROAS.',
  },

  industries: [
    {
      id: 'linkedin-marketing',
      name: 'LinkedIn Marketing',
      description: 'LinkedIn is the world’s largest professional network—build presence, authority, and pipeline.',
      icon: '🔗',
    },
    {
      id: 'facebook-advertising',
      name: 'Facebook Advertising',
      description: 'High-reach, targeted campaigns across Facebook/Instagram to drive demand and conversions.',
      icon: '📘',
    },
    {
      id: 'seo',
      name: 'Search Engine Optimization',
      description: 'Technical and on-page SEO to improve visibility, traffic, and conversions.',
      icon: '🔍',
    },
    {
      id: 'social-optimization',
      name: 'Social Media Optimization',
      description: 'Always-on social presence with optimized content to engage, nurture, and convert.',
      icon: '📣',
    },
  ],

  highlights: [
    {
      id: 'full-funnel',
      title: 'Full-Funnel Execution',
      description: 'SEO, paid, social, content, CRO, and automation aligned to shared KPIs.',
      icon: '🧭',
    },
    {
      id: 'experimentation',
      title: 'Test-and-Learn Culture',
      description: 'Structured experimentation to improve conversion, ROAS, and CAC/LTV.',
      icon: '🧪',
    },
    {
      id: 'analytics',
      title: 'Analytics First',
      description: 'Clean tracking, dashboards, and attribution so decisions are data-led.',
      icon: '📊',
    },
    {
      id: 'speed',
      title: 'Speed to Value',
      description: 'Fast launches with continuous optimization and weekly insight loops.',
      icon: '⚡',
    },
  ],

  detailSections: [
    {
      id: 'linkedin-marketing-detail',
      title: 'LinkedIn Marketing',
      content:
        'Turn LinkedIn into a consistent lead-generation engine. We act as your done-for-you outbound team, reaching out to 50 targeted prospects daily—so you focus on closing while we handle prospecting, connections, and conversation starters.',
      image: '/digital/LinkedIn.jpg',
      imageAlt: 'LinkedIn Marketing',
      features: [
        'Profile Optimization – Rewrite to clearly show who you help, the problem you solve, and the CTA.',
        'Targeted Prospecting – Qualified audiences by role, industry, company size, and location.',
        'Daily Outreach – Connect, message, and engage with ideal prospects; hand off interested leads to you.',
        'Results – Typical outcomes: 60–70% connection acceptance and 25–35% response rates for predictable pipeline.',
        'We open the conversations. You close the deals.',
      ],
    },
    {
      id: 'facebook-advertising-detail',
      title: 'Facebook Advertising',
      content:
        'Maximize your Facebook presence and generate quality leads with a systematic, data-driven strategy. We build precise audiences, launch high-impact ads, and nurture every lead to increase conversions.',
      image: '/digital/facebook.jpg',
      imageAlt: 'Facebook Advertising',
      features: [
        'Targeted Audience Building: Advanced Facebook targeting to reach ideal prospects by interest, location, and intent.',
        'High-Impact Ad Creation: Scroll-stopping ads with compelling copy/visuals; created with your approval and room for high-performing ideas.',
        'Landing Pages & Sales Funnels: Automated lead gen systems with landing pages/funnels; winning ads scaled for ROI.',
        'Follow-Up & Lead Nurturing: Automated email follow-ups to convert leads and build a long-term asset.',
      ],
    },
    {
      id: 'search-engine-optimization-detail',
      title: 'Search Engine Optimization',
      content:
        "Modern SEO demands a holistic, strategic, and tactical approach across where your audience searches—Google, Yahoo, Bing, app stores, and more. We build durable search presence, avoid gimmicks, and scale rankings cost-effectively over time with hands-on, senior SEO expertise.",
      image: '/digital/searchengineoptimization.jpg',
      imageAlt: 'Search Engine Optimization',
      features: [
        'Holistic, modern SEO: strategic thinking + tactical execution for durable growth.',
        'Cross-platform visibility: optimize across Google, Yahoo, Bing, app stores, and where your audience searches.',
        "No gimmicks: avoid short-term tricks (e.g., guaranteed page-one, bulk links); focus on sustainable results.",
        'Phased scaling: establish strong search presence, then steadily expand to improve results.',
        'Expert team: seasoned SEO professionals with deep, hands-on experience.',
      ],
    },
    {
      id: 'social-media-optimization-detail',
      title: 'Social Media Optimization',
      content:
        'SMO is now core to performance marketing. We build and optimize social presence to reach decision-makers, drive qualified traffic, and convert clicks into revenue—keeping your brand visible, relevant, and trusted across networks.',
      image: '/digital/socialmedia.jpg',
      imageAlt: 'Social Media Optimization',
      features: [
        'Audience-first SMO: target decision-makers across major networks (LinkedIn, X/Twitter, Facebook, etc.).',
        'Traffic to revenue: strategies focused on conversions, not vanity metrics.',
        'Brand visibility & trust: keep profiles active with informative, on-brand content to build loyalty.',
        'Packages & customization: scalable SMO programs with updates, analytics, and 24/7 reporting options.',
        'Transparent collaboration: shared plans, regular reports, and adaptive tactics to meet goals and budget.',
      ],
    },
  ],

  additionalServices: [
    {
      id: 'email-sms',
      title: 'Email & SMS Marketing',
      content: 'Lifecycle and promotional campaigns with segmentation, personalization, and deliverability best practices.',
    },
    {
      id: 'creative',
      title: 'Creative Production',
      content: 'Ad creatives, video snippets, and on-brand assets optimized for each channel.',
    },
    {
      id: 'marketplaces',
      title: 'Marketplace Marketing',
      content: 'Support for Amazon and other marketplaces to extend reach and conversions.',
    },
    {
      id: 'dashboards',
      title: 'Analytics & Dashboards',
      content: 'Custom reporting for ROAS, CAC/LTV, channel performance, and experimentation velocity.',
    },
  ],

  features: [
    {
      id: 'omnichannel',
      title: 'Omnichannel Thinking',
      shortDescription: 'Channels work together with consistent messaging and shared goals.',
    },
    {
      id: 'governance',
      title: 'Governance & Quality',
      shortDescription: 'Brand-safe execution with QA, checklists, and monitoring.',
    },
    {
      id: 'scalable',
      title: 'Built to Scale',
      shortDescription: 'Playbooks and processes that scale budgets and geos confidently.',
    },
  ],

  testimonials: [],

  cta: {
    title: 'Let’s Accelerate Your Growth',
    description: 'Get a digital marketing plan aligned to your goals, budget, and timeline.',
    primaryButton: {
      text: 'Start a Project',
      href: '/contact',
    },
    showForm: true,
  },
};


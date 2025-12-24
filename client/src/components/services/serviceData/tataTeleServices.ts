import type { ServiceData } from '../serviceTypes';

export const tataTeleServicesData: ServiceData = {
  id: 'tata-tele-services',
  slug: 'tata-tele-services',
  name: 'Tata Tele Business Services',
  title: 'Tata Tele Business Services (TTBS)',
  subtitle: 'Connectivity, collaboration, cloud, security, and digital solutions for India’s enterprises.',
  description:
    'TTBS, the digital solutions arm of Tata Teleservices Ltd., delivers ICT services that keep businesses connected, secure, and future-ready—spanning connectivity, collaboration, cloud, security, IoT, and marketing solutions.',

  heroSlides: [
    {
      id: 1,
      title: 'Digital Solutions Under Tata Group',
      subtitle: 'Connectivity and digital transformation for resilient, scalable operations.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80',
      imageAlt: 'Digital solutions',
    },
    {
      id: 2,
      title: 'Industry-Focused Offerings',
      subtitle: 'BFSI, IT/ITeS, manufacturing, services, education, healthcare, retail, and more.',
      image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1200&q=80',
      imageAlt: 'Industry solutions',
    },
    {
      id: 3,
      title: '25+ Years, 60+ Cities, 1,500+ Partners',
      subtitle: 'Comprehensive ICT portfolio with nationwide reach.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
      imageAlt: 'Network reach',
    },
  ],

  aboutSection: {
    title: 'Why Choose TTBS',
    content:
      'A comprehensive ICT portfolio across connectivity, collaboration, cloud, SaaS, security, IoT, and marketing, backed by 25+ years of experience, 60+ cities of coverage, and 1,500+ partners—focused on making enterprises future-ready.',
  },

  industries: [
    { id: 'bfsi', name: 'BFSI', description: 'Secure, compliant digital capabilities for CX and efficiency.', icon: '💳' },
    { id: 'it', name: 'IT/ITeS', description: 'Seamless, secure collaboration and connectivity.', icon: '💻' },
    { id: 'manufacturing', name: 'Manufacturing', description: 'Visibility and communication across supply chains.', icon: '🏭' },
    { id: 'services', name: 'Services', description: 'Connectivity and marketing reach for service businesses.', icon: '🤝' },
    { id: 'education', name: 'Education', description: 'Digital classroom, collaboration, and secure access.', icon: '🎓' },
    { id: 'healthcare', name: 'Healthcare', description: 'Secure patient engagement and digital access.', icon: '🏥' },
    { id: 'retail', name: 'Retail', description: 'Omni-channel experiences with cloud and connectivity.', icon: '🛍️' },
    { id: 'media', name: 'Telecom, Media & Entertainment', description: 'Scalable, always-on solutions.', icon: '📡' },
  ],

  highlights: [
    {
      id: 'experience',
      title: '25+ Years Experience',
      description: 'Decades of enterprise connectivity and communication expertise.',
      icon: '🏅',
    },
    {
      id: 'portfolio',
      title: 'Comprehensive ICT Portfolio',
      description: 'Connectivity, collaboration, cloud, SaaS, security, IoT, and marketing solutions.',
      icon: '🧭',
    },
    {
      id: 'reach',
      title: 'Nationwide Reach',
      description: 'Operations across 60+ cities with 1,500+ partners.',
      icon: '🌐',
    },
    {
      id: 'future-ready',
      title: 'Future-Ready Focus',
      description: 'Innovation and customer-centric solutions to “Do Big”.',
      icon: '🚀',
    },
  ],

  detailSections: [
    {
      id: 'connectivity',
      title: 'Connectivity Solutions',
      content:
        'Reliable, secure connectivity across locations for always-on operations.',
      image: '/tatatele/Connectivitysolutions.jpg',
      imageAlt: 'Connectivity Solutions',
      features: [
        'High-speed internet and business broadband',
        'Internet Leased Lines',
        'SIP Trunks and voice services',
        'SmartOffice broadband bundles',
        'Smart VPN and MPLS networking',
      ],
    },
    {
      id: 'cloud-saas',
      title: 'Cloud & SaaS Services',
      content:
        'Cloud infrastructure, SaaS, and managed services for efficiency and scale.',
      image: '/tatatele/Cloud&saasservices.png',
      imageAlt: 'Cloud & SaaS Services',
      features: [
        'Cloud infrastructure and management',
        'SaaS tools like Microsoft 365',
        'Cloud migration and optimization',
        'Managed cloud services for SMEs',
      ],
    },
    {
      id: 'collaboration',
      title: 'Communication & Collaboration',
      content:
        'Unified communication and conferencing for seamless teamwork.',
      image: '/tatatele/Communication&collaboration.png',
      imageAlt: 'Communication & Collaboration',
      features: [
        'Unified communications platforms',
        'Smartflo cloud communications',
        'Zoom and conferencing solutions',
      ],
    },
    {
      id: 'security',
      title: 'Security & Managed Services',
      content:
        'Resilient, secure networking and cybersecurity to protect operations.',
      image: '/tatatele/Security&managedservices.png',
      imageAlt: 'Security & Managed Services',
      features: [
        'Endpoint security and MFA',
        'Virtual firewall and web security',
        'Managed security and monitoring',
      ],
    },
    {
      id: 'data-advanced',
      title: 'Data & Advanced Solutions',
      content:
        'Hybrid connectivity and IoT to enable modern data-driven operations.',
      image: '/tatatele/Data&advancedsolutions.png',
      imageAlt: 'Data & Advanced Solutions',
      features: [
        'EZ Cloud Connect',
        'Hybrid cloud and data connectivity',
        'IoT-enabling technologies',
      ],
    },
    {
      id: 'marketing',
      title: 'Marketing & Customer Engagement',
      content:
        'Digital engagement tools that improve customer communication and reach.',
      image: '/tatatele/Marketing&customerengagement.png',
      imageAlt: 'Marketing & Customer Engagement',
      features: [
        'Toll-free services',
        'Hosted IVR and smart routing',
        'SMS and digital engagement solutions',
      ],
    },
  ],

  additionalServices: [
    {
      id: 'transformation',
      title: 'Digital Transformation Partner',
      content:
        'TTBS designs scalable, secure, and efficient digital systems so enterprises can focus on growth.',
    },
    {
      id: 'customer-experience',
      title: 'Customer Experience',
      content:
        'Tailored data solutions, business continuity support, reliable voice and conferencing, and responsive service.',
    },
  ],

  features: [
    { id: 'efficiency', title: 'Operational Efficiency', shortDescription: 'Improve productivity and cost through optimized ICT.' },
    { id: 'security', title: 'Security & Compliance', shortDescription: 'Enhanced security with compliant, resilient networking.' },
    { id: 'support', title: '24x7 Support', shortDescription: 'Managed services and support continuity for critical workloads.' },
  ],

  testimonials: [],

  cta: {
    title: 'Modernize with Tata Tele Business Services',
    description: 'Explore connectivity, cloud, collaboration, and security solutions tailored to your business.',
    primaryButton: { text: 'Talk to an Expert', href: '/contact' },
    showForm: true,
  },
};


import type { ServiceData } from '../serviceTypes';

export const itServicesData: ServiceData = {
  id: 'it-services',
  slug: 'it-services',
  name: 'IT Services',
  title: 'IT & Digital Operations Services',
  subtitle: 'Secure, scalable IT operations and digital services built for GCC and global enterprises.',
  description:
    'Navigant Technologies (NTPL) delivers ISO-certified managed IT, cloud, cybersecurity, apps, data, and service desk operations with 24x7 coverage, governance, and compliance baked in.',

  heroSlides: [
    {
      id: 1,
      title: 'Trusted Outsourcing Partner Since 2003',
      subtitle: '650+ professionals, 200+ clients, and 22+ years of managed services delivery.',
      image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1200&q=80',
      imageAlt: 'IT operations dashboard',
    },
    {
      id: 2,
      title: 'Secure & Compliant by Design',
      subtitle: 'ISO-certified controls, GCC-aligned compliance, and continuous monitoring.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
      imageAlt: 'Security operations center',
    },
    {
      id: 3,
      title: 'Build–Operate–Transfer for GCC',
      subtitle: 'BOT model with governance, ramp-up, and knowledge transfer readiness.',
      image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&q=80',
      imageAlt: 'Team collaboration',
    },
  ],

  aboutSection: {
    title: 'Global IT & Digital Operations Provider',
    content:
      'We run secure, SLA-driven IT operations across infrastructure, cloud, applications, security, data, and support. Our GCC-ready model includes Arabic-speaking resources, nearshore options, and centralized program governance.',
  },

  industries: [
    { id: 'ecommerce', name: 'E-commerce', description: 'Scalable, high-availability stacks for online retail.', icon: '🛍️' },
    { id: 'finance', name: 'Finance', description: 'Secure, compliant environments for BFSI workloads.', icon: '💳' },
    { id: 'education', name: 'Education', description: 'Reliable platforms for learning and administration.', icon: '🎓' },
    { id: 'government', name: 'Government', description: 'Governed, resilient services for public sector.', icon: '🏛️' },
    { id: 'telecom', name: 'Telecom', description: 'Networks, NOC, and customer platforms at scale.', icon: '📡' },
    { id: 'software', name: 'Software & IT', description: 'Product engineering, cloud, and DevOps support.', icon: '💻' },
  ],

  highlights: [
    { id: 'secure', title: 'Secure & Compliant', description: 'ISO-certified, GCC regulatory alignment, continuous monitoring.', icon: '🛡️' },
    { id: '24x7', title: '24x7 Operations', description: 'Multi-shift NOC/SOC, service desk, and on-call coverage.', icon: '🌐' },
    { id: 'governance', title: 'Governance & SLAs', description: 'SLA/OLA governance, KPI reporting, and risk management.', icon: '📊' },
    { id: 'scalable', title: 'Scalable Delivery', description: 'Rapid ramp-up with specialized pods and POD-based delivery.', icon: '🚀' },
  ],

  detailSections: [
    {
      id: 'infrastructure-noc',
      title: 'IT Infrastructure & NOC Services',
      content:
        '24x7 monitoring and operations with incident, problem, and change management to keep services available and performant.',
      features: [
        'Performance and availability monitoring',
        'Incident, problem, and change management',
        'Capacity planning and DR/BCP readiness',
        'Network & connectivity (MPLS, VPN, private circuits)',
      ],
    },
    {
      id: 'cloud-devops',
      title: 'Cloud Engineering & DevOps',
      content:
        'Cloud migration, optimization, and platform operations with automation-first delivery and IaC.',
      image: '/images/cloud-engineering-devops.jpg',
      imageAlt: 'Cloud Engineering & DevOps',
      features: [
        'Cloud migration and cost optimization',
        'CI/CD pipelines and platform engineering',
        'Infrastructure as Code (IaC)',
        'Regional cloud platform expertise',
      ],
    },
    {
      id: 'applications',
      title: 'Application Development & Maintenance',
      content:
        'Custom development, legacy modernization, and automation to keep apps secure, current, and reliable.',
      image: '/images/application-development-maintenance.jpg',
      imageAlt: 'Application Development & Maintenance',
      features: [
        'Custom application development',
        'Legacy modernization and refactoring',
        'Automation and enhancements',
        'SRE-style reliability practices',
      ],
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity & Compliance',
      content:
        'Security operations, risk assessments, and compliance aligned to GCC frameworks with proactive monitoring.',
      image: '/images/cybersecurity-compliance.jpg',
      imageAlt: 'Cybersecurity & Compliance',
      features: [
        'Security operations and monitoring',
        'Risk assessments and remediation',
        'Compliance with GCC security frameworks',
        'Vulnerability management and hardening',
      ],
    },
    {
      id: 'data-analytics',
      title: 'Data & Analytics',
      content:
        'Data governance, reporting, and analytics aligned to sovereignty and privacy requirements.',
      image: '/images/data-analytics.jpg',
      imageAlt: 'Data & Analytics',
      features: [
        'Data governance and quality',
        'Reporting and dashboarding',
        'Analytics with data sovereignty alignment',
        'Integration and ETL pipelines',
      ],
    },
    {
      id: 'qa-testing',
      title: 'QA & Testing',
      content:
        'Functional, regression, and performance testing including multilingual and payment gateway scenarios.',
      image: '/images/qa-testing.jpg',
      imageAlt: 'QA & Testing',
      features: [
        'Functional and regression testing',
        'Performance and load testing',
        'Multilingual and regional payment testing',
        'Test automation frameworks',
      ],
    },
    {
      id: 'service-desk',
      title: 'IT Helpdesk & Managed IT Operations',
      content:
        'End-user support and managed IT operations with clear SLAs, escalation paths, and user satisfaction tracking.',
      image: '/images/it-helpdesk-managed-operations.jpg',
      imageAlt: 'IT Helpdesk & Managed IT Operations',
      features: [
        'L1/L2/L3 helpdesk coverage',
        'Endpoint management and patching',
        'SLA-based response and resolution',
        'User experience and CSAT tracking',
      ],
    },
    {
      id: 'bpo-kpo',
      title: 'BPO & KPO Services',
      content:
        'Process outsourcing with governance, quality, and continuous improvement baked in.',
      features: [
        'Multishift, 24x7 delivery',
        'Governance and SLA/OLA management',
        'QA, training, and performance reviews',
        'Scalable pods across functions',
      ],
    },
  ],

  additionalServices: [
    {
      id: 'bot',
      title: 'GCC Build–Operate–Transfer (BOT)',
      content:
        'Build: infra, controls, hiring, documentation. Operate: SLA-based managed ops, KPI tracking. Transfer: documentation, KT, handover, readiness sign-off.',
    },
    {
      id: 'governance',
      title: 'Governance & Compliance',
      content:
        'GCC country-specific adherence, SLA/OLA governance, risk mitigation, and audit-ready reporting.',
    },
    {
      id: 'pm-office',
      title: 'Program Management Office',
      content:
        'Centralized GCC PMO with playbooks, reporting, and continuous improvement cadences.',
    },
  ],

  features: [
    { id: 'experience', title: '22+ Years Experience', shortDescription: '2003-founded, ISO-certified, 200+ clients.' },
    { id: 'coverage', title: 'GCC-Aligned Coverage', shortDescription: 'Multi-shift, Arabic-speaking resources, nearshore options.' },
    { id: 'automation', title: 'Automation-Ready', shortDescription: 'Digital-first mindset with IaC, CI/CD, and SRE practices.' },
  ],

  testimonials: [],

  cta: {
    title: 'Let’s Modernize and Secure Your IT',
    description: 'Talk with our IT and digital operations experts about a GCC-ready delivery model.',
    primaryButton: { text: 'Talk to an Expert', href: '/contact' },
    showForm: true,
  },
};



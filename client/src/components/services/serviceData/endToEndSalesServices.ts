import type { ServiceData } from '../serviceTypes';

export const endToEndSalesServicesData: ServiceData = {
  id: 'end-to-end-sales',
  slug: 'end-to-end-sales',
  name: 'End to End Sales',
  title: 'End to End Sales Services',
  subtitle: 'From prospecting to closed-won—one accountable team.',
  description:
    'Navigant provides a turnkey sales engine: prospecting, qualification, demos, proposals, and deal closure with clear revenue metrics and tight collaboration with your team.',

  heroSlides: [
    {
      id: 1,
      title: 'Full-Cycle Ownership',
      subtitle: 'We handle pipeline creation, demos, and closing so your team scales faster.',
      image: 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=1200&q=80',
      imageAlt: 'Sales team collaborating',
    },
    {
      id: 2,
      title: 'Predictable Pipeline',
      subtitle: 'Structured cadences, qualification, and forecasting for reliable revenue.',
      image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&q=80',
      imageAlt: 'Pipeline dashboard',
    },
    {
      id: 3,
      title: 'Performance Transparency',
      subtitle: 'Weekly reporting on meetings, SQLs, win rates, and cycle time.',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1200&q=80',
      imageAlt: 'Performance analytics',
    },
  ],

  aboutSection: {
    title: 'An Extension of Your Revenue Team',
    content:
      'We plug into your stack, run outbound, qualify inbound, host demos, build proposals, negotiate, and close. You get accountable revenue partners, not just lead suppliers.',
  },

  industries: [
    {
      id: 'saas',
      name: 'SaaS & Technology',
      description: 'Sell into product, IT, security, and revenue teams with tailored messaging.',
      icon: '💻',
    },
    {
      id: 'professional-services',
      name: 'Professional Services',
      description: 'Win B2B service deals with solution-focused discovery and proposals.',
      icon: '🤝',
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing',
      description: 'Engage operations and procurement stakeholders across regions.',
      icon: '🏭',
    },
    {
      id: 'finserv',
      name: 'Financial Services',
      description: 'Navigate regulated buyers with compliant, value-led conversations.',
      icon: '💳',
    },
  ],

  highlights: [
    {
      id: 'full-cycle',
      title: 'Full-Cycle Coverage',
      description: 'Prospecting, SDR, AE, and AM motions covered with clear handoffs.',
      icon: '🔄',
    },
    {
      id: 'qualification',
      title: 'Tight Qualification',
      description: 'BANT/MEDAIC frameworks to keep pipelines clean and close rates high.',
      icon: '🎯',
    },
    {
      id: 'ops',
      title: 'RevOps Discipline',
      description: 'CRM hygiene, forecasting, and playbook adherence baked into delivery.',
      icon: '⚙️',
    },
    {
      id: 'enablement',
      title: 'Sales Enablement',
      description: 'Decks, battle cards, and objection handling to accelerate deals.',
      icon: '📚',
    },
  ],

  detailSections: [
    {
      id: 'pipeline',
      title: 'Pipeline Creation',
      content:
        'Multi-channel outbound plus inbound follow-up to keep top-of-funnel healthy. We build and maintain target lists, cadences, and deliverability.',
      image: '/images/pipeline-creation.jpg',
      imageAlt: 'Pipeline Creation',
      features: [
        'ICP/TAM research and list governance',
        'Outbound cadences across email, phone, and social',
        'Deliverability monitoring and domain health',
        'Weekly pipeline reviews with your team',
      ],
    },
    {
      id: 'discovery',
      title: 'Discovery & Demos',
      content:
        'Experienced reps run discovery, demos, and tailored walkthroughs, capturing pains, stakeholders, and next steps directly in your CRM.',
      image: '/images/discovery-demos.jpg',
      imageAlt: 'Discovery & Demos',
      features: [
        'Structured discovery notes and qualification',
        'Demo tailoring by persona and use case',
        'Objection handling and mutual action plans',
        'CRM updates and call summaries',
      ],
    },
    {
      id: 'closing',
      title: 'Proposals & Closing',
      content:
        'Proposal creation, pricing alignment, and negotiation support aimed at shortening cycle time and protecting margin.',
      image: '/images/proposals-closing.jpg',
      imageAlt: 'Proposals & Closing',
      features: [
        'Proposal and SOW drafts aligned to scope',
        'Competitive positioning and ROI narratives',
        'Legal/Procurement coordination support',
        'Win/loss analysis and playbook updates',
      ],
    },
  ],

  additionalServices: [
    {
      id: 'sales-ops',
      title: 'Sales Operations',
      content: 'CRM configuration, dashboards, and process automation for clean data and visibility.',
    },
    {
      id: 'training',
      title: 'Sales Training',
      content: 'Call coaching, QA, and enablement sessions to upskill teams.',
    },
    {
      id: 'account-management',
      title: 'Account Management',
      content: 'Renewals, expansions, and NPS programs to grow existing accounts.',
    },
  ],

  features: [
    {
      id: 'accountable',
      title: 'Accountable to Revenue',
      shortDescription: 'Meetings, SQLs, win rate, and ARR targets tracked weekly.',
    },
    {
      id: 'senior-reps',
      title: 'Senior Reps',
      shortDescription: 'Experienced SDRs/AEs who can handle complex, multi-stakeholder deals.',
    },
    {
      id: 'process',
      title: 'Process-Driven',
      shortDescription: 'Playbooks, QA, and RevOps guardrails built into every motion.',
    },
  ],

  testimonials: [],

  cta: {
    title: 'Scale Your Sales Engine',
    description: 'Get a full-cycle sales team with transparent reporting and predictable outcomes.',
    primaryButton: {
      text: 'Talk to Sales',
      href: '/contact',
    },
    showForm: true,
  },
};



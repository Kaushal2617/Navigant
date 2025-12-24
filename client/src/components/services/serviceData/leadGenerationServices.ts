import type { ServiceData } from '../serviceTypes';

export const leadGenerationServicesData: ServiceData = {
  id: 'lead-generation',
  slug: 'lead-generation',
  name: 'Lead Generation',
  title: 'Lead Generation Services',
  subtitle: 'Build predictable pipeline with compliant, multi-channel outbound.',
  description:
    'Navigant designs and runs revenue-focused lead generation programs that combine clean data, human research, and multi-channel outreach to book meetings with your ideal customers.',

  heroSlides: [
    {
      id: 1,
      title: 'Sales-Ready Pipeline',
      subtitle: 'Qualified meetings with ICP buyers, not just form fills.',
      image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&q=80',
      imageAlt: 'Sales pipeline dashboard',
    },
    {
      id: 2,
      title: 'Multi-Channel Outreach',
      subtitle: 'Email, phone, and social cadences tuned for response and show rates.',
      image: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?w=1200&q=80',
      imageAlt: 'Outbound outreach',
    },
    {
      id: 3,
      title: 'Data You Can Trust',
      subtitle: 'Research, enrichment, and verification before any campaign goes live.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
      imageAlt: 'Data quality checks',
    },
  ],

  aboutSection: {
    title: 'Outbound That Feels Personal',
    content:
      'We act as an extension of your sales team—building ICPs, sourcing and enriching contacts, crafting messaging, and running compliant cadences. You get booked meetings and clear insights on what’s working.',
  },

  industries: [
    {
      id: 'saas',
      name: 'SaaS & Technology',
      description: 'Land decision makers across product, IT, and revenue functions.',
      icon: '💻',
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      description: 'Engage providers, payers, and health-tech buyers with compliant outreach.',
      icon: '🏥',
    },
    {
      id: 'finserv',
      name: 'Financial Services',
      description: 'Target banking, insurance, and fintech stakeholders with precise messaging.',
      icon: '💳',
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing',
      description: 'Reach operations, procurement, and supply chain leaders globally.',
      icon: '🏭',
    },
  ],

  highlights: [
    {
      id: 'qualified',
      title: 'Qualified, Not Just Volume',
      description: 'Multi-step validation to ensure contacts match ICP and intent.',
      icon: '✅',
    },
    {
      id: 'multichannel',
      title: 'Multi-Channel Cadences',
      description: 'Email, phone, and social touches sequenced for replies and shows.',
      icon: '📡',
    },
    {
      id: 'rev-metrics',
      title: 'Revenue Metrics',
      description: 'Track meetings, show rates, SQLs, and pipeline—not vanity metrics.',
      icon: '📈',
    },
    {
      id: 'compliance',
      title: 'Compliance First',
      description: 'Opt-out management, deliverability care, and thoughtful messaging.',
      icon: '🛡️',
    },
  ],

  detailSections: [
    {
      id: 'icp-research',
      title: 'ICP, TAM & Research',
      content:
        'Define ICP, segment TAM, and build target lists with firmographic, technographic, and intent signals. Every contact is enriched and verified before outreach.',
      image: '/images/icp-tam-research.jpg',
      imageAlt: 'ICP, TAM & Research',
      features: [
        'ICP and persona mapping workshops',
        'Contact sourcing, enrichment, and validation',
        'Intent and trigger-based targeting',
        'List governance and deliverability checks',
      ],
    },
    {
      id: 'messaging',
      title: 'Messaging & Cadences',
      content:
        'Channel-specific messaging that feels relevant and personalized. We run structured experiments on subject lines, calls-to-action, and steps per persona.',
      image: '/images/messaging-cadences.jpg',
      imageAlt: 'Messaging & Cadences',
      features: [
        'Persona-based sequencing across email, phone, and social',
        'A/B testing on copy, CTAs, and timing',
        'Compliance-aware outreach with opt-outs honored',
        'Weekly reporting on replies, shows, and learnings',
      ],
    },
    {
      id: 'handoff',
      title: 'Qualification & Handoff',
      content:
        'We book meetings directly on your calendar or hand off qualified responses with context so your team can focus on closing.',
      image: '/images/qualification-handoff.jpg',
      imageAlt: 'Qualification & Handoff',
      features: [
        'Meeting booking with calendar alignment',
        'Lead qualification notes and context',
        'CRM-ready exports and tagging',
        'Post-meeting feedback loop to refine targeting',
      ],
    },
  ],

  additionalServices: [
    {
      id: 'deliverability',
      title: 'Inbox & Deliverability',
      content: 'Domain warming, sending infrastructure, and monitoring to keep inbox placement high.',
    },
    {
      id: 'intent-data',
      title: 'Intent Data Programs',
      content: 'Layer in intent feeds and triggers to prioritize accounts showing active demand.',
    },
    {
      id: 'sales-support',
      title: 'Sales Enablement',
      content: 'Scripts, battle cards, and objection handling content for your reps.',
    },
  ],

  features: [
    {
      id: 'icp',
      title: 'ICPs That Convert',
      shortDescription: 'Research-backed ICPs to focus on accounts most likely to buy.',
    },
    {
      id: 'quality',
      title: 'Verified Data',
      shortDescription: 'Enrichment and validation to reduce bounces and improve reply rates.',
    },
    {
      id: 'cadence',
      title: 'Proven Cadences',
      shortDescription: 'Structured outreach sequences tuned for replies and meetings.',
    },
  ],

  testimonials: [],

  cta: {
    title: 'Let’s Build Your Pipeline',
    description: 'Get a lead generation plan aligned to your ICP, goals, and budgets.',
    primaryButton: {
      text: 'Book a Call',
      href: '/contact',
    },
    showForm: true,
  },
};



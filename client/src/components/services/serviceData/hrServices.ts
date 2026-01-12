import type { ServiceData } from '../serviceTypes';

export const hrServicesData: ServiceData = {
  id: 'hr-services',
  slug: 'hr-services',
  name: 'RPO & Staffing Services',
  title: 'HR Outsourcing & Recruitment Services',
  subtitle: 'End-to-end HR, recruitment, and automation to scale teams faster with compliance.',
  description:
    'Navigant Technologies (NTPL) delivers full-spectrum HR outsourcing—RPO, staffing, HR operations, analytics, and automation—so you can hire faster, improve employee experience, and maintain compliant operations across regions.',

  heroSlides: [
    {
      id: 1,
      title: 'Trusted Outsourcing Partner Since 2003',
      subtitle: '22+ years, 650+ professionals, ISO-certified delivery across functions.',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80',
      imageAlt: 'Team collaboration',
    },
    {
      id: 2,
      title: 'Scale Recruitment with RPO & Staffing',
      subtitle: 'Permanent and contract hiring with clear SLAs, sourcing, and screening.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80',
      imageAlt: 'Recruitment discussion',
    },
    {
      id: 3,
      title: 'HR Automation & Analytics',
      subtitle: 'Bots for parsing, scheduling, onboarding, payroll validation, and reporting.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
      imageAlt: 'Automation dashboard',
    },
  ],

  aboutSection: {
    title: 'Global HR & Recruitment Partner',
    content:
      'We run hiring, HR operations, analytics, and employee engagement with governance, SLAs, and compliance. Our digital workers automate repetitive HR tasks so your people focus on strategic priorities.',
  },

  industries: [
    { id: 'bpo-kpo', name: 'BPO & KPO', description: 'High-volume hiring and governed operations.', icon: '🎧' },
    { id: 'it-services', name: 'IT & Tech', description: 'Skilled tech talent with fast ramp and compliance.', icon: '💻' },
    { id: 'finance', name: 'Finance & Accounting', description: 'Controlled hiring and HR ops for regulated functions.', icon: '💳' },
    { id: 'healthcare', name: 'Healthcare Support', description: 'Compliant staffing and HR processes for care teams.', icon: '🏥' },
    { id: 'digital', name: 'Digital Marketing', description: 'Specialist recruitment and ops for performance teams.', icon: '📈' },
    { id: 'research', name: 'Market Research', description: 'Analyst recruitment and governed delivery pods.', icon: '📊' },
  ],

  highlights: [
    {
      id: 'experience',
      title: 'Proven Since 2003',
      description: '22+ years, ISO-certified, 200+ clients served globally.',
      icon: '🏅',
    },
    {
      id: 'speed',
      title: 'Faster Hiring',
      description: 'RPO playbooks and automation to cut time-to-hire and cost per hire.',
      icon: '⚡',
    },
    {
      id: 'compliance',
      title: 'Compliance-Driven',
      description: 'SLA-based delivery with GCC labor law, VAT, and audit alignment.',
      icon: '🛡️',
    },
    {
      id: 'automation',
      title: 'Automation & Analytics',
      description: 'Bots for parsing, scheduling, onboarding, payroll validation, and reporting.',
      icon: '🤖',
    },
  ],

  detailSections: [
    {
      id: 'rpo',
      title: 'Recruitment Process Outsourcing (RPO)',
      content:
        'End-to-end sourcing, screening, interviewing, and offer management with SLA-backed delivery for permanent and contract roles.',
      image: '/HR/rpo.jpg',
      imageAlt: 'Recruitment Process Outsourcing (RPO)',
      features: [
        'Full-cycle sourcing and screening',
        'Interview scheduling and coordination',
        'Offer management and joining follow-ups',
        'Role-specific playbooks and SLAs',
      ],
    },
    {
      id: 'staffing',
      title: 'Permanent & Contract Staffing',
      content:
        'Flexible staffing to ramp specialized or high-volume roles with governed onboarding and compliance.',
      image: '/HR/staffing.jpg',
      imageAlt: 'Permanent & Contract Staffing',
      features: [
        'Permanent, contract, and project-based staffing',
        'Background checks and documentation',
        'Onboarding workflow management',
        'Workforce ramp plans for growth targets',
      ],
    },
    {
      id: 'hr-ops',
      title: 'HR Operations & Compliance',
      content:
        'Day-to-day HR administration with policy adherence, documentation, and risk controls aligned to GCC labor and tax requirements.',
      image: '/HR/hrops.jpg',
      imageAlt: 'HR Operations & Compliance',
      features: [
        'Employee records and HRMS administration',
        'Policy, audit, and compliance governance',
        'SLA-driven case and query management',
        'RACI and controls for HR processes',
      ],
    },
    {
      id: 'automation',
      title: 'HR Automation & Analytics',
      content:
        'Digital workers and dashboards that reduce manual effort, improve accuracy, and give leadership real-time visibility.',
      image: '/HR/automation.jpg',
      imageAlt: 'HR Automation & Analytics',
      features: [
        'Resume parsing and interview scheduling bots',
        'Onboarding workflow automation',
        'Payroll validation automation',
        'HR analytics and reporting dashboards',
      ],
    },
    {
      id: 'engagement',
      title: 'Employee Engagement & L&D',
      content:
        'Communication, training, and development programs that improve retention and performance.',
      image: '/HR/engagement.jpg',
      imageAlt: 'Employee Engagement & L&D',
      features: [
        'Internal communication programs',
        'Training and development tracks',
        'Engagement surveys and action plans',
        'Career pathing and skill development support',
      ],
    },
    {
      id: 'payroll',
      title: 'Payroll, Expenses & Compliance Support',
      content:
        'Accurate, compliant payroll and expense processes with clear controls and reporting.',
      image: '/HR/payroll.jpg',
      imageAlt: 'Payroll, Expenses & Compliance Support',
      features: [
        'Payroll processing and validation checks',
        'Expense management and reimbursements',
        'Tax filing support and statutory compliance',
        'Audit-ready reports and reconciliations',
      ],
    },
  ],

  additionalServices: [
    {
      id: 'digital-workers',
      title: 'Digital Workers for HR',
      content:
        'Bots for parsing, scheduling, onboarding, payroll validation, and analytics to cut cycle times and errors.',
    },
    {
      id: 'governance',
      title: 'Governance & Compliance',
      content:
        'SLA-driven operations with RACI, audits, GCC labor law alignment, and data security controls.',
    },
    {
      id: 'fte-models',
      title: 'GCC Delivery & FTE Models',
      content:
        '100 / 250 / 500 FTE models with defined roles (managers, leads, analysts, recruiters) and KPI/SLA frameworks.',
    },
  ],

  features: [
    { id: 'scalable', title: 'Scalable Pods', shortDescription: 'Rapid ramp with specialized HR and recruitment pods.' },
    { id: 'analytics', title: 'Data-Driven HR', shortDescription: 'Dashboards for hiring velocity, cost, and experience.' },
    { id: 'experience', title: 'Multi-Industry', shortDescription: 'BPO, IT, finance, healthcare, digital, and research.' },
  ],

  testimonials: [],

  cta: {
    title: 'Let’s Scale Your Hiring & HR Operations',
    description: 'Talk to our HR outsourcing experts about a compliant, SLA-driven model.',
    primaryButton: { text: 'Talk to an Expert', href: '/contact' },
    showForm: true,
  },
};



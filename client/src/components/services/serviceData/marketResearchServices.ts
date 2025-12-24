import type { ServiceData } from '../serviceTypes';

export const marketResearchServicesData: ServiceData = {
  id: 'market-research',
  slug: 'market-research',
  name: 'Market Research',
  title: 'Market Research & Insights Services',
  subtitle: 'Turn customer data, surveys, and market signals into clear decisions and growth strategies.',
  description:
    'Navigant offers end-to-end market research services—from survey design and data collection to analytics and insight reporting—so you can make confident, evidence-based decisions.',

  heroSlides: [
    {
      id: 1,
      title: 'Understand Your Customers Better',
      subtitle: 'Qualitative and quantitative research that uncovers motivations, pain points, and opportunities.',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80',
      imageAlt: 'Team analyzing charts and data',
    },
    {
      id: 2,
      title: 'Data-Driven Go-To-Market',
      subtitle: 'Test concepts, pricing, and messaging before you scale, backed by statistically sound results.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
      imageAlt: 'Market research and strategy planning',
    },
    {
      id: 3,
      title: 'Research Operations at Scale',
      subtitle: 'Leverage Navigant’s trained teams to run multi-country, multi-language studies reliably.',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&q=80',
      imageAlt: 'Global research operations',
    },
  ],

  aboutSection: {
    title: 'Navigant Market Research Services',
    content:
      'Whether you are contemplating a new product category or finding ways to battle your business challenges, insights from a well-executed market research strategy can come to your rescue. As a Marketing outsourcing company, Navigant offers a full suite of market research operations and data analytics solutions to clients.',
  },

  industries: [
    {
      id: 'bfsi',
      name: 'BFSI',
      description: 'Customer experience, product adoption, and NPS tracking for banks, insurers, and fintechs.',
      icon: '🏦',
    },
    {
      id: 'healthcare-pharma',
      name: 'Healthcare & Pharma',
      description: 'Patient, physician, and payer research to guide therapy launches and access strategies.',
      icon: '🩺',
    },
    {
      id: 'ecommerce',
      name: 'Ecommerce',
      description: 'Online shopping behavior, conversion optimization, and digital customer journey insights.',
      icon: '🛒',
    },
    {
      id: 'technology',
      name: 'Technology & SaaS',
      description: 'Buyer research, churn analysis, and product feedback loops for tech companies.',
      icon: '💻',
    },
  ],

  highlights: [
    {
      id: 'global-coverage',
      title: 'Global Coverage',
      description: 'Multi-country, multi-language research operations with centralized quality control.',
      icon: '🌍',
    },
    {
      id: 'research-trained-team',
      title: 'Research-Trained Teams',
      description: 'Agents and analysts trained on research protocols, bias reduction, and respondent experience.',
      icon: '🎓',
    },
    {
      id: 'quality-assurance',
      title: 'Strong Quality Assurance',
      description: 'Script checks, pilot runs, and continuous monitoring to keep data clean and reliable.',
      icon: '✅',
    },
    {
      id: 'flexible-engagement',
      title: 'Flexible Engagement Models',
      description: 'Project-based or dedicated teams to support agencies, brands, and consulting firms.',
      icon: '🤝',
    },
  ],

  detailSections: [
    {
      id: 'research-outsourcing',
      title: 'Research Outsourcing',
      content:
        'Questionnaire design, programming, tabulation, delivery, secondary research, and reporting handled by expert research teams across methods and formats.',
      image: '/images/research-outsourcing.jpg',
      imageAlt: 'Research Outsourcing',
      features: [
        'Questionnaire Design – Programming simple to complex multi-lingual questionnaires using leading platforms and languages.',
        'Data Tabulation – Cleaning, processing, and tabbing data with industry tools; conversions across Excel, Word, XML, HTML, RTF, and more.',
        'Project Delivery – PMs with cross-industry expertise in panels, scripting, and quant research, spanning secondary and multi-country primary studies.',
        'Secondary Research – Market sizing, competitive landscape, trends, and SWOT analysis for strategic insight.',
        'Reporting – Outputs beyond Word/PPT using advanced tools to tell the story via visuals, audio, and video.',
      ],
    },
    {
      id: 'global-data-management',
      title: 'Global Data Management',
      content:
        'End-to-end research execution: localized questionnaires, programming/hosting, sample sourcing, online and CATI fieldwork, and analysis/reporting—all handled by Navigant.',
      image: '/images/global-data-management.jpg',
      imageAlt: 'Global Data Management',
      features: [
        'Conducting Research – Full-cycle delivery: localize, program/host, source sample, run online + CATI, and deliver analysis and reports.',
        'Panels – High-quality online panels with unique respondent IDs; B2C and B2B coverage across markets with millions of interviews completed over 14+ years.',
        'CATI – In-house team trained to IQCS, MRQSA, and MRS standards; seasoned with hard-to-reach audiences and large-scale CATI/CAWI on leading platforms.',
        'In-Person Interviews – Street/mall intercepts, door-to-door, focus groups, and mystery shopping via trusted local partners worldwide.',
      ],
    },
    {
      id: 'analytics-detail',
      title: 'Analytics',
      content:
        'Advanced analytics on survey and behavioral data—combining statistical models, data mining, and campaign performance analysis to uncover actionable insights.',
      image: '/images/analytics.jpg',
      imageAlt: 'Analytics',
      features: [
        'Survey Analysis – Deep-dive on survey data using techniques like multiple/logistic regression, factor and cluster analysis, segmentation, and conjoint.',
        'Data Mining – Analytics on structured and unstructured data (including free-flowing conversations) to derive outcomes and map social media conversations.',
        'Marketing & Campaign Management – B2B/B2C databases and modern tools to run and optimize large-scale campaigns and advertising programs.',
      ],
    },
    {
      id: 'insight-reporting',
      title: 'Insight Reporting & Visualization',
      content:
        'Translate data into clear narratives, presentations, and dashboards that decision-makers can act on immediately.',
      image: '/images/insight-reporting-visualization.jpg',
      imageAlt: 'Insight Reporting & Visualization',
      features: [
        'Executive summaries and key insight decks',
        'Storytelling with charts, infographics, and dashboards',
        'On-demand analyst support for stakeholder discussions',
      ],
    },
  ],

  // No additionalServices for now; detailSections capture primary offerings
  additionalServices: [],

  features: [
    {
      id: 'process-rigour',
      title: 'Process Rigour',
      shortDescription: 'Documented research SOPs and checklists to protect data quality.',
    },
    {
      id: 'scalable-capacity',
      title: 'Scalable Capacity',
      shortDescription: 'Quickly ramp up teams for large or multi-wave studies.',
    },
    {
      id: 'tool-agnostic',
      title: 'Tool-Agnostic Delivery',
      shortDescription: 'Experience with leading survey, panel, and analytics platforms.',
    },
  ],

  testimonials: [],

  cta: {
    title: 'Discuss Your Next Study',
    description: 'Share your research objectives and timelines, and we’ll recommend a right-sized delivery model.',
    primaryButton: {
      text: 'Schedule a Call',
      href: '/contact',
    },
    showForm: true,
  },
};



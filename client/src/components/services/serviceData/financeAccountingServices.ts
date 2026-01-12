import type { ServiceData } from '../serviceTypes';

export const financeAccountingServicesData: ServiceData = {
  id: 'finance-accounting',
  slug: 'finance-accounting',
  name: 'Finance & Accounting',
  title: 'Finance & Accounting Services',
  subtitle: 'Professional finance and accounting services to streamline your financial operations and drive business growth.',
  description:
    'Navigant offers comprehensive finance and accounting outsourcing services including bookkeeping, tax preparation, financial analysis, and more to help you focus on core business activities.',

  heroSlides: [
    {
      id: 1,
      title: 'Finance & Accounting Services',
      subtitle: 'Comprehensive finance and accounting outsourcing services including bookkeeping, tax preparation, financial analysis, and more to help you focus on core business activities.',
      image: '/servicebanner/account.jpg',
      imageAlt: 'Finance & Accounting Services',
    },
  ],

  aboutSection: {
    title: 'Navigant Finance & Accounting Services',
    content:
      'Managing finance and accounting functions in-house can be time-consuming and resource-intensive. Navigant provides comprehensive finance and accounting outsourcing services that help businesses maintain accurate financial records, ensure compliance, and gain valuable insights from their financial data. Our team of certified accountants and financial experts deliver reliable, scalable solutions tailored to your business needs.',
  },

  industries: [
    {
      id: 'procure-to-pay',
      name: 'Procure to Pay Services',
      description: 'An efficient Procure to Pay process helps your organization better manage your working capital and cash flow.',
      icon: '🤝',
    },
    {
      id: 'order-to-cash',
      name: 'Order to Cash',
      description: 'A fast and efficient order to Cash or Accounts Receivables cycle ensures a high cash flow for a company. Navigant is a high-quality Accounts Receivables service provider.',
      icon: '💰',
    },
    {
      id: 'record-to-report',
      name: 'Record to Report',
      description: 'A crucial focus area for CFOs is to digitize the finance function, streamline & simplify processes and establish benchmarks.',
      icon: '📊',
    },
    {
      id: 'cfo-services',
      name: 'CFO Services',
      description: 'Hiring a high salaried CFO is not feasible for the majority of organizations looking to manage their F&A services.',
      icon: '👔',
    },
    {
      id: 'mortgage-process',
      name: 'Mortgage Process Outsourcing Services',
      description: 'Mortgage Process outsourcing services - Mortgage loan processing is resource-intensive and outsourcing this task helps organizations focus on core business activities.',
      icon: '🏠',
    },
    {
      id: 'accounting-bookkeeping',
      name: 'Accounting and Bookkeeping Services',
      description: 'Accounting and Bookkeeping Services - Navigant\'s team of experienced financial teams works as a virtual back-office to handle all your accounting needs.',
      icon: '📝',
    },
  ],

  highlights: [
    {
      id: 'certified-experts',
      title: 'Certified Experts',
      description: 'Team of CPA, CA, and financial professionals with extensive industry experience.',
      icon: '🎓',
    },
    {
      id: 'accurate-timely',
      title: 'Accurate & Timely',
      description: 'Precise financial records and reports delivered on schedule to meet your deadlines.',
      icon: '✅',
    },
    {
      id: 'compliance-focused',
      title: 'Compliance-Focused',
      description: 'Stay compliant with tax laws, accounting standards, and regulatory requirements.',
      icon: '🔒',
    },
    {
      id: 'cost-effective',
      title: 'Cost-Effective',
      description: 'Reduce overhead costs while maintaining high-quality financial operations.',
      icon: '💰',
    },
  ],

  detailSections: [
    {
      id: 'procure-to-pay-detail',
      title: 'Procure to Pay Services',
      content:
        'An efficient Procure to Pay process helps your organization better manage your working capital and cash flow, develop strong vendor relationships, save cost and comply with regulatory policies. Our services encompass the entire Procure to Pay services.',
      image: '/finance/Procure.jpg',
      imageAlt: 'Procure to Pay Services',
      features: [
        'Sourcing – Vendor Management, Contract Management, Purchasing, Catalogue Management, Data Management and PO Processing & Helpdesk',
        'Invoice Processing - E-invoicing, Refund Claims, Disbursements, Discounting, Month-end Accruals and Taxation, Vendor Helpdesk',
        'Reporting - Analytics on desired parameters like revenue generated, month-end accruals & cost savings; Regulatory Compliance',
      ],
    },
    {
      id: 'order-to-cash-detail',
      title: 'Order to Cash',
      content:
        'A fast and efficient Order to Cash / Accounts Receivables cycle ensures high cash flow. Navigant Accounts Receivable outsourcing processes invoices quickly and accelerates payments end-to-end.',
      image: '/finance/ordertocash.jpg',
      imageAlt: 'Order to Cash',
      features: [
        'Order Management – Order entry, release & tracking; distribution coordination; inventory management; customer database management.',
        'Credit Control & Invoicing – Credit appraisal and limit management; billing and invoice adjustments; discounts.',
        'Accounts Receivable & Collections – Payment follow-ups; collection processing, reconciliation, bad-debt management (including legal handling); loyalty program management; bank liaison.',
        'Reporting & Analysis – Budgeting and planning (revenue, sales volume, profit forecasts); month-end reporting and analysis of customer/sales trends.',
      ],
    },
    {
      id: 'record-to-report-detail',
      title: 'Record to Report',
      content:
        'A crucial focus area for CFOs is to digitize the finance function, streamline and simplify processes, and establish benchmarks for compliance. As an F&A specialist, we adhere to GAAP and applicable accounting standards to deliver accurate, transparent results across the Record to Report spectrum.',
      image: '/finance/recordtoreport.jpg',
      imageAlt: 'Record to Report',
      features: [
        'General Ledger Accounting – Journal and adjustment entries, period-end accruals, reconciliations.',
        'Fixed Assets – Record additions, disposals, sales, transfers; review WIP; depreciation run and posting.',
        'Period Closing & Reporting – Close sub-ledgers, review accruals, inter-company tally, periodic income statements and balance sheet, statutory reporting, income tax filings, compliance handling.',
        'Treasury – Bank reconciliations, debt management, and reporting.',
      ],
    },
    {
      id: 'cfo-services-detail',
      title: 'CFO Services',
      content:
        'Hiring a high-salaried CFO is not feasible for many organizations. Navigant outsourced CFO services deliver strategic financial leadership with 30–50% cost reduction and full data security—aligning financial strategy to your business goals.',
      image: '/finance/CFO.jpg',
      imageAlt: 'CFO Services',
      features: [
        'Budgets & Forecasting; Financial Analysis & Modeling; Cash Flow Management; KPI analysis.',
        'Collaborating with CPAs, bankers, attorneys, and other stakeholders for holistic financial management.',
        'Building and executing financial strategy to support growth and profitability.',
      ],
    },
    {
      id: 'mortgage-process-detail',
      title: 'Mortgage Process Outsourcing Services',
      content:
        'Mortgage loan processing is resource-intensive and outsourcing this task to a mortgage loan processing company like Navigant results in considerable savings in operational costs and resources as well as a shortened turnaround time. Our highly skilled professionals help you make informed decisions pertaining to the mortgage loan application process from order appraisals to loan closing.',
      image: '/finance/Mortgage.jpg',
      imageAlt: 'Mortgage Process Outsourcing Services',
      features: [
        'Business acquisitions',
        'Appraisal title checks',
        'Underwriting disbursements',
        'Collection services and more',
      ],
    },
    {
      id: 'accounting-bookkeeping-detail',
      title: 'Accounting and Bookkeeping Services',
      content:
        'Navigant team of experienced financial professionals works as a virtual back-office to deliver essential accounting and bookkeeping services. We use popular bookkeeping software like SAGE, MS-Small Business Accounting, QuickBooks, and other spreadsheets. Navigant is an ISO 27001 certified F&A outsourcing company that adheres to GAAP, ensuring high-quality output and stringent security protocols to safeguard all client information.',
      image: '/finance/accounting.jpg',
      imageAlt: 'Accounting and Bookkeeping Services',
      features: [
        'Level 1 Services: Accounting Setup, Income Statements, Balance Sheet creation, Cash Flow/Budgeting, Preparing Financial Statements & Reports, Preparing closing entries, Monthly/Quarterly/Year-End Review, Management Reporting, Variance Analysis & Recommendations',
        'Level 2 Services: Accounts Payable Management, Accounts Receivable Management, Bank Reconciliations, General Ledger Reconciliation, Inventory Management, Revenue Reconciliation with Bank Deposits',
      ],
    },
  ],

  additionalServices: [
    {
      id: 'insurance-claims-processing',
      title: 'Insurance Claims Processing Outsourcing Services',
      content:
        'Outsourcing claims management helps insurers stay focused on core business while handling multiple claims efficiently and accurately. Navigant processes diverse claims across health, life, and general insurance—evaluating authenticity, reviewing amounts, and returning processed claims for settlement while vigilantly flagging fraud.',
    },
    {
      id: 'financial-analysis-reporting',
      title: 'Financial Analysis and Financial Reporting Services',
      content:
        'Qualified analysts prepare periodic financial statements and advise on improving cash flow and income. We support audit, review, and compilation engagements, adhering to IFRS and US GAAP across jurisdictions.',
    },
    {
      id: 'accounts-receivable',
      title: 'Accounts Receivable Management',
      content: 'Improve cash flow with efficient invoicing, payment tracking, and collection processes.',
    },
    {
      id: 'accounts-payable',
      title: 'Accounts Payable Management',
      content: 'Streamline vendor payments, invoice processing, and expense management.',
    },
    {
      id: 'financial-consulting',
      title: 'Financial Consulting',
      content: 'Strategic financial advice and planning to support business growth and profitability.',
    },
  ],

  features: [
    {
      id: 'secure-data',
      title: 'Secure Data Handling',
      shortDescription: 'Bank-level encryption and secure processes to protect your financial data.',
    },
    {
      id: 'cloud-based',
      title: 'Cloud-Based Solutions',
      shortDescription: 'Access your financial data anytime, anywhere with cloud accounting platforms.',
    },
    {
      id: 'scalable-services',
      title: 'Scalable Services',
      shortDescription: 'Services that grow with your business from startup to enterprise level.',
    },
  ],

  testimonials: [],

  cta: {
    title: 'Get Started with Finance & Accounting Services',
    description: 'Contact us to discuss how we can streamline your financial operations and help your business grow.',
    primaryButton: {
      text: 'Schedule a Consultation',
      href: '/contact',
    },
    showForm: true,
  },
};


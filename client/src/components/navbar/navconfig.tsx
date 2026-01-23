export interface NavItem {
  label: string;
  path: string;
  icon?: string;
  hasDropdown?: boolean;
  dropdownItems?: NavItem[];
}

export interface NavConfig {
  logo: string;
  mainNavItems: NavItem[];
  contactNumber: string;
}

export const navConfig: NavConfig = {
  logo: '/logo.png',
  mainNavItems: [
    {
      label: 'Home',
      path: '/',
    },
    {
      label: 'Services',
      path: '/services',
      hasDropdown: true,
      dropdownItems: [
        {
          label: 'BPO Services',
          path: '/services/bpo-services',
        },
        {
          label: 'Amazon Global Selling',
          path: '/services/amazon-global-selling',
        },
        {
          label: 'End to End Sales',
          path: '/services/end-to-end-sales',
        },
        {
          label: 'Lead Generation',
          path: '/services/lead-generation',
        },
        {
          label: 'Ecommerce Management',
          path: '/services/ecommerce-management',
        },
        {
          label: 'Digital Marketing',
          path: '/services/digital-marketing',
        },
        {
          label: 'RPO & Staffing Services',
          path: '/services/hr-services',
        },
        {
          label: 'Healthcare Services',
          path: '/services/healthcare-services',
        },
        {
          label: 'Market Research',
          path: '/services/market-research',
        },
        {
          label: 'Finance & Accounting',
          path: '/services/finance-accounting',
        },
        {
          label: 'IT Services',
          path: '/services/it-services',
        },
       
        {
          label: 'Tata Tele Services',
          path: '/services/tata-tele-services',
        },
      ], // Can be extended or replaced by API
    },
    {
      label: 'About us',
      path: '/about',
    },
    {
      label: 'Careers',
      path: '/careers',
    },
    {
      label: 'Contact',
      path: '/contact',
    },
    {
      label: 'For Employees',
      path: 'https://app.perk.com/login',
    },
    {
      label: 'Explore',
      path: '/explore',
      hasDropdown: true,
      dropdownItems: [
        {
          label: 'Team',
          path: '/team',
        },
        {
          label: 'Case Studies',
          path: '/explore/case-studies',
        },
      ],
    },
  ],
  contactNumber: '+91-93547 39641', // Indian contact number format
};


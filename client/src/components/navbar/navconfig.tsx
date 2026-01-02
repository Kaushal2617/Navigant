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
          label: 'Lead Generation',
          path: '/services/lead-generation',
        },
        {
          label: 'End to End Sales',
          path: '/services/end-to-end-sales',
        },
        {
          label: 'Ecommerce Management',
          path: '/services/ecommerce-management',
        },
        {
          label: 'IT Services',
          path: '/services/it-services',
        },
        {
          label: 'HR Services',
          path: '/services/hr-services',
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


import React, { useState, useEffect } from 'react';
import { navConfig } from './navconfig';
import type { NavItem } from './navconfig';
import Dropdown from '../commons/Dropdown';
import type { DropdownItem } from '../commons/Dropdown';

// Mock services data - temporary until API is ready
const MOCK_SERVICES: NavItem[] = [
  { label: 'BPO Services', path: '/services/bpo-services' },
  { label: 'Tata Tele Services', path: '/services/tata-tele-services' },
  { label: 'Healthcare Services', path: '/services/healthcare-services' },
  { label: 'Market Research', path: '/services/market-research' },
  { label: 'HR Services', path: '/services/hr-services' },
  { label: 'Finance & Accounting', path: '/services/finance-accounting' },
  { label: 'Amazon Global Selling', path: '/services/amazon-global-selling' },
  { label: 'IT Services', path: '/services/it-services' },
  { label: 'Digital Marketing', path: '/services/digital-marketing' },
  { label: 'Ecommerce Management', path: '/services/ecommerce-management' },
  { label: 'Lead Generation', path: '/services/lead-generation' },
  { label: 'End to End Sales', path: '/services/end-to-end-sales' },
];

// Configuration: Set to false to use API instead of mock data
// Currently using mock data until backend API is ready
const USE_MOCK_DATA = true;

// API endpoint for services - update this with your actual API URL
const SERVICES_API_URL = '/api/services';

const Navigation: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [servicesItems, setServicesItems] = useState<NavItem[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fetch services from API or use mock data
  useEffect(() => {
    if (USE_MOCK_DATA) {
      // Use mock data temporarily
      setServicesItems(MOCK_SERVICES);
    } else {
      // Fetch from API
      const fetchServices = async () => {
        try {
          const response = await fetch(SERVICES_API_URL);
          if (response.ok) {
            const data = await response.json();
            setServicesItems(data.map((item: any) => ({
              label: item.name || item.label,
              path: item.path || `/services/${item.slug || item.id}`,
            })));
          } else {
            // If API returns error, fallback to mock data
            console.warn('API returned error, using mock data as fallback');
            setServicesItems(MOCK_SERVICES);
          }
        } catch (error) {
          console.error('Error fetching services:', error);
          // Fallback to mock data on error
          setServicesItems(MOCK_SERVICES);
        }
      };

      fetchServices();
    }
  }, []);

  const handleDropdownToggle = (label: string, isMobile: boolean = false) => {
    if (isMobile) {
      setActiveDropdown(activeDropdown === label ? null : label);
    } else {
      setActiveDropdown(activeDropdown === label ? null : label);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    // Don't close dropdown if mouse is moving to dropdown menu
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (relatedTarget && (
      relatedTarget.closest('.dropdown-menu') || 
      relatedTarget.closest('[data-dropdown]')
    )) {
      return;
    }
    if (!mobileMenuOpen) {
      setActiveDropdown(null);
    }
  };

  const getDropdownItems = (item: NavItem): NavItem[] => {
    if (item.label === 'Services') {
      return servicesItems.length > 0 ? servicesItems : [];
    }
    return item.dropdownItems || [];
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (mobileMenuOpen) {
      setActiveDropdown(null);
    }
  };

  return (
    <nav 
    className="fixed top-0 left-0 right-0 z-50 
            bg-white 
            dark:bg-gray-900 
            border-b border-gray-200 dark:border-gray-700/50
            px-6 py-4 
            shadow-sm"

      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full mx-auto">
        {/* Desktop and Mobile Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4 w-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="no-underline transition-all duration-300 hover:opacity-80 flex items-center">
              <img 
                src={navConfig.logo} 
                alt="Navigant Technologies Logo" 
                className="h-8 sm:h-10 md:h-12 w-auto object-contain"
                onError={(e) => {
                  // Fallback to text if image fails to load
                  const target = e.target as HTMLImageElement;
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <span class="text-xl sm:text-2xl font-bold text-gray-900">
                        <span class="text-gray-900">navi</span>
                        <span class="text-[#CA1411]">g</span>
                        <span class="text-gray-900">ant</span>
                      </span>
                    `;
                  }
                }}
              />
            </a>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex list-none m-0 p-0 gap-6 xl:gap-8 items-center">
            {navConfig.mainNavItems.map((item) => {
              const dropdownItems: DropdownItem[] = getDropdownItems(item).map((navItem) => ({
                label: navItem.label,
                path: navItem.path,
                icon: navItem.icon,
              }));

              if (item.hasDropdown) {
                return (
                  <li key={item.label} className="relative">
                    <Dropdown
                      trigger={
                        <a 
                          href={item.path} 
                          className="no-underline text-black font-medium py-2 px-1 flex items-center gap-1 transition-colors duration-300 hover:text-black text-sm xl:text-base"
                        >
                          {item.label}
                          <span className={`text-xs transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`}>
                            ▼
                          </span>
                        </a>
                      }
                      items={dropdownItems}
                      isOpen={activeDropdown === item.label}
                      onToggle={() => handleDropdownToggle(item.label)}
                      onClose={() => setActiveDropdown(null)}
                      variant="desktop"
                      loading={item.label === 'Services' && servicesItems.length === 0}
                      twoColumns={item.label === 'Services'}
                    />
                  </li>
                );
              }

              return (
                <li key={item.label}>
                  <a 
                    href={item.path} 
                    className="no-underline text-black font-medium py-2 px-1 flex items-center gap-1 transition-colors duration-300 hover:text-black text-sm xl:text-base"
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Desktop Contact Button */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <button 
              style={{ backgroundColor: '#CA1411' }}
              className="text-white hover:text-black border-none py-2.5 px-4 xl:py-3 xl:px-6 rounded-md font-medium cursor-pointer transition-all duration-300 flex items-center gap-2 whitespace-nowrap hover:bg-[#CA1411] hover:-translate-y-0.5 active:translate-y-0 text-sm xl:text-base"
            >
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <a 
                href={`tel:${navConfig.contactNumber}`} 
                style={{ color: '#FFFFFF' }}
                className="no-underline"
              >
                {navConfig.contactNumber}
              </a>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden flex flex-col gap-1.5 p-2 text-black hover:text-black transition-colors"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden w-full overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 sm:px-6 py-4 bg-white border-t border-gray-200">
            <ul className="flex flex-col list-none m-0 p-0 gap-0 w-full">
              {navConfig.mainNavItems.map((item) => {
                const dropdownItems: DropdownItem[] = getDropdownItems(item).map((navItem) => ({
                  label: navItem.label,
                  path: navItem.path,
                  icon: navItem.icon,
                  onClick: () => setMobileMenuOpen(false),
                }));

                if (item.hasDropdown) {
                  return (
                    <li
                      key={item.label}
                      className="relative w-full border-b border-gray-100 last:border-b-0"
                    >
                      <Dropdown
                        trigger={
                          <a 
                            href={item.path} 
                            className="no-underline text-black font-medium py-3 sm:py-4 flex items-center gap-2 transition-colors duration-300 hover:text-black text-base sm:text-lg w-full"
                          >
                            {item.label}
                          </a>
                        }
                        items={dropdownItems}
                        isOpen={activeDropdown === item.label}
                        onToggle={() => handleDropdownToggle(item.label, true)}
                        onClose={() => setActiveDropdown(null)}
                        variant="mobile"
                        loading={item.label === 'Services' && servicesItems.length === 0}
                      />
                    </li>
                  );
                }

                return (
                  <li
                    key={item.label}
                    className="relative w-full border-b border-gray-100 last:border-b-0"
                  >
                    <a 
                      href={item.path} 
                      className="no-underline text-black font-medium py-3 sm:py-4 flex items-center gap-2 transition-colors duration-300 hover:text-black text-base sm:text-lg w-full"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            
            {/* Mobile Contact Button */}
            <div className="mt-4 pt-4 border-t border-gray-200 w-full">
              <button 
                style={{ backgroundColor: '#CA1411' }}
                className="text-white border-none py-3 px-6 rounded-md font-medium cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 w-full hover:bg-[#CA1411] active:scale-95 text-base sm:text-lg"
              >
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <a 
                  href={`tel:${navConfig.contactNumber}`} 
                  style={{ color: '#FFFFFF' }}
                  className="no-underline"
                >
                  {navConfig.contactNumber}
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;


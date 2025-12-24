// Service data registry - import all service data files here
import { bpoServicesData } from './bpoServices';
import { healthcareServicesData } from './healthcareServices';
import { marketResearchServicesData } from './marketResearchServices';
import { financeAccountingServicesData } from './financeAccountingServices';
import { amazonGlobalSellingServicesData } from './amazonGlobalSellingServices';
import { digitalMarketingServicesData } from './digitalMarketingServices';
import { leadGenerationServicesData } from './leadGenerationServices';
import { endToEndSalesServicesData } from './endToEndSalesServices';
import { ecommerceManagementServicesData } from './ecommerceManagementServices';
import { itServicesData } from './itServices';
import { hrServicesData } from './hrServices';
import { tataTeleServicesData } from './tataTeleServices';
import type { ServiceData } from '../serviceTypes';

// Export all service data
export const serviceDataRegistry: Record<string, ServiceData> = {
  'bpo-services': bpoServicesData,
  'healthcare-services': healthcareServicesData,
  'market-research': marketResearchServicesData,
  'finance-accounting': financeAccountingServicesData,
  'amazon-global-selling': amazonGlobalSellingServicesData,
  'digital-marketing': digitalMarketingServicesData,
  'lead-generation': leadGenerationServicesData,
  'end-to-end-sales': endToEndSalesServicesData,
  'ecommerce-management': ecommerceManagementServicesData,
  'it-services': itServicesData,
  'hr-services': hrServicesData,
  'tata-tele-services': tataTeleServicesData,
  // Add more services here as they are created
  // 'digital-workers': digitalWorkersData,
  // 'it-services': itServicesData,
};

// Helper function to get service data by slug
export const getServiceDataBySlug = (slug: string): ServiceData | undefined => {
  return serviceDataRegistry[slug];
};

// Export individual service data
export {
  bpoServicesData,
  healthcareServicesData,
  marketResearchServicesData,
  financeAccountingServicesData,
  amazonGlobalSellingServicesData,
  digitalMarketingServicesData,
  leadGenerationServicesData,
  endToEndSalesServicesData,
  ecommerceManagementServicesData,
  itServicesData,
  hrServicesData,
  tataTeleServicesData,
};




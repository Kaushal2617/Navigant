/**
 * Case Studies Data
 * 
 * This file contains all case study information displayed on the website.
 * This data can be easily updated through an admin panel in the future.
 */

// Case Study type definition
export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  readMoreLink: string;
  alt: string;
}

// Case studies data - can be updated through admin panel
export const caseStudiesData: CaseStudy[] = [
  {
    id: 'case-study-1',
    title: 'Transforming Customer Support Operations',
    description: 'How Navigant helped a leading e-commerce platform reduce customer support costs by 40% while improving response times and customer satisfaction scores through our comprehensive BPO solutions.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80',
    category: 'BPO Services',
    readMoreLink: '/case-studies/customer-support',
    alt: 'Customer Support Transformation Case Study',
  },
  {
    id: 'case-study-2',
    title: 'Digital Transformation Success Story',
    description: 'A Fortune 500 company achieved 60% operational efficiency improvement by implementing Navigant\'s digital worker solutions, automating repetitive tasks and freeing up resources for strategic initiatives.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80',
    category: 'Digital Workers',
    readMoreLink: '/case-studies/digital-transformation',
    alt: 'Digital Transformation Case Study',
  },
  {
    id: 'case-study-3',
    title: 'Healthcare BPO Excellence',
    description: 'A major healthcare provider streamlined their medical billing and patient support operations with Navigant, resulting in 50% faster claim processing and 95% accuracy rates in medical coding.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&q=80',
    category: 'Healthcare Services',
    readMoreLink: '/case-studies/healthcare-bpo',
    alt: 'Healthcare BPO Case Study',
  },
];

// Section configuration
export const caseStudiesSectionConfig = {
  title: 'Case Studies & Customer Stories | NAVIGANT',
  subtitle: 'Our professionals have an in-depth knowledge of business outsourcing. Read the outstanding case studies prepared by our professionals at Navigant.',
};

// Helper functions
export const getCaseStudies = (): CaseStudy[] => {
  return caseStudiesData;
};

export const getCaseStudyById = (id: string): CaseStudy | undefined => {
  return caseStudiesData.find(caseStudy => caseStudy.id === id);
};


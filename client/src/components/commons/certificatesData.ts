/**
 * Certificates Data
 * 
 * This file contains all certificate information displayed on the website.
 * This data can be easily updated through an admin panel in the future.
 * 
 * To add/update certificates:
 * 1. Add a new certificate object to the certificates array
 * 2. Each certificate should have: id, name, image, alt, and issuer
 * 3. Images should be uploaded to your assets folder or use external URLs
 */

export interface Certificate {
  id: string;
  name: string;
  image: string;
  alt?: string;
  issuer?: string;
  year?: string;
  description?: string;
}

// Demo certificates - Replace with actual certificate data
export const certificatesData: Certificate[] = [
  {
    id: 'certificate-1',
    name: 'ISO 14001:2015',
    image: '/Certificate1.jpg',
    alt: 'ISO 14001:2015 Environmental Management System Certification',
    issuer: 'Environmental Management System',
    year: '2015',
    description: 'Certified for Environmental Management',
  },
  {
    id: 'certificate-2',
    name: 'SOC 2 Type II',
    image: '/Certificate2.jpg',
    alt: 'SOC 2 Type II Certification',
    issuer: 'Service Organization Control',
    year: '2013',
    description: 'SOC 2 Type II Certified for Security, Availability, and Confidentiality',
  },
  {
    id: 'certificate-3',
    name: 'PCI DSS Compliant',
    image: '/certificate3.jpg',
    alt: 'PCI DSS Compliance Certification',
    issuer: 'Payment Card Industry Data Security Standard',
    year: '2018',
    description: 'PCI DSS Level 1 Compliant',
  },
  {
    id: 'amazon-certificate',
    name: 'Amazon Certificate',
    image: '/AmazonCertificate.jpg',
    alt: 'Amazon Certificate',
    issuer: 'Amazon',
    year: '2025',
    description: 'Amazon Partnership Certificate',
  },
];

// Section configuration - can be updated through admin panel
export const certificatesSectionConfig = {
  title: 'Our Certifications',
  subtitle: 'Navigant Technologies Private Limited (NTPL) is a ISO 9001:2008, ISO 14001:2004, ISO 20001:2011 and ISO 27001:2005 certified company.',
  showYear: true,
  showDescription: false, // Set to true if you want to show descriptions
};

// Helper function to get certificates (useful for admin panel integration)
export const getCertificates = (): Certificate[] => {
  return certificatesData;
};

// Helper function to get certificate by ID
export const getCertificateById = (id: string): Certificate | undefined => {
  return certificatesData.find(cert => cert.id === id);
};


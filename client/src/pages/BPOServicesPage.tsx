import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import ServiceDetailPage from '../components/services/ServiceDetailPage';
import type { ServiceData } from '../components/services/serviceTypes';
import { bpoServicesData } from '../components/services/serviceData/bpoServices';
import { tataTeleServicesData } from '../components/services/serviceData/tataTeleServices';

const BPOServicesPage: React.FC = () => {
  // Use the Tata Tele layout/content (cards-heavy) but align ids/slug/name to BPO
  const transformedData: ServiceData = {
    ...tataTeleServicesData,
    id: bpoServicesData.id,
    slug: bpoServicesData.slug,
    name: bpoServicesData.name,
    title: bpoServicesData.title,
    // remove contact form + reviews per request
    testimonials: [],
    cta: undefined,
  };

  return (
    <AppLayout>
      <ServiceDetailPage serviceData={transformedData} />
    </AppLayout>
  );
};

export default BPOServicesPage;

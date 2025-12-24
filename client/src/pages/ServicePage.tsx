import React from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import ServiceDetailPage from '../components/services/ServiceDetailPage';
import { getServiceDataBySlug } from '../components/services/serviceData';

const ServicePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
            <p className="text-gray-600 mb-8">The service you're looking for doesn't exist.</p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-[#CA1411] text-white font-semibold rounded-lg hover:bg-[#CA1411] transition-colors"
            >
              Go Home
            </a>
          </div>
        </div>
      </AppLayout>
    );
  }

  const serviceData = getServiceDataBySlug(slug);

  if (!serviceData) {
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
            <p className="text-gray-600 mb-8">The service "{slug}" doesn't exist.</p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-[#CA1411] text-white font-semibold rounded-lg hover:bg-[#CA1411] transition-colors"
            >
              Go Home
            </a>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <ServiceDetailPage serviceData={serviceData} />
    </AppLayout>
  );
};

export default ServicePage;




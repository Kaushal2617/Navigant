import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import CaseStudiesSection from '../components/commons/CaseStudiesSection';

const CaseStudiesPage: React.FC = () => {
  return (
    <AppLayout>
      <CaseStudiesSection showViewAllButton={false} enableHorizontalScroll={false} isFullPage={true} />
    </AppLayout>
  );
};

export default CaseStudiesPage;


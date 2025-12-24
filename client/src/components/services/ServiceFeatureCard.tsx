import React from 'react';
import type { ServiceFeature } from './serviceTypes';
import ServiceCard from '../commons/ServiceCard';

interface ServiceFeatureCardProps {
  feature: ServiceFeature;
  index: number;
}

const ServiceFeatureCard: React.FC<ServiceFeatureCardProps> = ({ feature, index }) => {
  return (
    <ServiceCard
      service={{
        id: feature.id,
        title: feature.title,
        shortDescription: feature.shortDescription,
        description: feature.fullDescription,
        iconPath: feature.iconPath,
        icon: feature.icon,
      }}
      index={index}
      variant="compact"
      learnMoreText="Read More"
    />
  );
};

export default ServiceFeatureCard;




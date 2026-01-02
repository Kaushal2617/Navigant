// Service data types and interfaces

export interface ServiceFeature {
  id: string;
  title: string;
  icon?: string;
  iconPath?: string;
  shortDescription: string;
  fullDescription?: string;
}

export interface ServiceDetailSection {
  id: string;
  title: string;
  content: string;
  image?: string;
  imageAlt?: string;
  features?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  avatar?: string;
}

export interface ServiceHighlight {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface HeroSlide {
  id: string | number;
  title: string;
  subtitle?: string;
  image: string;
  imageAlt?: string;
  location?: string;
  primaryButton?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryButton?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  icon?: string;
  iconPath?: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  services: ServiceFeature[];
}

export interface BrandLogo {
  name: string;
  logo: string;
  alt?: string;
}

export interface ServiceData {
  id: string;
  slug: string;
  name: string;
  title: string;
  subtitle?: string;
  heroImage?: string;
  heroSlides?: HeroSlide[];
  description: string;
  aboutSection?: {
    title: string;
    content: string;
  };
  industries?: Industry[];
  features: ServiceFeature[];
  serviceCategories?: ServiceCategory[];
  detailSections: ServiceDetailSection[];
  additionalServices?: ServiceDetailSection[];
  highlights?: ServiceHighlight[];
  testimonials?: Testimonial[];
  brandLogos?: BrandLogo[];
  cta?: {
    title: string;
    description: string;
    primaryButton: {
      text: string;
      href: string;
    };
    secondaryButton?: {
      text: string;
      href: string;
    };
    showForm?: boolean;
  };
}


import React from 'react';
import ContactForm from '../commons/ContactForm';

interface ContactFormSectionProps {
  title: string;
  subtitle?: string;
}

const ContactFormSection: React.FC<ContactFormSectionProps> = ({ title, subtitle }) => {
  return (
    <ContactForm
      title={title}
      subtitle={subtitle}
      buttonText="Let's Talk"
    />
  );
};

export default ContactFormSection;




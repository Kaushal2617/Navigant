import React from 'react';
import ContactForm from './ContactForm';

const ContactFormSection: React.FC = () => {
  return (
    <ContactForm
      title="Get In Touch"
      subtitle="Fill out the form below and we'll get back to you as soon as possible"
      buttonText="Submit Inquiry"
    />
  );
};

export default ContactFormSection;


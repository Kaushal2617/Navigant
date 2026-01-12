import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import DotGrid from '../components/commons/DotGrid';
import ContactForm from '../components/commons/ContactForm';
import { navConfig } from '../components/navbar/navconfig';

const ContactPage: React.FC = () => {

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Phone',
      content: navConfig.contactNumber,
      link: `tel:${navConfig.contactNumber.replace(/\s/g, '')}`,
      description: 'Call us anytime',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email',
      content: 'info@navigant.in',
      link: 'mailto:info@navigant.in',
      description: 'Send us an email',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Address',
      content: 'Navigant Technologies\nA- 24/5, NH - 19, Mohan Cooperative Industrial Estate, New Delhi, Delhi 110044',
      link: '#',
      description: 'Visit our office',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Business Hours',
      content: '24×7',
      link: '#',
      description: 'We are here to help',
    },
  ];

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-28 lg:pt-32 pb-8 md:pb-10 bg-gradient-to-br from-white via-gray-50/50 to-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <DotGrid
            dotSize={12}
            gap={40}
            baseColor="#E5E7EB"
            activeColor="#CA1411"
            proximity={120}
            speedTrigger={80}
            shockRadius={200}
            shockStrength={4}
            maxSpeed={4000}
            resistance={800}
            returnDuration={1.2}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-4">
              <span className="text-sm md:text-base font-semibold text-[#CA1411] uppercase tracking-wider">
                Get a Quote
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Let's Start a{' '}
              <span className="text-[#CA1411] relative">
                Conversation
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#CA1411]/10 -z-10 transform -skew-x-12" />
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Have a question or want to discuss how we can help your business?
              Fill out the form below and our team will get back to you within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section - Below Hero */}
      <ContactForm
        buttonText="Submit Request"
      />

      {/* Employee Background Verification Section */}
      <section className="py-6 md:py-8 lg:py-10 bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <DotGrid
            dotSize={12}
            gap={40}
            baseColor="#E5E7EB"
            activeColor="#CA1411"
            proximity={120}
            speedTrigger={80}
            shockRadius={200}
            shockStrength={4}
            maxSpeed={4000}
            resistance={800}
            returnDuration={1.2}
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="p-6 sm:p-8 md:p-10 rounded-2xl bg-gradient-to-br from-[#CA1411] to-[#B0120F] text-white shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Employee Background Verification</h3>
                  <p className="text-white/90 mb-4">
                    If you have any concerns about our Employee Background Verification, please don't hesitate to reach out to us.
                  </p>
                  <a
                    href="mailto:verification@navigant.in"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#CA1411] font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <span>Contact Us</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-6 md:py-8 lg:py-10 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <DotGrid
            dotSize={12}
            gap={40}
            baseColor="#E5E7EB"
            activeColor="#CA1411"
            proximity={120}
            speedTrigger={80}
            shockRadius={200}
            shockStrength={4}
            maxSpeed={4000}
            resistance={800}
            returnDuration={1.2}
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                className="group relative rounded-2xl p-6 md:p-8 bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col items-center text-center"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                }}
              >
                <div className="w-16 h-16 rounded-full bg-[#CA1411]/10 flex items-center justify-center text-[#CA1411] mb-4 group-hover:bg-[#CA1411] group-hover:text-white transition-all duration-300">
                  {info.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#CA1411] transition-colors duration-300">
                  {info.title}
                </h3>
                <p className="text-gray-600 mb-1 font-medium whitespace-pre-line">{info.content}</p>
                <p className="text-sm text-gray-500">{info.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Office Location / Map Section */}
      <section className="py-6 md:py-8 lg:py-10 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <DotGrid
            dotSize={12}
            gap={40}
            baseColor="#E5E7EB"
            activeColor="#CA1411"
            proximity={120}
            speedTrigger={80}
            shockRadius={200}
            shockStrength={4}
            maxSpeed={4000}
            resistance={800}
            returnDuration={1.2}
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Office Location / Map Section */}
            <div className="flex flex-col">
              <div className="mb-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  Visit Our{' '}
                  <span className="text-[#CA1411] relative">
                    Office
                    <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#CA1411]/10 -z-10 transform -skew-x-12" />
                  </span>
                </h2>
                <p className="text-lg text-gray-600">
                  We'd love to meet you in person. Come visit us at our office.
                </p>
              </div>

              {/* Google Maps Embed */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl h-[400px] md:h-[500px] lg:h-full min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.456931623525!2d77.286198875285!3d28.52598247572307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d193ffa3d3991%3A0x98b98cb9ec2c1aae!2sNavigant%20Technologies!5e0!3m2!1sen!2sin!4v1767167982650!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                  title="Navigant Technologies Office Location"
                />
              </div>
            </div>

            {/* Additional Info */}
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex items-start gap-4 p-6 rounded-xl bg-white border border-gray-100 shadow-lg">
                <div className="w-12 h-12 rounded-full bg-[#CA1411]/10 flex items-center justify-center text-[#CA1411] flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-lg">Need Immediate Assistance?</h4>
                  <p className="text-gray-600">
                    For urgent matters, please call us directly at{' '}
                    <a href={`tel:${navConfig.contactNumber.replace(/\s/g, '')}`} className="text-[#CA1411] hover:underline font-medium">
                      {navConfig.contactNumber}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-xl bg-white border border-gray-100 shadow-lg">
                <div className="w-12 h-12 rounded-full bg-[#CA1411]/10 flex items-center justify-center text-[#CA1411] flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-lg">Response Time</h4>
                  <p className="text-gray-600">
                    We typically respond to all inquiries within 24 hours during business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default ContactPage;

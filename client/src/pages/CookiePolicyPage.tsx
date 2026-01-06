import React, { useEffect } from 'react';
import AppLayout from '../components/layout/AppLayout';
import DotGrid from '../components/commons/DotGrid';

const CookiePolicyPage: React.FC = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const sections = [
    {
      title: 'Introduction',
      content: `This Cookie Policy explains how Navigant Technologies Private Limited ("Navigant", "we", "us", or "our") uses cookies and similar technologies on the website https://navigant.in/ ("Website"). By continuing to browse or use our Website, you agree to the use of cookies as described in this policy.`,
    },
    {
      title: 'What Are Cookies',
      content: `Cookies are small text files that are stored on your device when you visit a website. They help improve website functionality, performance, and user experience.`,
    },
    {
      title: 'How We Use Cookies',
      content: `Navigant uses cookies to:

• Ensure the Website functions properly
• Improve website performance and usability
• Understand how visitors interact with the Website
• Enhance user experience during navigation

These cookies do not collect personally identifiable information unless you voluntarily provide such information through contact forms or inquiries.`,
    },
    {
      title: 'Types of Cookies Used',
      content: `Essential Cookies: Required for basic website functionality and navigation

Performance Cookies: Help us understand website usage and improve content and structure`,
    },
    {
      title: 'Third-Party Cookies',
      content: `The Website may use limited third-party tools for performance monitoring or analytics. Navigant does not control third-party cookies, and their usage is governed by the respective third-party privacy policies.`,
    },
    {
      title: 'Managing Cookies',
      content: `You can control or disable cookies through your browser settings. Please note that disabling cookies may affect certain functionalities of the Website.`,
    },
    {
      title: 'Changes to This Policy',
      content: `Navigant may update this Cookie Policy from time to time. Any changes will be reflected on this page, and continued use of the Website indicates acceptance of the updated policy.`,
    },
    {
      title: 'Contact Us',
      content: `If you have questions about this Cookie Policy, please contact Navigant using the contact details provided on the Website.`,
    },
  ];

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-20 bg-gradient-to-br from-white via-gray-50/50 to-white overflow-hidden">
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
                Legal Information
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Cookie{' '}
              <span className="text-[#CA1411] relative">
                Policy
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#CA1411]/10 -z-10 transform -skew-x-12" />
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Learn how Navigant Technologies uses cookies and similar technologies to enhance your browsing experience on our website.
            </p>
            <p className="text-sm md:text-base text-gray-500 mt-4">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden">
        {/* DotGrid Background */}
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          <div className="space-y-8 md:space-y-12">
            {sections.map((section, index) => (
              <div
                key={index}
                className="group relative"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div
                  className="relative rounded-2xl p-6 sm:p-8 md:p-10 bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  }}
                >
                  {/* Section Number Badge */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-[#CA1411] text-white flex items-center justify-center font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>

                  {/* Section Title */}
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 group-hover:text-[#CA1411] transition-colors duration-300">
                    {section.title}
                  </h2>

                  {/* Section Content */}
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg whitespace-pre-line">
                      {section.content.split('\n').map((line, lineIndex) => {
                        // Check if line is a bullet point
                        if (line.trim().startsWith('•')) {
                          return (
                            <span key={lineIndex} className="block ml-4 mb-2">
                              {line.trim()}
                            </span>
                          );
                        }
                        // Check if line is a bold label (like "Essential Cookies:")
                        if (line.includes(':') && line.trim().length < 100) {
                          const [label, ...rest] = line.split(':');
                          return (
                            <React.Fragment key={lineIndex}>
                              <strong className="text-gray-900">{label.trim()}:</strong> {rest.join(':').trim()}
                              {lineIndex < section.content.split('\n').length - 1 && <br />}
                            </React.Fragment>
                          );
                        }
                        return (
                          <React.Fragment key={lineIndex}>
                            {line}
                            {lineIndex < section.content.split('\n').length - 1 && <br />}
                          </React.Fragment>
                        );
                      })}
                    </p>
                  </div>

                  {/* Decorative accent */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 right-0 w-24 h-24">
                      <svg className="w-full h-full" viewBox="0 0 96 96">
                        <path
                          d="M0,0 L96,0 L96,96 Z"
                          fill="rgba(202, 20, 17, 0.05)"
                          className="transition-all duration-300"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 md:mt-16 p-6 sm:p-8 md:p-10 rounded-2xl bg-gradient-to-br from-[#CA1411] to-[#B0120F] text-white shadow-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">Questions About Our Cookie Policy?</h3>
                <p className="text-white/90 mb-4">
                  If you have any questions or concerns about how we use cookies, please don't hesitate to reach out to us.
                </p>
                <a
                  href="/contact"
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
      </section>
    </AppLayout>
  );
};

export default CookiePolicyPage;


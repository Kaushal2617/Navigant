import React, { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import DotGrid from '../components/commons/DotGrid';
import { navConfig } from '../components/navbar/navconfig';
import { submitLead, type LeadCreateRequest } from '../services/leadsApi';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceType: '',
    numberOfSeats: '',
    remarks: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Available service types
  const serviceTypes = [
    'BPO Services',
    'IT Consulting',
    'Co-working Space',
    'Virtual Office',
    'Staff Augmentation',
    'Other',
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
    // Clear success message on new input
    if (submitSuccess) {
      setSubmitSuccess(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.serviceType.trim()) {
      newErrors.serviceType = 'Please select a service type';
    }

    if (!formData.numberOfSeats.trim()) {
      newErrors.numberOfSeats = 'Number of seats is required';
    } else if (isNaN(Number(formData.numberOfSeats)) || Number(formData.numberOfSeats) <= 0) {
      newErrors.numberOfSeats = 'Please enter a valid number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmitting(true);
      try {
        // Prepare lead data matching server DTO
        const leadData: LeadCreateRequest = {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          serviceType: formData.serviceType,
          numberOfSeats: parseInt(formData.numberOfSeats, 10),
          remarks: formData.remarks || undefined,
        };

        // Submit to API
        const response = await submitLead(leadData);

        if (response.success) {
          setSubmitSuccess(true);
          // Reset form
          setFormData({
            fullName: '',
            email: '',
            phone: '',
            serviceType: '',
            numberOfSeats: '',
            remarks: '',
          });
        } else {
          alert(response.error || 'Failed to submit. Please try again later.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred while sending your request. Please try again later.');
      } finally {
        setSubmitting(false);
      }
    }
  };

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
      content: '123, Navigant Towers, Sector 18, Gurugram, Haryana, India - 122008',
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
      content: 'Mon - Fri: 9:00 AM - 6:00 PM',
      link: '#',
      description: 'We are here to help',
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
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden">
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
          <div
            className="relative rounded-2xl p-6 sm:p-8 md:p-10 bg-white border border-gray-100 shadow-xl"
            style={{
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            }}
          >
            {/* Success Message */}
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-green-800">Request Submitted Successfully!</h3>
                    <p className="text-green-700 text-sm">Thank you for contacting us. Our team will review your request and get back to you soon.</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Full Name <span className="text-[#CA1411]">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#CA1411] focus:border-transparent transition-all ${errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>

              {/* Email and Phone - Two Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Email Address <span className="text-[#CA1411]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#CA1411] focus:border-transparent transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Phone Number <span className="text-[#CA1411]">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#CA1411] focus:border-transparent transition-all ${errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Service Type and Number of Seats - Two Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="serviceType" className="block text-sm font-semibold text-gray-700 mb-2">
                    Service Type <span className="text-[#CA1411]">*</span>
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#CA1411] focus:border-transparent transition-all appearance-none bg-white ${errors.serviceType ? 'border-red-500' : 'border-gray-300'
                      }`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23334155' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      paddingRight: '2.5rem',
                    }}
                  >
                    <option value="">Select a service</option>
                    {serviceTypes.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  {errors.serviceType && (
                    <p className="mt-1 text-sm text-red-500">{errors.serviceType}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="numberOfSeats" className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Seats <span className="text-[#CA1411]">*</span>
                  </label>
                  <input
                    type="number"
                    id="numberOfSeats"
                    name="numberOfSeats"
                    min="1"
                    value={formData.numberOfSeats}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#CA1411] focus:border-transparent transition-all ${errors.numberOfSeats ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="How many seats do you need?"
                  />
                  {errors.numberOfSeats && (
                    <p className="mt-1 text-sm text-red-500">{errors.numberOfSeats}</p>
                  )}
                </div>
              </div>

              {/* Remarks / Message */}
              <div>
                <label htmlFor="remarks" className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Requirements (Optional)
                </label>
                <textarea
                  id="remarks"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CA1411] focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your specific requirements, timeline, or any questions..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-8 py-4 bg-[#CA1411] hover:bg-[#B0120F] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base md:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
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
                <p className="text-gray-600 mb-1 font-medium">{info.content}</p>
                <p className="text-sm text-gray-500">{info.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Office Location / Map Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
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

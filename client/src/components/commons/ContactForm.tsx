import React, { useState } from 'react';
import DotGrid from './DotGrid';
import { submitLead, type LeadCreateRequest } from '../../services/leadsApi';

interface ContactFormProps {
  title?: string;
  subtitle?: string;
  showBackground?: boolean;
  className?: string;
  buttonText?: string;
  showSuccessMessage?: boolean;
  onSuccess?: () => void; // Callback when form is successfully submitted
}

const ContactForm: React.FC<ContactFormProps> = ({
  title,
  subtitle,
  showBackground = true,
  className = '',
  buttonText = 'Submit Request',
  showSuccessMessage = true,
  onSuccess,
}) => {
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
    'Digital Workers',
    'Healthcare Services',
    'Market Research',
    'RPO & Staffing Services',
    'Finance & Accounting',
    'IT Services',
    'Digital Marketing',
    'Ecommerce Management',
    'Lead Generation',
    'End to End Sales',
    'Tata Tele Services',
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
          // Call onSuccess callback if provided
          if (onSuccess) {
            setTimeout(() => {
              onSuccess();
            }, 1500); // Wait a bit to show success message
          }
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

  return (
    <section className={`pt-6 md:pt-8 lg:pt-10 pb-12 md:pb-16 lg:pb-6 bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden ${className}`}>
      {/* DotGrid Background */}
      {showBackground && (
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
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        {/* Section Header - Only show if title or subtitle provided */}
        {(title || subtitle) && (
          <div className="text-center mb-10 md:mb-12">
            {title && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#CA1411] mb-4 relative">
                <span className="relative">
                  {title}
                  <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#CA1411]/10 -z-10 transform -skew-x-12" />
                </span>
              </h2>
            )}
            {subtitle && (
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Form Card */}
        <div
          className="relative rounded-2xl p-6 sm:p-8 md:p-10 bg-white border border-gray-100 shadow-xl"
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          }}
        >
          {/* Success Message */}
          {showSuccessMessage && submitSuccess && (
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
                {submitting ? 'Submitting...' : buttonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;


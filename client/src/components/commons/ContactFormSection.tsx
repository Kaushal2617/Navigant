import React, { useState } from 'react';
import DotGrid from './DotGrid';

const ContactFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNo: '',
    serviceType: '',
    numberOfSeats: '',
    remarks: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Services options
  const serviceOptions = [
    'Please choose the services',
    'Digital Workers',
    'BPO Services',
    'Tata Tele Services',
    'Healthcare Services',
    'Market Research',
    'HR Services',
    'Finance & Accounting',
    'IT Services',
    'Digital Marketing',
    'Ecommerce Management',
    'Lead Generation',
    'End to End Sales',
  ];

  // Number of seats options
  const seatsOptions = [
    'Please choose the number of seats',
    '1-10',
    '11-25',
    '26-50',
    '51-100',
    '101-250',
    '251-500',
    '500+',
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
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

    if (!formData.mobileNo.trim()) {
      newErrors.mobileNo = 'Mobile number is required';
    } else if (!/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/.test(formData.mobileNo)) {
      newErrors.mobileNo = 'Please enter a valid mobile number';
    }

    if (!formData.serviceType || formData.serviceType === 'Please choose the services') {
      newErrors.serviceType = 'Please select a service type';
    }

    if (!formData.numberOfSeats || formData.numberOfSeats === 'Please choose the number of seats') {
      newErrors.numberOfSeats = 'Please select number of seats';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Handle form submission
      console.log('Form submitted:', formData);
      // You can add API call here
      alert('Thank you for your inquiry! We will get back to you soon.');
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        mobileNo: '',
        serviceType: '',
        numberOfSeats: '',
        remarks: '',
      });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-white via-gray-50/50 to-white pt-12 pb-16 md:pt-16 md:pb-20 overflow-hidden">
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

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Fill out the form below and we'll get back to you as soon as possible
          </p>
        </div>

        {/* Form Card */}
        <div
          className="relative rounded-2xl p-6 sm:p-8 md:p-10 bg-white border border-gray-100 shadow-xl"
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          }}
        >
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
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#CA1411] focus:border-transparent transition-all ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
              )}
            </div>

            {/* Email Address and Mobile Number - Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email Address */}
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
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#CA1411] focus:border-transparent transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label htmlFor="mobileNo" className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Mobile No. <span className="text-[#CA1411]">*</span>
                </label>
                <input
                  type="tel"
                  id="mobileNo"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#CA1411] focus:border-transparent transition-all ${
                    errors.mobileNo ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your mobile number"
                />
                {errors.mobileNo && (
                  <p className="mt-1 text-sm text-red-500">{errors.mobileNo}</p>
                )}
              </div>
            </div>

            {/* Service Type and Number of Seats - Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Service Type */}
              <div>
                <label htmlFor="serviceType" className="block text-sm font-semibold text-gray-700 mb-2">
                  What type of services you are looking for? <span className="text-[#CA1411]">*</span>
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#CA1411] focus:border-transparent transition-all appearance-none bg-white ${
                    errors.serviceType ? 'border-red-500' : 'border-gray-300'
                  }`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23334155' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    paddingRight: '2.5rem',
                  }}
                >
                  {serviceOptions.map((option, index) => (
                    <option key={index} value={option} disabled={index === 0}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.serviceType && (
                  <p className="mt-1 text-sm text-red-500">{errors.serviceType}</p>
                )}
              </div>

              {/* Number of Seats */}
              <div>
                <label htmlFor="numberOfSeats" className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of seats <span className="text-[#CA1411]">*</span>
                </label>
                <select
                  id="numberOfSeats"
                  name="numberOfSeats"
                  value={formData.numberOfSeats}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#CA1411] focus:border-transparent transition-all appearance-none bg-white ${
                    errors.numberOfSeats ? 'border-red-500' : 'border-gray-300'
                  }`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23334155' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    paddingRight: '2.5rem',
                  }}
                >
                  {seatsOptions.map((option, index) => (
                    <option key={index} value={option} disabled={index === 0}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.numberOfSeats && (
                  <p className="mt-1 text-sm text-red-500">{errors.numberOfSeats}</p>
                )}
              </div>
            </div>

            {/* Remarks */}
            <div>
              <label htmlFor="remarks" className="block text-sm font-semibold text-gray-700 mb-2">
                Remarks, if any?
              </label>
              <textarea
                id="remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CA1411] focus:border-transparent transition-all resize-none"
                placeholder="Enter any additional remarks or requirements..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-8 py-4 bg-[#CA1411] hover:bg-[#B0120F] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base md:text-lg"
              >
                Submit Inquiry
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;


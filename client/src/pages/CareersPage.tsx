import React, { useState, useEffect } from 'react';
import AppLayout from '../components/layout/AppLayout';
import DotGrid from '../components/commons/DotGrid';
import { type Job } from '../services/careersApi';

const CareersPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applicationData, setApplicationData] = useState({
    fullName: '',
    email: '',
    mobileNo: '',
    position: '',
    experience: '',
    currentCompany: '',
    resume: null as File | null,
    coverLetter: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // Fallback job data (used if API fails)
  const fallbackJobs: Job[] = [
    {
      id: 'job-1',
      title: 'Senior BPO Executive',
      department: 'BPO Services',
      location: 'New Delhi, India',
      type: 'Full-time',
      experience: '3-5 years',
      description: 'We are looking for an experienced BPO Executive to manage client relationships and ensure exceptional service delivery.',
      requirements: [
        'Bachelor\'s degree in Business Administration or related field',
        '3-5 years of experience in BPO operations',
        'Excellent communication and interpersonal skills',
        'Strong problem-solving abilities',
        'Proficiency in CRM software',
      ],
      responsibilities: [
        'Manage client accounts and maintain relationships',
        'Oversee daily operations and ensure service quality',
        'Coordinate with cross-functional teams',
        'Analyze performance metrics and implement improvements',
      ],
    },
    {
      id: 'job-2',
      title: 'Customer Support Specialist',
      department: 'Customer Service',
      location: 'Gurugram, India',
      type: 'Full-time',
      experience: '1-3 years',
      description: 'Join our customer support team to provide exceptional service and support to our clients.',
      requirements: [
        'High school diploma or equivalent',
        '1-3 years of customer service experience',
        'Excellent verbal and written communication skills',
        'Ability to work in a fast-paced environment',
        'Basic computer skills',
      ],
      responsibilities: [
        'Handle customer inquiries via phone, email, and chat',
        'Resolve customer issues promptly and professionally',
        'Maintain accurate records of customer interactions',
        'Escalate complex issues to appropriate departments',
      ],
    },
    {
      id: 'job-3',
      title: 'Digital Marketing Manager',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-time',
      experience: '5+ years',
      description: 'Lead our digital marketing initiatives and drive brand awareness through innovative campaigns.',
      requirements: [
        'Bachelor\'s degree in Marketing or related field',
        '5+ years of digital marketing experience',
        'Proficiency in SEO, SEM, and social media marketing',
        'Strong analytical skills',
        'Experience with marketing automation tools',
      ],
      responsibilities: [
        'Develop and execute digital marketing strategies',
        'Manage social media accounts and content creation',
        'Analyze campaign performance and optimize ROI',
        'Collaborate with cross-functional teams',
      ],
    },
    {
      id: 'job-4',
      title: 'IT Support Engineer',
      department: 'IT Services',
      location: 'New Delhi, India',
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Provide technical support and maintain IT infrastructure for our organization.',
      requirements: [
        'Bachelor\'s degree in Computer Science or IT',
        '2-4 years of IT support experience',
        'Knowledge of networking, hardware, and software',
        'Strong troubleshooting skills',
        'Certifications in relevant technologies preferred',
      ],
      responsibilities: [
        'Provide technical support to employees',
        'Maintain and troubleshoot IT systems',
        'Install and configure software and hardware',
        'Document technical procedures and solutions',
      ],
    },
    {
      id: 'job-5',
      title: 'HR Recruiter',
      department: 'Human Resources',
      location: 'New Delhi, India',
      type: 'Full-time',
      experience: '2-3 years',
      description: 'Help us find and attract top talent to join our growing team.',
      requirements: [
        'Bachelor\'s degree in HR or related field',
        '2-3 years of recruitment experience',
        'Strong sourcing and screening skills',
        'Excellent communication skills',
        'Knowledge of recruitment tools and platforms',
      ],
      responsibilities: [
        'Source and attract qualified candidates',
        'Screen resumes and conduct initial interviews',
        'Coordinate with hiring managers',
        'Manage candidate pipeline and applicant tracking',
      ],
    },
    {
      id: 'job-6',
      title: 'Sales Executive',
      department: 'Sales',
      location: 'Multiple Locations',
      type: 'Full-time',
      experience: '2-5 years',
      description: 'Drive business growth by acquiring new clients and expanding existing relationships.',
      requirements: [
        'Bachelor\'s degree in Business or related field',
        '2-5 years of sales experience',
        'Proven track record of meeting sales targets',
        'Excellent negotiation and presentation skills',
        'Strong relationship-building abilities',
      ],
      responsibilities: [
        'Identify and pursue new business opportunities',
        'Build and maintain client relationships',
        'Prepare and deliver sales presentations',
        'Achieve monthly and quarterly sales targets',
      ],
    },
  ];

  // Use mock data by default until backend API is ready
  // To enable API calls, uncomment the API code below and comment out the setJobs line
  useEffect(() => {
    // Currently using mock data
    setJobs(fallbackJobs);
    setLoading(false);
    
    // Uncomment below to enable API calls when backend is ready:
    /*
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await getActiveJobs();
        if (response.success && response.data) {
          setJobs(response.data);
        } else {
          // Fallback to local data if API fails
          console.warn('Failed to fetch jobs from API, using fallback data');
          setJobs(fallbackJobs);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        // Fallback to local data on error
        setJobs(fallbackJobs);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
    */
  }, []); // Empty dependency array - only run on mount

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setApplicationData({
      ...applicationData,
      position: job.title,
    });
    // Scroll to form
    setTimeout(() => {
      const formElement = document.getElementById('application-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setApplicationData({
      ...applicationData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setApplicationData({
        ...applicationData,
        resume: e.target.files[0],
      });
      if (errors.resume) {
        setErrors({
          ...errors,
          resume: '',
        });
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!applicationData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!applicationData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(applicationData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!applicationData.mobileNo.trim()) {
      newErrors.mobileNo = 'Mobile number is required';
    }

    if (!applicationData.position.trim()) {
      newErrors.position = 'Please select a position';
    }

    if (!applicationData.experience.trim()) {
      newErrors.experience = 'Experience is required';
    }

    if (!applicationData.resume) {
      newErrors.resume = 'Please upload your resume';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSubmitting(true);
      try {
        // Currently using mock submission (just log and show success)
        // Uncomment below to enable API submission when backend is ready:
        /*
        const application: JobApplication = {
          fullName: applicationData.fullName,
          email: applicationData.email,
          mobileNo: applicationData.mobileNo,
          position: applicationData.position,
          experience: applicationData.experience,
          currentCompany: applicationData.currentCompany || undefined,
          resume: applicationData.resume!,
          coverLetter: applicationData.coverLetter || undefined,
        };

        const response = await submitJobApplication(application);
        
        if (response.success) {
          alert('Thank you for your application! We will review it and get back to you soon.');
          
          // Reset form
          setApplicationData({
            fullName: '',
            email: '',
            mobileNo: '',
            position: '',
            experience: '',
            currentCompany: '',
            resume: null,
            coverLetter: '',
          });
          setSelectedJob(null);
          setShowApplicationForm(false);
        } else {
          alert('Failed to submit application. Please try again later.');
        }
        */
        
        // Mock submission - just log and show success
        console.log('Mock application submission:', applicationData);
        alert('Thank you for your application! We will review it and get back to you soon.');
        
        // Reset form
        setApplicationData({
          fullName: '',
          email: '',
          mobileNo: '',
          position: '',
          experience: '',
          currentCompany: '',
          resume: null,
          coverLetter: '',
        });
        setSelectedJob(null);
      } catch (error) {
        console.error('Error submitting application:', error);
        alert('An error occurred while submitting your application. Please try again later.');
      } finally {
        setSubmitting(false);
      }
    }
  };

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
                Join Our Team
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Build Your Career{' '}
              <span className="text-[#CA1411] relative">
                With Us
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#CA1411]/10 -z-10 transform -skew-x-12" />
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join Navigant Technologies and be part of a dynamic team that's transforming businesses worldwide. 
              Explore exciting career opportunities and grow with us.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Why Join{' '}
              <span className="text-[#CA1411] relative">
                Navigant?
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#CA1411]/10 -z-10 transform -skew-x-12" />
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: '🚀',
                title: 'Career Growth',
                description: 'Opportunities for professional development and career advancement in a growing organization.',
              },
              {
                icon: '💼',
                title: 'Competitive Benefits',
                description: 'Attractive compensation packages, health insurance, and other employee benefits.',
              },
              {
                icon: '🌍',
                title: 'Global Exposure',
                description: 'Work with international clients and gain exposure to diverse business environments.',
              },
              {
                icon: '🤝',
                title: 'Collaborative Culture',
                description: 'Be part of a supportive team that values collaboration and innovation.',
              },
              {
                icon: '📚',
                title: 'Learning Opportunities',
                description: 'Access to training programs and workshops to enhance your skills.',
              },
              {
                icon: '⚖️',
                title: 'Work-Life Balance',
                description: 'Flexible work arrangements and policies that support work-life balance.',
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="group relative rounded-2xl p-6 md:p-8 bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 h-full"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                }}
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#CA1411] transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden">
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
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm md:text-base font-semibold text-[#CA1411] uppercase tracking-wider">
                Open Positions
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Current{' '}
              <span className="text-[#CA1411] relative">
                Job Openings
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#CA1411]/10 -z-10 transform -skew-x-12" />
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our current job openings and find the perfect opportunity to advance your career
            </p>
          </div>

          {/* Job Cards Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#CA1411]"></div>
              <p className="mt-4 text-gray-600">Loading job openings...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No job openings available at the moment. Please check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {jobs.map((job) => (
              <div
                key={job.id}
                className="group relative rounded-2xl p-6 md:p-8 bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col cursor-pointer"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                }}
                onClick={() => handleJobClick(job)}
              >
                {/* Job Type Badge */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#CA1411]/10 text-[#CA1411]">
                    {job.type}
                  </span>
                </div>

                {/* Job Title */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#CA1411] transition-colors duration-300">
                  {job.title}
                </h3>

                {/* Job Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-[#CA1411]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-[#CA1411]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{job.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-[#CA1411]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{job.experience} experience</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                  {job.description}
                </p>

                {/* Apply Button */}
                <button className="mt-auto w-full px-6 py-3 bg-[#CA1411] hover:bg-[#B0120F] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  Apply Now
                </button>
              </div>
            ))}
            </div>
          )}
        </div>
      </section>

      {/* Job Application Form */}
      <section
        id="application-form"
        className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm md:text-base font-semibold text-[#CA1411] uppercase tracking-wider">
                Apply Now
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Job{' '}
              <span className="text-[#CA1411] relative">
                Application
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#CA1411]/10 -z-10 transform -skew-x-12" />
              </span>
            </h2>
            {selectedJob && (
              <p className="text-lg text-gray-600">
                Applying for: <span className="font-semibold text-gray-900">{selectedJob.title}</span>
              </p>
            )}
          </div>

          {/* Application Form Card */}
          <div
            className="relative rounded-2xl p-6 sm:p-8 md:p-10 bg-white border border-gray-100 shadow-xl"
            style={{
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name and Email - Two Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Full Name <span className="text-[#CA1411]">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={applicationData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#CA1411] focus:border-transparent transition-all ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Email Address <span className="text-[#CA1411]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={applicationData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#CA1411] focus:border-transparent transition-all ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Mobile Number and Position - Two Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="mobileNo" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Mobile No. <span className="text-[#CA1411]">*</span>
                  </label>
                  <input
                    type="tel"
                    id="mobileNo"
                    name="mobileNo"
                    value={applicationData.mobileNo}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#CA1411] focus:border-transparent transition-all ${
                      errors.mobileNo ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your mobile number"
                  />
                  {errors.mobileNo && (
                    <p className="mt-1 text-sm text-red-500">{errors.mobileNo}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="position" className="block text-sm font-semibold text-gray-700 mb-2">
                    Position Applied For <span className="text-[#CA1411]">*</span>
                  </label>
                  <select
                    id="position"
                    name="position"
                    value={applicationData.position}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#CA1411] focus:border-transparent transition-all appearance-none bg-white ${
                      errors.position ? 'border-red-500' : 'border-gray-300'
                    }`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23334155' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      paddingRight: '2.5rem',
                    }}
                  >
                    <option value="">Select a position</option>
                    {jobs.map((job) => (
                      <option key={job.id} value={job.title}>
                        {job.title} - {job.department}
                      </option>
                    ))}
                  </select>
                  {errors.position && (
                    <p className="mt-1 text-sm text-red-500">{errors.position}</p>
                  )}
                </div>
              </div>

              {/* Experience and Current Company - Two Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="experience" className="block text-sm font-semibold text-gray-700 mb-2">
                    Years of Experience <span className="text-[#CA1411]">*</span>
                  </label>
                  <input
                    type="text"
                    id="experience"
                    name="experience"
                    value={applicationData.experience}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#CA1411] focus:border-transparent transition-all ${
                      errors.experience ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., 3-5 years"
                  />
                  {errors.experience && (
                    <p className="mt-1 text-sm text-red-500">{errors.experience}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="currentCompany" className="block text-sm font-semibold text-gray-700 mb-2">
                    Current Company
                  </label>
                  <input
                    type="text"
                    id="currentCompany"
                    name="currentCompany"
                    value={applicationData.currentCompany}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CA1411] focus:border-transparent transition-all"
                    placeholder="Enter your current company"
                  />
                </div>
              </div>

              {/* Resume Upload */}
              <div>
                <label htmlFor="resume" className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Resume <span className="text-[#CA1411]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#CA1411] focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#CA1411] file:text-white hover:file:bg-[#B0120F] ${
                      errors.resume ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.resume && (
                  <p className="mt-1 text-sm text-red-500">{errors.resume}</p>
                )}
                <p className="mt-2 text-xs text-gray-500">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
              </div>

              {/* Cover Letter */}
              <div>
                <label htmlFor="coverLetter" className="block text-sm font-semibold text-gray-700 mb-2">
                  Cover Letter (Optional)
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={applicationData.coverLetter}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CA1411] focus:border-transparent transition-all resize-none"
                  placeholder="Tell us why you're interested in this position..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-8 py-4 bg-[#CA1411] hover:bg-[#B0120F] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base md:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default CareersPage;


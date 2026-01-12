import React, { useState, useEffect } from 'react';
import AppLayout from '../components/layout/AppLayout';
import DotGrid from '../components/commons/DotGrid';
import {
  type Job,
  getActiveJobsForUI,
  submitJobApplicationLegacy,
  type JobApplication
} from '../services/careersApi';
import JobDetailsModal from '../components/commons/JobDetailsModal';

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
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [modalJob, setModalJob] = useState<Job | null>(null);

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
      requirements: `<ul>
        <li>Bachelor's degree in Business Administration or related field</li>
        <li>3-5 years of experience in BPO operations</li>
        <li>Excellent communication and interpersonal skills</li>
        <li>Strong problem-solving abilities</li>
        <li>Proficiency in CRM software</li>
      </ul>`,
      responsibilities: `<ul>
        <li>Manage client accounts and maintain relationships</li>
        <li>Oversee daily operations and ensure service quality</li>
        <li>Coordinate with cross-functional teams</li>
        <li>Analyze performance metrics and implement improvements</li>
      </ul>`,
    },
    {
      id: 'job-2',
      title: 'Customer Support Specialist',
      department: 'Customer Service',
      location: 'Gurugram, India',
      type: 'Full-time',
      experience: '1-3 years',
      description: 'Join our customer support team to provide exceptional service and support to our clients.',
      requirements: `<ul>
        <li>High school diploma or equivalent</li>
        <li>1-3 years of customer service experience</li>
        <li>Excellent verbal and written communication skills</li>
        <li>Ability to work in a fast-paced environment</li>
        <li>Basic computer skills</li>
      </ul>`,
      responsibilities: `<ul>
        <li>Handle customer inquiries via phone, email, and chat</li>
        <li>Resolve customer issues promptly and professionally</li>
        <li>Maintain accurate records of customer interactions</li>
        <li>Escalate complex issues to appropriate departments</li>
      </ul>`,
    },
    {
      id: 'job-3',
      title: 'Digital Marketing Manager',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-time',
      experience: '5+ years',
      description: 'Lead our digital marketing initiatives and drive brand awareness through innovative campaigns.',
      requirements: `<ul>
        <li>Bachelor's degree in Marketing or related field</li>
        <li>5+ years of digital marketing experience</li>
        <li>Proficiency in SEO, SEM, and social media marketing</li>
        <li>Strong analytical skills</li>
        <li>Experience with marketing automation tools</li>
      </ul>`,
      responsibilities: `<ul>
        <li>Develop and execute digital marketing strategies</li>
        <li>Manage social media accounts and content creation</li>
        <li>Analyze campaign performance and optimize ROI</li>
        <li>Collaborate with cross-functional teams</li>
      </ul>`,
    },
    {
      id: 'job-4',
      title: 'IT Support Engineer',
      department: 'IT Services',
      location: 'New Delhi, India',
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Provide technical support and maintain IT infrastructure for our organization.',
      requirements: `<ul>
        <li>Bachelor's degree in Computer Science or IT</li>
        <li>2-4 years of IT support experience</li>
        <li>Knowledge of networking, hardware, and software</li>
        <li>Strong troubleshooting skills</li>
        <li>Certifications in relevant technologies preferred</li>
      </ul>`,
      responsibilities: `<ul>
        <li>Provide technical support to employees</li>
        <li>Maintain and troubleshoot IT systems</li>
        <li>Install and configure software and hardware</li>
        <li>Document technical procedures and solutions</li>
      </ul>`,
    },
    {
      id: 'job-5',
      title: 'HR Recruiter',
      department: 'Human Resources',
      location: 'New Delhi, India',
      type: 'Full-time',
      experience: '2-3 years',
      description: 'Help us find and attract top talent to join our growing team.',
      requirements: `<ul>
        <li>Bachelor's degree in HR or related field</li>
        <li>2-3 years of recruitment experience</li>
        <li>Strong sourcing and screening skills</li>
        <li>Excellent communication skills</li>
        <li>Knowledge of recruitment tools and platforms</li>
      </ul>`,
      responsibilities: `<ul>
        <li>Source and attract qualified candidates</li>
        <li>Screen resumes and conduct initial interviews</li>
        <li>Coordinate with hiring managers</li>
        <li>Manage candidate pipeline and applicant tracking</li>
      </ul>`,
    },
    {
      id: 'job-6',
      title: 'Sales Executive',
      department: 'Sales',
      location: 'Multiple Locations',
      type: 'Full-time',
      experience: '2-5 years',
      description: 'Drive business growth by acquiring new clients and expanding existing relationships.',
      requirements: `<ul>
        <li>Bachelor's degree in Business or related field</li>
        <li>2-5 years of sales experience</li>
        <li>Proven track record of meeting sales targets</li>
        <li>Excellent negotiation and presentation skills</li>
        <li>Strong relationship-building abilities</li>
      </ul>`,
      responsibilities: `<ul>
        <li>Identify and pursue new business opportunities</li>
        <li>Build and maintain client relationships</li>
        <li>Prepare and deliver sales presentations</li>
        <li>Achieve monthly and quarterly sales targets</li>
      </ul>`,
    },
  ];

  // Fetch jobs from API with fallback to local data
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await getActiveJobsForUI();
        if (response.success && response.data && response.data.length > 0) {
          setJobs(response.data);
        } else {
          // Fallback to local data if API returns empty or fails
          console.warn('API returned no jobs, using fallback data');
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
  }, []); // Empty dependency array - only run on mount

  // Handle "View Details" click
  const handleViewDetails = (job: Job) => {
    setModalJob(job);
    setDetailsOpen(true);
  };

  // Handle "Apply Now" click (from card or modal)
  const handleApplyClick = (job: Job) => {
    setDetailsOpen(false);
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
        // Find the job ID for the selected position
        const selectedJobData = jobs.find(j => j.title === applicationData.position);
        const jobId = selectedJobData?.id || '';

        // Build JobApplication object
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

        // Submit via API
        const response = await submitJobApplicationLegacy(application, jobId);

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
        } else {
          alert(response.error || 'Failed to submit application. Please try again later.');
        }
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
      <section className="py-6 md:py-8 lg:py-10 bg-white relative overflow-hidden">
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

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8">
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
                className="group relative rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 h-full"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                }}
              >
                <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 md:mb-4">{benefit.icon}</div>
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 mb-2 sm:mb-2.5 md:mb-3 group-hover:text-[#CA1411] transition-colors duration-300 leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
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
                  className="group relative rounded-2xl p-6 bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  }}
                >
                  {/* Job Type Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#CA1411]/10 text-[#CA1411]">
                      {job.type}
                    </span>
                    {job.salaryRange && (
                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                        {job.salaryRange}
                      </span>
                    )}
                  </div>

                  {/* Job Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#CA1411] transition-colors duration-300 line-clamp-2">
                    {job.title}
                  </h3>

                  {/* Job Locations & Dept */}
                  <div className="space-y-1 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#CA1411]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="line-clamp-1">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#CA1411]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{job.department}</span>
                    </div>
                  </div>

                  {/* Short Description (Truncated) */}
                  <div
                    className="text-gray-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3 overflow-hidden text-ellipsis"
                    dangerouslySetInnerHTML={{ __html: job.description }}
                  />

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleViewDetails(job)}
                      className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 text-sm"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleApplyClick(job)}
                      className="flex-1 px-4 py-2.5 bg-[#CA1411] hover:bg-[#B0120F] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm"
                    >
                      Apply Now
                    </button>
                  </div>
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#CA1411] focus:border-transparent transition-all ${errors.fullName ? 'border-red-500' : 'border-gray-300'
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#CA1411] focus:border-transparent transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#CA1411] focus:border-transparent transition-all ${errors.mobileNo ? 'border-red-500' : 'border-gray-300'
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#CA1411] focus:border-transparent transition-all appearance-none bg-white ${errors.position ? 'border-red-500' : 'border-gray-300'
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#CA1411] focus:border-transparent transition-all ${errors.experience ? 'border-red-500' : 'border-gray-300'
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#CA1411] focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#CA1411] file:text-white hover:file:bg-[#B0120F] ${errors.resume ? 'border-red-500' : 'border-gray-300'
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
      <JobDetailsModal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        job={modalJob}
        onApply={handleApplyClick}
      />
    </AppLayout>
  );
};

export default CareersPage;


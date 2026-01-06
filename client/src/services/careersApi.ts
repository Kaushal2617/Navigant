/**
 * Careers API Functions
 * 
 * Connects to Spring Boot backend for jobs and applications.
 * PUBLIC: Job listings and application submission
 * ADMIN: Job management (authentication required)
 */

import { apiGet, apiPost, apiPut, apiDelete, apiPostFormData, type ApiResponse } from './api';

/**
 * Job Post DTO
 * Matches server: com.navigant.dto.JobPostDTO
 */
export interface JobPost {
  id: string;
  title: string;
  description: string;
  location: string;
  jobType: string;                // Full-time, Part-time, Contract, Remote
  requirements?: string;          // Multiline text (stored as string, not array)
  responsibilities?: string;      // Multiline text
  salaryRange?: string;
  applicationLink?: string;
  status: string;                 // ACTIVE, DRAFT, CLOSED
  createdBy?: string;
  expiresAt: string;              // ISO DateTime
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Legacy Job interface for backwards compatibility with existing UI
 * Maps to JobPost but with UI-friendly structure
 */
export interface Job {
  id: string;
  title: string;
  department: string;            // UI field - can be derived or added
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  experience: string;            // UI field - can be extracted from requirements
  description: string;
  requirements: string;          // HTML string
  responsibilities: string;      // HTML string
  salaryRange?: string;          // Added salary range
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Job Application Create Request
 * Used for multipart form submission
 */
export interface JobApplicationSubmit {
  jobPostId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  coverLetter?: string;
  resume: File;
}

/**
 * Job Application Response DTO
 * Matches server: com.navigant.dto.JobApplicationResponse
 */
export interface JobApplicationResponse {
  id: string;
  jobPostId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  resumeUrl: string;
  coverLetter?: string;
  status: string;
  appliedAt: string;    // ISO Instant
  updatedAt: string;
  reviewedBy?: string;
}

/**
 * Legacy JobApplication interface for UI compatibility
 */
export interface JobApplication {
  id?: string;
  fullName: string;
  email: string;
  mobileNo: string;
  position: string;
  experience: string;
  currentCompany?: string;
  resume: File | string;
  coverLetter?: string;
  status?: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
  appliedAt?: string;
}

// ===========================
// Utility: Convert JobPost to Job (for UI)
// ===========================

/**
 * Convert server JobPost to UI-friendly Job format
 */
export const convertJobPostToJob = (jobPost: JobPost): Job => {
  return {
    id: jobPost.id,
    title: jobPost.title,
    department: 'General', // Default department - can be added to server if needed
    location: jobPost.location,
    type: jobPost.jobType as Job['type'],
    experience: 'Not specified', // Can be extracted from requirements if formatted
    description: jobPost.description,
    requirements: jobPost.requirements || '', // HTML string
    responsibilities: jobPost.responsibilities || '', // HTML string
    salaryRange: jobPost.salaryRange,
    isActive: jobPost.status === 'ACTIVE',
    createdAt: jobPost.createdAt,
    updatedAt: jobPost.updatedAt,
  };
};

// ===========================
// PUBLIC Endpoints
// ===========================

/**
 * PUBLIC: Get active jobs (for careers page)
 * Endpoint: GET /api/v1/jobs
 */
export const getActiveJobs = async (): Promise<ApiResponse<JobPost[]>> => {
  return apiGet<JobPost[]>('/jobs');
};

/**
 * PUBLIC: Get active jobs converted to UI format
 */
export const getActiveJobsForUI = async (): Promise<ApiResponse<Job[]>> => {
  const response = await getActiveJobs();
  if (response.success && response.data) {
    return {
      success: true,
      data: response.data.map(convertJobPostToJob),
    };
  }
  return {
    success: false,
    error: response.error,
  };
};

/**
 * PUBLIC: Get job by ID (for job details page)
 * Endpoint: GET /api/v1/jobs/{id}
 */
export const getJobById = async (id: string): Promise<ApiResponse<JobPost>> => {
  return apiGet<JobPost>(`/jobs/${id}`);
};

/**
 * PUBLIC: Submit job application with resume (multipart)
 * Endpoint: POST /api/v1/applications
 */
export const submitJobApplication = async (
  application: JobApplicationSubmit
): Promise<ApiResponse<JobApplicationResponse>> => {
  const formData = new FormData();

  formData.append('jobPostId', application.jobPostId);
  formData.append('applicantName', application.applicantName);
  formData.append('applicantEmail', application.applicantEmail);
  formData.append('applicantPhone', application.applicantPhone);

  if (application.coverLetter) {
    formData.append('coverLetter', application.coverLetter);
  }

  formData.append('resume', application.resume);

  return apiPostFormData<JobApplicationResponse>('/applications', formData);
};

/**
 * PUBLIC: Submit job application using legacy UI format
 * Converts JobApplication to JobApplicationSubmit
 */
export const submitJobApplicationLegacy = async (
  application: JobApplication,
  jobId: string
): Promise<ApiResponse<JobApplicationResponse>> => {
  if (!(application.resume instanceof File)) {
    return {
      success: false,
      error: 'Resume must be a file',
    };
  }

  const submit: JobApplicationSubmit = {
    jobPostId: jobId,
    applicantName: application.fullName,
    applicantEmail: application.email,
    applicantPhone: application.mobileNo,
    coverLetter: application.coverLetter,
    resume: application.resume,
  };

  return submitJobApplication(submit);
};

// ===========================
// ADMIN Endpoints (require authentication)
// ===========================

/**
 * ADMIN: Get all jobs
 * Endpoint: GET /api/v1/jobs/admin
 */
export const getAllJobs = async (): Promise<ApiResponse<JobPost[]>> => {
  return apiGet<JobPost[]>('/jobs/admin');
};

/**
 * ADMIN: Create a new job
 * Endpoint: POST /api/v1/jobs
 */
export const createJob = async (
  job: Omit<JobPost, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ApiResponse<JobPost>> => {
  return apiPost<JobPost>('/jobs', job);
};

/**
 * ADMIN: Update a job
 * Endpoint: PUT /api/v1/jobs/{id}
 */
export const updateJob = async (
  id: string,
  job: Partial<JobPost>
): Promise<ApiResponse<JobPost>> => {
  return apiPut<JobPost>(`/jobs/${id}`, job);
};

/**
 * ADMIN: Delete a job (soft delete)
 * Endpoint: DELETE /api/v1/jobs/{id}
 */
export const deleteJob = async (id: string): Promise<ApiResponse<void>> => {
  return apiDelete<void>(`/jobs/${id}`);
};

// ===========================
// ADMIN Application Endpoints
// ===========================

/**
 * ADMIN: Get all job applications
 * Endpoint: GET /api/v1/admin/applications
 */
export const getJobApplications = async (): Promise<ApiResponse<JobApplicationResponse[]>> => {
  return apiGet<JobApplicationResponse[]>('/admin/applications');
};

/**
 * ADMIN: Get applications by job ID
 * Endpoint: GET /api/v1/admin/applications/job/{jobId}
 */
export const getApplicationsByJob = async (
  jobId: string
): Promise<ApiResponse<JobApplicationResponse[]>> => {
  return apiGet<JobApplicationResponse[]>(`/admin/applications/job/${jobId}`);
};

/**
 * ADMIN: Get applications by status
 * Endpoint: GET /api/v1/admin/applications/status/{status}
 */
export const getApplicationsByStatus = async (
  status: string
): Promise<ApiResponse<JobApplicationResponse[]>> => {
  return apiGet<JobApplicationResponse[]>(`/admin/applications/status/${status}`);
};

/**
 * ADMIN: Get application by ID
 * Endpoint: GET /api/v1/admin/applications/{id}
 */
export const getApplicationById = async (
  id: string
): Promise<ApiResponse<JobApplicationResponse>> => {
  return apiGet<JobApplicationResponse>(`/admin/applications/${id}`);
};

/**
 * ADMIN: Update application status
 * Endpoint: PATCH /api/v1/admin/applications/{id}/status
 */
export const updateApplicationStatus = async (
  id: string,
  status: string
): Promise<ApiResponse<JobApplicationResponse>> => {
  return apiPut<JobApplicationResponse>(`/admin/applications/${id}/status`, { status });
};

/**
 * ADMIN: Delete application
 * Endpoint: DELETE /api/v1/admin/applications/{id}
 */
export const deleteApplication = async (id: string): Promise<ApiResponse<void>> => {
  return apiDelete<void>(`/admin/applications/${id}`);
};

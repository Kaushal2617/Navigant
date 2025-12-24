/**
 * Careers API Functions
 * 
 * Functions to interact with the careers/jobs API.
 * These functions will be used by the Careers page and admin panel.
 */

import { apiGet, apiPost, apiPut, apiDelete, apiPostFormData, type ApiResponse } from './api';

// Job interface matching the CareersPage
export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Job Application interface
export interface JobApplication {
  id?: string;
  fullName: string;
  email: string;
  mobileNo: string;
  position: string;
  experience: string;
  currentCompany?: string;
  resume: File | string; // File for upload, string (URL/path) for stored
  coverLetter?: string;
  status?: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
  appliedAt?: string;
}

// Get all jobs
export const getJobs = async (): Promise<ApiResponse<Job[]>> => {
  return apiGet<Job[]>('/careers/jobs');
};

// Get active jobs only
export const getActiveJobs = async (): Promise<ApiResponse<Job[]>> => {
  return apiGet<Job[]>('/careers/jobs?active=true');
};

// Get job by ID
export const getJobById = async (id: string): Promise<ApiResponse<Job>> => {
  return apiGet<Job>(`/careers/jobs/${id}`);
};

// Create a new job (Admin only)
export const createJob = async (job: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Job>> => {
  return apiPost<Job>('/careers/jobs', job);
};

// Update a job (Admin only)
export const updateJob = async (id: string, job: Partial<Job>): Promise<ApiResponse<Job>> => {
  return apiPut<Job>(`/careers/jobs/${id}`, job);
};

// Delete a job (Admin only)
export const deleteJob = async (id: string): Promise<ApiResponse<void>> => {
  return apiDelete<void>(`/careers/jobs/${id}`);
};

// Submit job application
export const submitJobApplication = async (application: JobApplication): Promise<ApiResponse<JobApplication>> => {
  const formData = new FormData();
  
  formData.append('fullName', application.fullName);
  formData.append('email', application.email);
  formData.append('mobileNo', application.mobileNo);
  formData.append('position', application.position);
  formData.append('experience', application.experience);
  
  if (application.currentCompany) {
    formData.append('currentCompany', application.currentCompany);
  }
  
  if (application.coverLetter) {
    formData.append('coverLetter', application.coverLetter);
  }
  
  if (application.resume instanceof File) {
    formData.append('resume', application.resume);
  } else {
    formData.append('resume', application.resume);
  }

  return apiPostFormData<JobApplication>('/careers/applications', formData);
};

// Get all job applications (Admin only)
export const getJobApplications = async (): Promise<ApiResponse<JobApplication[]>> => {
  return apiGet<JobApplication[]>('/careers/applications');
};

// Get job application by ID (Admin only)
export const getJobApplicationById = async (id: string): Promise<ApiResponse<JobApplication>> => {
  return apiGet<JobApplication>(`/careers/applications/${id}`);
};

// Update job application status (Admin only)
export const updateApplicationStatus = async (
  id: string,
  status: JobApplication['status']
): Promise<ApiResponse<JobApplication>> => {
  return apiPut<JobApplication>(`/careers/applications/${id}/status`, { status });
};


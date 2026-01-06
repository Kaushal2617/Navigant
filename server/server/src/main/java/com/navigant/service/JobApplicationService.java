package com.navigant.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.navigant.dto.JobApplicationCreateRequest;
import com.navigant.dto.JobApplicationResponse;

/**
 * Service for managing job applications.
 */
public interface JobApplicationService {

	/**
	 * Process a new job application submission.
	 * <p>
	 * 1. Validates the job post exists.
	 * 2. Uploads the resume PDF to storage (local/S3).
	 * 3. Saves the application metadata to the database.
	 * </p>
	 * 
	 * @param request   DTO containing applicant details.
	 * @param resumePdf The uploaded resume file.
	 * @return The persisted application details.
	 * @throws IOException If storage operations fail.
	 */
	JobApplicationResponse submitApplication(JobApplicationCreateRequest request,
			MultipartFile resumePdf) throws IOException;

	/**
	 * Get all applications (admin only).
	 */
	List<JobApplicationResponse> getAllApplications();

	/**
	 * Exports all applications to the provided writer in CSV format.
	 * 
	 * @param writer Writer to output CSV data.
	 */
	void exportApplicationsToCsv(java.io.Writer writer);

	/**
	 * Get applications for specific job (admin only).
	 */
	List<JobApplicationResponse> getApplicationByJob(String jobPostId);

	/**
	 * Get applications by status (admin only).
	 */
	List<JobApplicationResponse> getApplicationByStatus(String status);

	/**
	 * Update application status (admin only).
	 */
	JobApplicationResponse updateApplicationByStatus(String applicationId, String status, String adminId);

	/**
	 * Get application by ID.
	 */
	JobApplicationResponse getApplicationById(String id);

	/**
	 * Delete application (admin only).
	 */
	void deleteApplication(String id) throws IOException;
}

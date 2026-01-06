package com.navigant.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.navigant.dto.ApplicationStatusUpdateRequest;
import com.navigant.dto.JobApplicationCreateRequest;
import com.navigant.dto.JobApplicationResponse;
import com.navigant.security.AdminUserDetails;
import com.navigant.service.JobApplicationService;

import jakarta.validation.Valid;

/**
 * Controller for managing Job Applications.
 * <p>
 * This controller serves two distinct audiences:
 * 1. <b>Public Candidates</b>: Can submit applications via the specialized
 * multipart endpoint.
 * 2. <b>Admins</b>: Can view, filter, and update the status of submitted
 * applications.
 * </p>
 */
@RestController
@RequestMapping("/api/v1")
public class JobApplicationController {

	private final JobApplicationService applicationService;

	public JobApplicationController(JobApplicationService applicationService) {
		this.applicationService = applicationService;
	}

	/**
	 * PUBLIC: Submits a new job application with a resume.
	 * <p>
	 * This endpoint handles multipart form data to accept both application details
	 * and a PDF resume.
	 * It is publicly accessible to allow candidates to apply without logging in.
	 * </p>
	 * 
	 * @param jobPostId      The ID of the job posting being applied for.
	 * @param applicantName  Full name of the applicant.
	 * @param applicantEmail Email address for contact.
	 * @param applicantPhone 10-digit phone number.
	 * @param coverLetter    Optional cover letter text.
	 * @param resume         The resume file (must be PDF).
	 * @return The created {@link JobApplicationResponse}.
	 * @throws IOException If file processing fails.
	 */
	@PostMapping(value = "/applications", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	@ResponseStatus(HttpStatus.CREATED)
	public JobApplicationResponse submitApplication(
			@RequestParam("jobPostId") String jobPostId,
			@RequestParam("applicantName") String applicantName,
			@RequestParam("applicantEmail") String applicantEmail,
			@RequestParam("applicantPhone") String applicantPhone,
			@RequestParam(value = "coverLetter", required = false) String coverLetter,
			@RequestParam("resume") MultipartFile resume) throws IOException {

		// Create request DTO

		JobApplicationCreateRequest request = new JobApplicationCreateRequest();
		request.setJobPostId(jobPostId);
		request.setApplicantName(applicantName);
		request.setApplicantEmail(applicantEmail);
		request.setApplicantPhone(applicantPhone);
		request.setCoverLetter(coverLetter);

		return applicationService.submitApplication(request, resume);
	}

	/**
	 * ADMIN: Retrieves a paginated list of all job applications.
	 * <p>
	 * Requires ADMIN or SUPER_ADMIN role.
	 * </p>
	 * 
	 * @param admin Authenticated admin user.
	 * @return List of all applications.
	 */
	@GetMapping("/admin/applications")
	public List<JobApplicationResponse> getAllJobApplications(@AuthenticationPrincipal AdminUserDetails admin) {

		return applicationService.getAllApplications();
	}

	/**
	 * ADMIN: Exports all job applications as CSV.
	 * 
	 * @param httpResponse Servlet response to write CSV to.
	 */
	@GetMapping("/admin/applications/export")
	public void exportApplications(jakarta.servlet.http.HttpServletResponse httpResponse) throws java.io.IOException {
		httpResponse.setContentType("text/csv");
		httpResponse.setHeader("Content-Disposition", "attachment; filename=\"applications.csv\"");
		applicationService.exportApplicationsToCsv(httpResponse.getWriter());
	}

	/**
	 * ADMIN: Retrieves applications for a specific job posting.
	 * 
	 * @param jobId The ID of the job post.
	 * @param admin Authenticated admin user.
	 * @return List of applications for the given job.
	 */
	@GetMapping("/admin/applications/job/{jobId}")
	public List<JobApplicationResponse> getJobApplicationsByJob(@PathVariable String jobId,
			@AuthenticationPrincipal AdminUserDetails admin) {

		return applicationService.getApplicationByJob(jobId);
	}

	/**
	 * ADMIN: Retrieves applications filtered by their current status.
	 * 
	 * @param status The status to filter by (e.g., PENDING, REVIEWED).
	 * @param admin  Authenticated admin user.
	 * @return List of applications with the specified status.
	 */
	@GetMapping("/admin/applications/status/{status}")
	public List<JobApplicationResponse> getJobApplicationByStatus(@PathVariable String status,
			@AuthenticationPrincipal AdminUserDetails admin) {

		return applicationService.getApplicationByStatus(status);
	}

	/**
	 * ADMIN: Retrieves full details of a single application.
	 * 
	 * @param id    Application ID.
	 * @param admin Authenticated admin user.
	 * @return The detailed application response.
	 */
	@GetMapping("admin/applications/{id}")
	public JobApplicationResponse getApplicationById(@PathVariable String id,
			@AuthenticationPrincipal AdminUserDetails admin) {

		return applicationService.getApplicationById(id);
	}

	/**
	 * ADMIN: Updates the status of an application.
	 * <p>
	 * Used for moving candidates through the hiring pipeline (e.g., PENDING ->
	 * REVIEWED -> INTERVIEW).
	 * </p>
	 * 
	 * @param id      Application ID.
	 * @param request DTO containing the new status.
	 * @param admin   Authenticated admin user performing the update.
	 * @return The updated application.
	 */
	@PatchMapping("/admin/applications/{id}/status")
	public JobApplicationResponse updateStatus(@PathVariable String id,
			@Valid @RequestBody ApplicationStatusUpdateRequest request,
			@AuthenticationPrincipal AdminUserDetails admin) {

		String adminId = admin.getAdmin().getId();

		return applicationService.updateApplicationByStatus(id, request.getStatus(), adminId);
	}

	/**
	 * ADMIN: Deletes an application by ID.
	 * <p>
	 * This action is permanent and also removes any associated resume files from
	 * storage.
	 * </p>
	 * 
	 * @param id    Application ID.
	 * @param admin Authenticated admin user.
	 * @throws IOException If file deletion fails.
	 */
	@DeleteMapping("/admin/applications/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteApplication(@PathVariable String id,
			@AuthenticationPrincipal AdminUserDetails admin) throws IOException {

		applicationService.deleteApplication(id);
	}
}

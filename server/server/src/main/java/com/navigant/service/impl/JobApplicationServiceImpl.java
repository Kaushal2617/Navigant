package com.navigant.service.impl;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.navigant.dto.JobApplicationCreateRequest;
import com.navigant.dto.JobApplicationResponse;
import com.navigant.exception.JobApplicationNotFoundException;
import com.navigant.exception.JobNotFoundException;
import com.navigant.model.JobApplication;
import com.navigant.repository.JobApplicationRepository;
import com.navigant.repository.JobPostRepository;
import com.navigant.service.EmailService;
import com.navigant.service.JobApplicationService;
import com.navigant.service.SettingService;

@Service
public class JobApplicationServiceImpl implements JobApplicationService {

	private final JobApplicationRepository applicationRepository;
	private final JobPostRepository jobPostRepository;
	private final Cloudinary cloudinary;

	@Autowired
	private EmailService emailService;

	@Autowired
	private SettingService settingService;

	public JobApplicationServiceImpl(JobApplicationRepository applicationRepository,
			JobPostRepository jobPostRepository, Cloudinary cloudinary) {

		this.applicationRepository = applicationRepository;
		this.jobPostRepository = jobPostRepository;
		this.cloudinary = cloudinary;
	}

	@Override
	public JobApplicationResponse submitApplication(JobApplicationCreateRequest request, MultipartFile resumePdf)
			throws IOException {

		// 1. Validate job exists
		if (!jobPostRepository.existsById(request.getJobPostId())) {
			throw new JobNotFoundException("Job not found with id: " + request.getJobPostId());
		}

		// 2. Check if already applied
		if (applicationRepository.existsByJobPostIdAndApplicantEmail(request.getJobPostId(),
				request.getApplicantEmail())) {
			throw new IllegalArgumentException("You have already applied to this job");
		}

		// 3. Validate and upload resume
		validateResume(resumePdf);
		Map<String, Object> uploadResult = UploadResume(resumePdf, request.getApplicantEmail());

		String resumeUrl = (String) uploadResult.get("secure_url");
		String publicId = (String) uploadResult.get("public_id");

		// 4. Create application
		JobApplication application = JobApplication.createNew(
				request.getJobPostId(),
				request.getApplicantName(),
				request.getApplicantEmail(),
				request.getApplicantPhone(),
				resumeUrl,
				publicId,
				request.getCoverLetter());

		// 5. Save and return
		JobApplication saved = applicationRepository.save(application);

		// --- Send Notification (Dynamic) ---
		if (settingService.isNotificationEnabled(SettingService.KEY_JOB_NOTIFICATIONS)) {
			String targetEmail = settingService.getNotificationEmail(SettingService.KEY_JOB_NOTIFICATIONS);

			if (targetEmail != null && !targetEmail.isEmpty()) {
				String subject = "New Job Application: " + request.getApplicantName();
				String body = String.format("""
						New application received for Job ID: %s

						         Applicant: %s
						         Email: %s
						         Phone: %s

						         Resume Link: %s

						         Login to admin panel to review.
						""",
						request.getJobPostId(),
						request.getApplicantName(),
						request.getApplicantEmail(),
						request.getApplicantPhone(),
						saved.getResumeUrl());

				emailService.sendEmail(targetEmail, subject, body);
			}
		}

		return new JobApplicationResponse(saved);
	}

	@Override
	public List<JobApplicationResponse> getAllApplications() {

		return applicationRepository.findAll().stream()
				.map(JobApplicationResponse::new)
				.collect(Collectors.toList());
	}

	@Override
	public void exportApplicationsToCsv(java.io.Writer writer) {
		try (org.apache.commons.csv.CSVPrinter printer = new org.apache.commons.csv.CSVPrinter(writer,
				org.apache.commons.csv.CSVFormat.DEFAULT.builder()
						.setHeader("ID", "Job ID", "Name", "Email", "Phone", "Status", "Resume URL", "Applied Date")
						.build())) {

			List<JobApplication> allApps = applicationRepository.findAll();
			for (JobApplication app : allApps) {
				printer.printRecord(
						app.getId(),
						app.getJobPostId(),
						app.getApplicantName(),
						app.getApplicantEmail(),
						app.getApplicantPhone(),
						app.getStatus(),
						app.getResumeUrl(),
						app.getAppliedAt());
			}
		} catch (java.io.IOException e) {
			throw new RuntimeException("Error while writing CSV", e);
		}
	}

	@Override
	public List<JobApplicationResponse> getApplicationByJob(String jobPostId) {

		return applicationRepository.findByJobPostId(jobPostId).stream()
				.map(JobApplicationResponse::new)
				.collect(Collectors.toList());
	}

	@Override
	public List<JobApplicationResponse> getApplicationByStatus(String status) {

		return applicationRepository.findByStatus(status).stream()
				.map(JobApplicationResponse::new)
				.collect(Collectors.toList());
	}

	@Override
	public JobApplicationResponse updateApplicationByStatus(String applicationId,
			String status,
			String adminId) {

		JobApplication application = applicationRepository.findById(applicationId)
				.orElseThrow(() -> new JobApplicationNotFoundException(
						"Application not found with id: " + applicationId));

		// Use immutable copy-with method instead of setters
		JobApplication updated = application.withStatus(status, adminId);

		JobApplication saved = applicationRepository.save(updated);

		return new JobApplicationResponse(saved);
	}

	@Override
	public JobApplicationResponse getApplicationById(String id) {

		JobApplication application = applicationRepository.findById(id)
				.orElseThrow(() -> new JobApplicationNotFoundException(
						"Application not found with id: " + id));
		return new JobApplicationResponse(application);
	}

	@Override
	public void deleteApplication(String id) throws IOException {
		JobApplication application = applicationRepository.findById(id)
				.orElseThrow(() -> new JobApplicationNotFoundException(
						"Application not found with id: " + id));

		// Delete resume from Cloudinary
		if (application.getResumePublicId() != null) {
			cloudinary.uploader().destroy(application.getResumePublicId(),
					ObjectUtils.asMap("resource_type", "raw"));
		}

		// Delete from database
		applicationRepository.deleteById(id);
	}

	// Helper methods

	private void validateResume(MultipartFile file) {
		if (file == null || file.isEmpty()) {
			throw new IllegalArgumentException("Resume file is required");
		}

		if (!"application/pdf".equals(file.getContentType())) {
			throw new IllegalArgumentException("Resume must be a pdf file");
		}

		if (file.getSize() > 5 * 1024 * 1024) {
			throw new IllegalArgumentException("Resume file size must not exceed 5MB");
		}
	}

	private Map<String, Object> UploadResume(MultipartFile file, String email) throws IOException {

		// Create unique filename
		String filename = "resume_" + email.replace("@", "_").replace(".", "_") + "_" + System.currentTimeMillis();

		return cloudinary.uploader().upload(file.getBytes(),
				ObjectUtils.asMap(
						"resource_type", "raw", // For PDFs
						"folder", "job-applications", // Organized folder
						"public_id", filename, // Unique name
						"overwrite", false // Don't overwrite
				));
	}

}

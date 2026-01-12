package com.navigant.dto;

import java.time.Instant;

import com.navigant.model.JobApplication;

import lombok.Data;

/**
 * DTO for job application response.
 * Returned to both public and admin APIs.
 */
@Data
public class JobApplicationResponse {

	private String id;
	private String jobPostId;
	private String applicantName;
	private String applicantEmail;
	private String applicantPhone;
	private String resumeUrl;
	private String coverLetter;
	private String status;
	private Instant appliedAt;
	private Instant updatedAt;
	private String reviewedBy;
	private String jobTitle; // Added field for display

	// Constructor from entity
	public JobApplicationResponse(JobApplication application) {
		super();
		this.id = application.getId();
		this.jobPostId = application.getJobPostId();
		this.applicantName = application.getApplicantName();
		this.applicantEmail = application.getApplicantEmail();
		this.applicantPhone = application.getApplicantPhone();
		this.resumeUrl = application.getResumeUrl();
		this.coverLetter = application.getCoverLetter();
		this.status = application.getStatus();
		this.appliedAt = application.getAppliedAt();
		this.updatedAt = application.getUpdatedAt();
		this.reviewedBy = application.getReviewedBy();
	}

}

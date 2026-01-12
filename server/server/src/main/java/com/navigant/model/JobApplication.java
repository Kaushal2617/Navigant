package com.navigant.model;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * Immutable domain entity representing a job application submitted by a
 * candidate.
 * 
 * Design principles:
 * - All fields final → full immutability
 * - Factory method for creation
 * - Copy-with methods for functional updates
 */
@Document(collection = "jobApplication")
public final class JobApplication {

	@Id
	private final String id;

	@Field("jobPostId")
	private final String jobPostId; // Which job applicant applied to

	@Field("jobTitle")
	private final String jobTitle; // Denormalized for performance/history

	@Field("applicantName")
	private final String applicantName;

	@Field("applicantEmail")
	private final String applicantEmail;

	@Field("applicantPhone")
	private final String applicantPhone;

	@Field("resumeUrl")
	private final String resumeUrl; // Cloudinary URL

	@Field("resumePublicId")
	private final String resumePublicId; // Cloudinary public ID (for deletion)

	@Field("coverLetter")
	private final String coverLetter;

	@Field("status")
	private final String status; // NEW, REVIEWED, SHORTLISTED, REJECTED, HIRED

	@Field("appliedAt")
	private final Instant appliedAt;

	@Field("updatedAt")
	private final Instant updatedAt;

	@Field("reviewedBy")
	private final String reviewedBy; // Admin ID who reviewed

	/**
	 * Primary constructor (used by Spring Data MongoDB on load).
	 * All fields final → full immutability.
	 */
	public JobApplication(String id, String jobPostId, String jobTitle, String applicantName, String applicantEmail,
			String applicantPhone, String resumeUrl, String resumePublicId, String coverLetter,
			String status, Instant appliedAt, Instant updatedAt, String reviewedBy) {
		this.id = id;
		this.jobPostId = jobPostId;
		this.jobTitle = jobTitle;
		this.applicantName = applicantName;
		this.applicantEmail = applicantEmail;
		this.applicantPhone = applicantPhone;
		this.resumeUrl = resumeUrl;
		this.resumePublicId = resumePublicId;
		this.coverLetter = coverLetter;
		this.status = status;
		this.appliedAt = appliedAt;
		this.updatedAt = updatedAt;
		this.reviewedBy = reviewedBy;
	}

	// --- Factory method for creation ---
	public static JobApplication createNew(String jobPostId, String jobTitle, String applicantName,
			String applicantEmail,
			String applicantPhone, String resumeUrl, String resumePublicId, String coverLetter) {
		Instant now = Instant.now();
		return new JobApplication(null, jobPostId, jobTitle, applicantName, applicantEmail, applicantPhone,
				resumeUrl, resumePublicId, coverLetter, "NEW", now, now, null);
	}

	// --- Copy-with methods for functional updates ---
	public JobApplication withStatus(String status, String reviewedBy) {
		return new JobApplication(this.id, this.jobPostId, this.jobTitle, this.applicantName, this.applicantEmail,
				this.applicantPhone, this.resumeUrl, this.resumePublicId, this.coverLetter,
				status, this.appliedAt, Instant.now(), reviewedBy);
	}

	// --- Getters (read-only access) ---
	public String getId() {
		return id;
	}

	public String getJobPostId() {
		return jobPostId;
	}

	public String getJobTitle() {
		return jobTitle;
	}

	public String getApplicantName() {
		return applicantName;
	}

	public String getApplicantEmail() {
		return applicantEmail;
	}

	public String getApplicantPhone() {
		return applicantPhone;
	}

	public String getResumeUrl() {
		return resumeUrl;
	}

	public String getResumePublicId() {
		return resumePublicId;
	}

	public String getCoverLetter() {
		return coverLetter;
	}

	public String getStatus() {
		return status;
	}

	public Instant getAppliedAt() {
		return appliedAt;
	}

	public Instant getUpdatedAt() {
		return updatedAt;
	}

	public String getReviewedBy() {
		return reviewedBy;
	}

}

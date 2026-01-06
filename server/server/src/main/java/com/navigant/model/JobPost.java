package com.navigant.model;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * Immutable domain entity representing a job posting.
 * 
 * Design principles:
 * - All fields final → full immutability
 * - Factory method for creation
 * - Copy-with methods for functional updates
 * - Uses Instant for timestamps (consistent with Admin)
 */
@Document(collection = "jobPosts")
public final class JobPost {

	@Id
	private final String id;

	@Field("title")
	private final String title;

	@Field("description")
	private final String description;

	@Field("location")
	private final String location;

	@Field("jobType")
	private final String jobType; // e.g. FULL_TIME, PART_TIME, CONTRACT

	@Field("requirements")
	private final String requirements;

	@Field("responsibilities")
	private final String responsibilities;

	@Field("salaryRange")
	private final String salaryRange; // e.g., "₹5L - ₹8L", "Competitive"

	@Field("applicationLink")
	private final String applicationLink;

	@Field("status")
	private final String status; // DRAFT, PUBLISHED, EXPIRED

	@Field("createdBy")
	private final String createdBy;

	@Field("createdAt")
	private final Instant createdAt;

	@Field("expiresAt")
	private final Instant expiresAt;

	@Field("updatedAt")
	private final Instant updatedAt;

	/**
	 * Primary constructor (used by Spring Data MongoDB on load).
	 * All fields final → full immutability.
	 */
	public JobPost(String id, String title, String description, String location, String jobType,
			String requirements, String responsibilities, String salaryRange, String applicationLink,
			String status, String createdBy, Instant createdAt, Instant expiresAt, Instant updatedAt) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.location = location;
		this.jobType = jobType;
		this.requirements = requirements;
		this.responsibilities = responsibilities;
		this.salaryRange = salaryRange;
		this.applicationLink = applicationLink;
		this.status = status;
		this.createdBy = createdBy;
		this.createdAt = createdAt;
		this.expiresAt = expiresAt;
		this.updatedAt = updatedAt;
	}

	// --- Factory method for creation ---
	public static JobPost createNew(String title, String description, String location, String jobType,
			String requirements, String responsibilities, String salaryRange, String applicationLink,
			String createdBy, Instant expiresAt) {
		Instant now = Instant.now();
		return new JobPost(null, title, description, location, jobType, requirements,
				responsibilities, salaryRange, applicationLink, "DRAFT", createdBy, now, expiresAt, now);
	}

	// --- Copy-with methods for functional updates ---
	public JobPost withStatus(String status) {
		return new JobPost(this.id, this.title, this.description, this.location, this.jobType,
				this.requirements, this.responsibilities, this.salaryRange, this.applicationLink,
				status, this.createdBy, this.createdAt, this.expiresAt, Instant.now());
	}

	public JobPost withUpdatedContent(String title, String description, String location, String jobType,
			String requirements, String responsibilities, String salaryRange, String applicationLink,
			String status, Instant expiresAt) {
		return new JobPost(this.id, title, description, location, jobType, requirements,
				responsibilities, salaryRange, applicationLink, status, this.createdBy,
				this.createdAt, expiresAt, Instant.now());
	}

	// --- Getters (read-only access) ---
	public String getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public String getDescription() {
		return description;
	}

	public String getLocation() {
		return location;
	}

	public String getJobType() {
		return jobType;
	}

	public String getRequirements() {
		return requirements;
	}

	public String getResponsibilities() {
		return responsibilities;
	}

	public String getSalaryRange() {
		return salaryRange;
	}

	public String getApplicationLink() {
		return applicationLink;
	}

	public String getStatus() {
		return status;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public Instant getCreatedAt() {
		return createdAt;
	}

	public Instant getExpiresAt() {
		return expiresAt;
	}

	public Instant getUpdatedAt() {
		return updatedAt;
	}

	// --- Helper methods ---
	public boolean isPublished() {
		return "PUBLISHED".equals(this.status);
	}

	public boolean isExpired() {
		return this.expiresAt != null && Instant.now().isAfter(this.expiresAt);
	}

}

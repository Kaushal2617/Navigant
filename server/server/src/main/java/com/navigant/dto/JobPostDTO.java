package com.navigant.dto;

import java.time.Instant;

import com.navigant.model.JobPost;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * DTO for JobPost - uses Instant for timestamps (matches entity).
 */
public class JobPostDTO {

	private String id;

	@NotBlank(message = "Title is required")
	private String title;

	@NotBlank(message = "Description is required")
	private String description;

	@NotBlank(message = "Location is required")
	private String location;

	@NotBlank(message = "Job type is required")
	private String jobType;

	private String requirements;
	private String responsibilities;
	private String salaryRange;
	private String applicationLink;

	@NotBlank(message = "Status is required")
	private String status;

	private String createdBy;

	@NotNull(message = "Expiration is required")
	private Instant expiresAt;
	private Instant createdAt;
	private Instant updatedAt;

	// Default constructor
	public JobPostDTO() {
	}

	// Constructor for conversion from JobPost
	public JobPostDTO(JobPost jobPost) {
		this.id = jobPost.getId();
		this.title = jobPost.getTitle();
		this.description = jobPost.getDescription();
		this.location = jobPost.getLocation();
		this.jobType = jobPost.getJobType();
		this.requirements = jobPost.getRequirements();
		this.responsibilities = jobPost.getResponsibilities();
		this.salaryRange = jobPost.getSalaryRange();
		this.applicationLink = jobPost.getApplicationLink();
		this.status = jobPost.getStatus();
		this.createdBy = jobPost.getCreatedBy();
		this.expiresAt = jobPost.getExpiresAt();
		this.createdAt = jobPost.getCreatedAt();
		this.updatedAt = jobPost.getUpdatedAt();
	}

	// Getters & Setters
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getJobType() {
		return jobType;
	}

	public void setJobType(String jobType) {
		this.jobType = jobType;
	}

	public String getRequirements() {
		return requirements;
	}

	public void setRequirements(String requirements) {
		this.requirements = requirements;
	}

	public String getResponsibilities() {
		return responsibilities;
	}

	public void setResponsibilities(String responsibilities) {
		this.responsibilities = responsibilities;
	}

	public String getSalaryRange() {
		return salaryRange;
	}

	public void setSalaryRange(String salaryRange) {
		this.salaryRange = salaryRange;
	}

	public String getApplicationLink() {
		return applicationLink;
	}

	public void setApplicationLink(String applicationLink) {
		this.applicationLink = applicationLink;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Instant getExpiresAt() {
		return expiresAt;
	}

	public void setExpiresAt(Instant expiresAt) {
		this.expiresAt = expiresAt;
	}

	public Instant getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Instant createdAt) {
		this.createdAt = createdAt;
	}

	public Instant getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Instant updatedAt) {
		this.updatedAt = updatedAt;
	}

}

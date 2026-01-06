package com.navigant.model;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * Immutable domain entity representing a lead/contact submission.
 * 
 * Design principles:
 * - All fields final → full immutability
 * - Factory method for creation
 * - Copy-with methods for functional updates
 * - Uses Instant for timestamps (consistent with Admin)
 */
@Document(collection = "leads")
public final class Lead {

	@Id
	private final String id;

	@Field("fullName")
	private final String fullName;

	@Field("email")
	private final String email;

	@Field("phone")
	private final String phone;

	@Field("serviceType")
	private final String serviceType; // e.g. "Inbound", "Outbound", "Data Entry"

	@Field("numberOfSeats")
	private final Integer numberOfSeats;

	@Field("remarks")
	private final String remarks; // Customer remarks

	@Field("adminComments")
	private final String adminComments; // Admin internal comments

	@Field("status")
	private final String status; // NEW, CONTACTED, CONVERTED, CLOSED

	@Field("reviewedBy")
	private final String reviewedBy;

	@Field("createdAt")
	private final Instant createdAt;

	@Field("updatedAt")
	private final Instant updatedAt;

	/**
	 * Primary constructor (used by Spring Data MongoDB on load).
	 * All fields final → full immutability.
	 */
	public Lead(String id, String fullName, String email, String phone, String serviceType,
			Integer numberOfSeats, String remarks, String adminComments, String status,
			String reviewedBy, Instant createdAt, Instant updatedAt) {
		this.id = id;
		this.fullName = fullName;
		this.email = email;
		this.phone = phone;
		this.serviceType = serviceType;
		this.numberOfSeats = numberOfSeats;
		this.remarks = remarks;
		this.adminComments = adminComments;
		this.status = status;
		this.reviewedBy = reviewedBy;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	// --- Factory method for creation ---
	public static Lead createNew(String fullName, String email, String phone,
			String serviceType, Integer numberOfSeats, String remarks) {
		Instant now = Instant.now();
		return new Lead(null, fullName, email, phone, serviceType, numberOfSeats,
				remarks, null, "NEW", null, now, now);
	}

	// --- Copy-with methods for functional updates ---
	public Lead withStatus(String status, String reviewedBy) {
		return new Lead(this.id, this.fullName, this.email, this.phone, this.serviceType,
				this.numberOfSeats, this.remarks, this.adminComments, status,
				reviewedBy, this.createdAt, Instant.now());
	}

	public Lead withAdminComments(String adminComments) {
		return new Lead(this.id, this.fullName, this.email, this.phone, this.serviceType,
				this.numberOfSeats, this.remarks, adminComments, this.status,
				this.reviewedBy, this.createdAt, Instant.now());
	}

	// --- Getters (read-only access) ---
	public String getId() {
		return id;
	}

	public String getFullName() {
		return fullName;
	}

	public String getEmail() {
		return email;
	}

	public String getPhone() {
		return phone;
	}

	public String getServiceType() {
		return serviceType;
	}

	public Integer getNumberOfSeats() {
		return numberOfSeats;
	}

	public String getRemarks() {
		return remarks;
	}

	public String getAdminComments() {
		return adminComments;
	}

	public String getStatus() {
		return status;
	}

	public String getReviewedBy() {
		return reviewedBy;
	}

	public Instant getCreatedAt() {
		return createdAt;
	}

	public Instant getUpdatedAt() {
		return updatedAt;
	}

}

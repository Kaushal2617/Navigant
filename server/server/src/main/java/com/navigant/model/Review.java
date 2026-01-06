package com.navigant.model;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * Immutable domain entity representing a client review/testimonial.
 *
 * Design principles:
 * - All fields final → full immutability
 * - Factory method for creation
 * - Copy-with methods for functional updates
 * - Unique token for secure public access
 */
@Document(collection = "reviews")
public final class Review {

	@Id
	private final String id;

	@Field("token")
	@Indexed(unique = true)
	private final String token;

	@Field("clientName")
	private final String clientName;

	@Field("clientEmail")
	private final String clientEmail;

	@Field("clientCompany")
	private final String clientCompany;

	@Field("rating")
	private final Integer rating;

	@Field("title")
	private final String title;

	@Field("content")
	private final String content;

	@Field("status")
	private final String status;

	@Field("reviewedBy")
	private final String reviewedBy;

	@Field("adminNotes")
	private final String adminNotes;

	@Field("createdAt")
	private final Instant createdAt;

	@Field("submittedAt")
	private final Instant submittedAt;

	@Field("updatedAt")
	private final Instant updatedAt;

	// Primary constructor - Used by Spring Data MongoDB when loading from database
	@org.springframework.data.annotation.PersistenceCreator
	public Review(String id, String token, String clientName, String clientEmail, String clientCompany, Integer rating,
			String title, String content, String status, String reviewedBy, String adminNotes, Instant createdAt,
			Instant submittedAt, Instant updatedAt) {
		this.id = id;
		this.token = token;
		this.clientName = clientName;
		this.clientEmail = clientEmail;
		this.clientCompany = clientCompany;
		this.rating = rating;
		this.title = title;
		this.content = content;
		this.status = status;
		this.reviewedBy = reviewedBy;
		this.adminNotes = adminNotes;
		this.createdAt = createdAt;
		this.submittedAt = submittedAt;
		this.updatedAt = updatedAt;
	}

	// FACTORY METHOD - For creating NEW reviews
	public static Review createNew(String token, String clientName, String clientEmail, String clientCompany) {

		Instant now = Instant.now();

		return new Review(null,
				token,
				clientName,
				clientEmail,
				clientCompany,
				null,
				null,
				null,
				"PENDING",
				null,
				null,
				now,
				null,
				now);
	}

	public Review withSubmission(Integer rating, String title, String content) {
		return new Review(
				this.id,
				this.token,
				this.clientName,
				this.clientEmail,
				this.clientCompany,
				rating,
				title,
				content,
				this.status,
				this.reviewedBy,
				this.adminNotes,
				this.createdAt,
				Instant.now(),
				Instant.now());
	}

	public Review withStatus(String status, String reviewedBy, String adminNotes) {
		return new Review(
				this.id,
				this.token,
				this.clientName,
				this.clientEmail,
				this.clientCompany,
				this.rating,
				this.title,
				this.content,
				status,
				reviewedBy,
				adminNotes,
				this.createdAt,
				this.submittedAt,
				Instant.now());
	}

	// GETTERS - Read-only access (No setters = Immutable)

	public String getId() {
		return id;
	}

	public String getToken() {
		return token;
	}

	public String getClientName() {
		return clientName;
	}

	public String getClientEmail() {
		return clientEmail;
	}

	public String getClientCompany() {
		return clientCompany;
	}

	public Integer getRating() {
		return rating;
	}

	public String getTitle() {
		return title;
	}

	public String getContent() {
		return content;
	}

	public String getStatus() {
		return status;
	}

	public String getReviewedBy() {
		return reviewedBy;
	}

	public String getAdminNotes() {
		return adminNotes;
	}

	public Instant getCreatedAt() {
		return createdAt;
	}

	public Instant getSubmittedAt() {
		return submittedAt;
	}

	public Instant getUpdatedAt() {
		return updatedAt;
	}

	// HELPER METHODS - Business logic convenience methods
	public boolean isSubmitted() {
		return this.submittedAt != null;
	}

	public boolean isApproved() {
		return "APPROVED".equals(this.status);
	}
}

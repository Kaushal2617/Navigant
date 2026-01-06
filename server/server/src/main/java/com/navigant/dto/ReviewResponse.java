package com.navigant.dto;

import java.time.Instant;

import com.navigant.model.Review;

public class ReviewResponse {

	private String id;
    private String token;
    private String clientName;
    private String clientEmail;
    private String clientCompany;
    private Integer rating;
    private String title;
    private String content;
    private String status;
    private String reviewedBy;
    private String reviewedByName;
    private String adminNotes;
    private Instant createdAt;
    private Instant submittedAt;
    private Instant updatedAt;
    private String reviewLink; // Generated link for client
    
 // Constructor: Entity → DTO
	public ReviewResponse(Review review) {

		this.id = review.getId();
        this.token = review.getToken();
        this.clientName = review.getClientName();
        this.clientEmail = review.getClientEmail();
        this.clientCompany = review.getClientCompany();
        this.rating = review.getRating();
        this.title = review.getTitle();
        this.content = review.getContent();
        this.status = review.getStatus();
        this.reviewedBy = review.getReviewedBy();
        this.adminNotes = review.getAdminNotes();
        this.createdAt = review.getCreatedAt();
        this.submittedAt = review.getSubmittedAt();
        this.updatedAt = review.getUpdatedAt();
	}

	// Getters and Setters
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getClientName() {
		return clientName;
	}

	public void setClientName(String clientName) {
		this.clientName = clientName;
	}

	public String getClientEmail() {
		return clientEmail;
	}

	public void setClientEmail(String clientEmail) {
		this.clientEmail = clientEmail;
	}

	public String getClientCompany() {
		return clientCompany;
	}

	public void setClientCompany(String clientCompany) {
		this.clientCompany = clientCompany;
	}

	public Integer getRating() {
		return rating;
	}

	public void setRating(Integer rating) {
		this.rating = rating;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getReviewedBy() {
		return reviewedBy;
	}

	public void setReviewedBy(String reviewedBy) {
		this.reviewedBy = reviewedBy;
	}

	public String getReviewedByName() {
		return reviewedByName;
	}

	public void setReviewedByName(String reviewedByName) {
		this.reviewedByName = reviewedByName;
	}

	public String getAdminNotes() {
		return adminNotes;
	}

	public void setAdminNotes(String adminNotes) {
		this.adminNotes = adminNotes;
	}

	public Instant getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Instant createdAt) {
		this.createdAt = createdAt;
	}

	public Instant getSubmittedAt() {
		return submittedAt;
	}

	public void setSubmittedAt(Instant submittedAt) {
		this.submittedAt = submittedAt;
	}

	public Instant getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Instant updatedAt) {
		this.updatedAt = updatedAt;
	}

	public String getReviewLink() {
		return reviewLink;
	}

	public void setReviewLink(String reviewLink) {
		this.reviewLink = reviewLink;
	}
    
	
    
}

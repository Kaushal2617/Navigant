package com.navigant.dto;

import java.time.Instant;

import com.navigant.model.Review;

public class PublicReviewResponse {

	private String id;
	private String clientName;
	private String clientEmail;
	private String clientCompany;
	private Integer rating;
	private String title;
	private String content;
	private Instant submittedAt;
	
	public PublicReviewResponse(Review review) {
		
		this.id = review.getId();
        this.clientName = review.getClientName();
        this.clientCompany = review.getClientCompany();
        this.rating = review.getRating();
        this.title = review.getTitle();
        this.content = review.getContent();
        this.submittedAt = review.getSubmittedAt();
	}

	// Getters only (no setters for public response)
	public String getId() {
		return id;
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

	public Instant getSubmittedAt() {
		return submittedAt;
	}
	
}

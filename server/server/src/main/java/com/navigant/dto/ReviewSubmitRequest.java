package com.navigant.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * Request DTO for client submitting their review.
 */
public class ReviewSubmitRequest {
	
	@NotNull(message = "Rating is required")
	@Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating cannot exceed 5")
	private Integer rating;
	
	@NotBlank(message = "Title is required")
	private String title;
	
	@NotBlank(message = "Review content is required")
	private String content;

	
	// Getters and Setters
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
	
	

}

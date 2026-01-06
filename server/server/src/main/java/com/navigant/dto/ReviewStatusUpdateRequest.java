package com.navigant.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * Request DTO for admin updating review status.
 */
public class ReviewStatusUpdateRequest {

	@NotBlank(message = "Status is required")
	private String status;
	
	private String adminNotes;

	// Getters and Setters
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getAdminNotes() {
		return adminNotes;
	}

	public void setAdminNotes(String adminNotes) {
		this.adminNotes = adminNotes;
	}
	
	
	
}

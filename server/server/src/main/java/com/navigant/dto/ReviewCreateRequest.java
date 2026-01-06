package com.navigant.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * Request DTO for admin creating a new review link.
 */
public class ReviewCreateRequest {

	@NotBlank(message = "Client name is required")
	private String clientName;

	@NotBlank(message = "Client email is required")
	@Email(message = "Invalid email format")
	private String clientEmail;
	
	private String clientCompany;
	
	// Getters and Setters

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
	
}

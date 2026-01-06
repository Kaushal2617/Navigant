package com.navigant.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Request DTO for creating a new admin.
 * Used in POST /admins endpoint.
 */
public class AdminCreateRequest {

	@NotBlank(message = "Name is required")
	@Size(max = 100, message = "Name must be at most 100 characters")
	private String name;

	@NotBlank(message = "Email is required")
	@Email(message = "Email must be valid")
	@Size(min = 8, max = 128, message = "Email must be at most 255 characters")
	private String email;

	@NotBlank(message = "Password is required")
	@Size(min = 8, max = 128, message = "Password must 8-128 characters")
	private String password;

	// Optional role field - defaults to ADMIN if null
	private String role;

	// Default constructor required for JSON deserialization
	public AdminCreateRequest() {

	}

	// Getters & setters (DTOs are mutable)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

}

package com.navigant.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public class AdminUpdateRequest {

	@Size(max = 100, message = "Name must be at most 100 characters")
	private String name;

	@Email(message = "Email must be valid")
	@Size(min = 8, max = 128, message = "Email must be at most 255 characters")
	private String email;

	@Size(min = 8, max = 128, message = "Password must 8-128 characters")
	private String password; // raw password (if provided, will be re-hashed)

	private String role; // string input (mapped to Role enum in service)
	private Boolean enabled;

	// Default constructor
	public AdminUpdateRequest() {

	}

	// Getters & setters
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

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

}// class

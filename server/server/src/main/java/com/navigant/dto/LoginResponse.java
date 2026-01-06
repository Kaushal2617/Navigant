package com.navigant.dto;

import lombok.Data;

@Data
public class LoginResponse {

	// Authenticated user's ID
	private String id;

	// Authenticated user's email
	private String email;

	// Authenticated user's role
	private String role;

	// Authenticated user's name
	private String name;

	// Constructor without type parameter (defaults to "Bearer")
	public LoginResponse(String id, String email, String role, String name) {
		this.id = id;
		this.email = email;
		this.role = role;
		this.name = name;
	}
}

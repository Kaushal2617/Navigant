package com.navigant.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * DTO for login requests.
 * Contains email and password for authentication.
 */
@Data
public class LoginRequest {

	@NotBlank(message = "Email is required")
	@Email(message = "Email must be valid")
	private String email;
	
	@NotBlank(message = "Password is required")
	private String password;
}

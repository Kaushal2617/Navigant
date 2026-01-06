package com.navigant.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

/**
 * DTO for creating a new job application via the public API.
 * <p>
 * This class is used to bind multipart form data from the submission request.
 * Validation constraints ensure all required contact information is present.
 * </p>
 */
@Data
public class JobApplicationCreateRequest {

	@NotBlank(message = "Job Id is required")
	private String jobPostId;

	@NotBlank(message = "Applicant name is required")
	private String applicantName;

	@NotBlank(message = "Applicant email is required")
	@Email(message = "Email must be valid")
	private String applicantEmail;

	@NotBlank(message = "Applicant phone number is required")
	@Pattern(regexp = "^[0-9]{10}$", message = "Phone must be 10 digits")
	private String applicantPhone;

	private String coverLetter;
}

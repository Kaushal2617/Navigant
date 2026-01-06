package com.navigant.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

/**
 * DTO for updating application status.
 * Admin-only operation.
 */
@Data
public class ApplicationStatusUpdateRequest {

	@NotBlank(message = "Status is required")
	@Pattern(regexp = "^(NEW|REVIEWED|SHORTLISTED|REJECTED|HIRED)$", message = "Status must be NEW, REVIEWED, SHORTLISTED, REJECTED or HIRED")
	private String status;
}

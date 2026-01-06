package com.navigant.dto;

import jakarta.validation.constraints.NotBlank;

public record CaseStudyUpdateRequest(
		
		@NotBlank
		String title,
		
		@NotBlank
		String description,
		
		String fullContent,
		String image,
		
		@NotBlank
		String category,
		String alt,
		
		@NotBlank
		String status,
		Integer order
		) {

}

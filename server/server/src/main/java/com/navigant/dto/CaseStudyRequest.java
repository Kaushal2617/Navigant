package com.navigant.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CaseStudyRequest(
		
		@NotBlank(message = "Title is required")
		@Size(max = 200, message = "Title must be less than 200 characters")
		String title,
		
		@NotBlank(message = "Description is required")
		@Size(max = 500, message = "Description must be less than 500 characters")
		String description,
		
		String fullContent,
		String image,
		
		@NotBlank(message = "Category is required")
		String category,
		
		String alt,
		Integer order
		
		) {

}

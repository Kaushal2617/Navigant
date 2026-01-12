package com.navigant.dto;

import java.time.Instant;

import com.navigant.model.CaseStudy;

public record CaseStudyResponse(

		String id,
		String title,
		String description,
		String fullContent,
		String image,
		String category,
		String alt,
		String status,
		Integer order,
		Instant publishDate,
		Instant createdAt,
		Instant updatedAt

) {

	public static CaseStudyResponse fromEntity(CaseStudy entity) {
		return new CaseStudyResponse(entity.getId(),
				entity.getTitle(),
				entity.getDescription(),
				entity.getFullContent(),
				entity.getImage(),
				entity.getCategory(),
				entity.getAlt(),
				entity.getStatus(),
				entity.getOrder(),
				entity.getPublishDate(),
				entity.getCreatedAt(),
				entity.getUpdatedAt());
	}
}

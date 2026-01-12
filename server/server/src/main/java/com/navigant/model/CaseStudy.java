package com.navigant.model;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "case_studies")
public final class CaseStudy {

	@Id
	private final String id;

	@Field("title")
	private final String title;

	@Field("description")
	private final String description;

	@Field("fullContent")
	private final String fullContent;

	@Field("image")
	private final String image;

	@Field("category")
	private final String category;

	@Field("alt")
	private final String alt;

	@Field("status")
	private final String status;

	@Field("order")
	private final Integer order;

	@Field("publishDate")
	private final Instant publishDate;

	@Field("createdAt")
	private final Instant createdAt;

	@Field("updatedAt")
	private final Instant updatedAt;

	@PersistenceCreator
	public CaseStudy(String id, String title, String description, String fullContent, String image, String category,
			String alt, String status, Integer order, Instant publishDate, Instant createdAt, Instant updatedAt) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.fullContent = fullContent;
		this.image = image;
		this.category = category;
		this.alt = alt;
		this.status = status;
		this.order = order;
		this.publishDate = publishDate;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	// Factory method for creation
	public static CaseStudy createNew(String title, String description, String fullContent, String image,
			String category,
			String alt, Integer order, Instant publishDate) {
		Instant now = Instant.now();
		return new CaseStudy(null, title, description, fullContent, image, category, alt, "DRAFT", order, publishDate,
				now, now);
	}

	// Copy-with method for updates
	public CaseStudy withUpdate(String title, String description, String fullContent,
			String image, String category, String alt, String status, Integer order, Instant publishDate) {

		return new CaseStudy(this.id, title, description, fullContent, image, category, alt,
				status, order, publishDate, this.createdAt, Instant.now());

	}

	// Getters (no setters - immutable)
	public String getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public String getDescription() {
		return description;
	}

	public String getFullContent() {
		return fullContent;
	}

	public String getImage() {
		return image;
	}

	public String getCategory() {
		return category;
	}

	public String getAlt() {
		return alt;
	}

	public String getStatus() {
		return status;
	}

	public Integer getOrder() {
		return order;
	}

	public Instant getPublishDate() {
		return publishDate;
	}

	public Instant getCreatedAt() {
		return createdAt;
	}

	public Instant getUpdatedAt() {
		return updatedAt;
	}

	public boolean isPublished() {
		return "PUBLISHED".equals(this.status);
	}

}

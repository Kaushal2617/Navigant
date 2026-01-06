package com.navigant.dto;

import java.time.Instant;

import com.navigant.model.Lead;

/**
 * DTO for Lead - uses Instant for timestamps (matches entity).
 */
public class LeadResponse {

	private String id;
	private String fullName;
	private String email;
	private String phone;
	private String serviceType;
	private Integer numberOfSeats;
	private String remarks;
	private String adminComments;
	private String status;
	private String reviewedBy;
	private String reviewedByName; // Admin name for display

	private Instant createdAt;
	private Instant updatedAt;

	// Constructor converts Entity -> DTO
	public LeadResponse(Lead lead) {
		this.id = lead.getId();
		this.fullName = lead.getFullName();
		this.email = lead.getEmail();
		this.phone = lead.getPhone();
		this.serviceType = lead.getServiceType();
		this.numberOfSeats = lead.getNumberOfSeats();
		this.remarks = lead.getRemarks();
		this.adminComments = lead.getAdminComments();
		this.status = lead.getStatus();
		this.reviewedBy = lead.getReviewedBy();
		this.reviewedByName = null; // Set separately via setReviewedByName
		this.createdAt = lead.getCreatedAt();
		this.updatedAt = lead.getUpdatedAt();
	}

	// Getters and Setters
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getServiceType() {
		return serviceType;
	}

	public void setServiceType(String serviceType) {
		this.serviceType = serviceType;
	}

	public Integer getNumberOfSeats() {
		return numberOfSeats;
	}

	public void setNumberOfSeats(Integer numberOfSeats) {
		this.numberOfSeats = numberOfSeats;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getAdminComments() {
		return adminComments;
	}

	public void setAdminComments(String adminComments) {
		this.adminComments = adminComments;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getReviewedBy() {
		return reviewedBy;
	}

	public void setReviewedBy(String reviewedBy) {
		this.reviewedBy = reviewedBy;
	}

	public String getReviewedByName() {
		return reviewedByName;
	}

	public void setReviewedByName(String reviewedByName) {
		this.reviewedByName = reviewedByName;
	}

	public Instant getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Instant createdAt) {
		this.createdAt = createdAt;
	}

	public Instant getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Instant updatedAt) {
		this.updatedAt = updatedAt;
	}

}

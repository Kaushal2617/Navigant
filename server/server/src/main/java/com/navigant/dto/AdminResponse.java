package com.navigant.dto;

import java.time.Instant;

/**
 * Response DTO for admin data — safe for external exposure.
 * Excludes sensitive fields (e.g., passwordHash).
 */
public class AdminResponse {

	private final String id;
	private final String name;
	private final String email;
	private final String role;
	private final boolean enabled;
	private final Instant createdAt;
	private final Instant updatedAt;
	
	public AdminResponse(String id, String name, String email, String role, boolean enabled, Instant createdAt,
			Instant updatedAt) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.role = role;
		this.enabled = enabled;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	// Immutable — getters only
	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getEmail() {
		return email;
	}

	public String getRole() {
		return role;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public Instant getCreatedAt() {
		return createdAt;
	}

	public Instant getUpdatedAt() {
		return updatedAt;
	}
	
}//class

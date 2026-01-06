package com.navigant.model;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Immutable domain entity representing an admin user.
 * 
 * Design principles:
 * - Created once, never modified (functional update via new instance if needed)
 * - Password is stored as hash only
 * - Uses String ID (Mongo ObjectId auto-converted to String by Spring Data)
 * - Timestamps added for auditability (createdAt, updatedAt)
 */
@Document(collection = "admins")
public final class Admin {

	@Id
	private final String id;
	private final String name;
	private final String email;
	private final String passwordHash;
	private final Role role;
	private final boolean enabled;
	private final Instant createdAt;
	private final Instant updatedAt;

	/**
	 * Primary constructor (used by Spring Data MongoDB on load).
	 * All fields final → full immutability.
	 */
	@org.springframework.data.annotation.PersistenceCreator
	public Admin(String id, String name, String email, String passwordHash, Role role, boolean enabled,
			Instant createdAt, Instant updatedAt) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.passwordHash = passwordHash;
		this.role = role;
		this.enabled = enabled;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	// --- Factory method for creation (external use: service layer) ---
	public static Admin createNew(String name, String email, String passwordHash, Role role) {
		Instant now = Instant.now();
		return new Admin(null, name, email, passwordHash, role, true, now, now);
	}

	// --- Copy-with for functional updates (e.g., enable/disable, role change) ---
	public Admin withName(String name) {
		return new Admin(this.id, name, this.email, this.passwordHash, this.role, this.enabled, this.createdAt,
				Instant.now());
	}

	public Admin withRole(Role role) {
		return new Admin(this.id, this.name, this.email, this.passwordHash, role, this.enabled, this.createdAt,
				Instant.now());
	}

	public Admin withEnabled(boolean enabled) {
		return new Admin(this.id, name, this.email, this.passwordHash, this.role, enabled, this.createdAt,
				Instant.now());
	}

	// --- Getters (read-only access) ---
	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getEmail() {
		return email;
	}

	public String getPasswordHash() {
		return passwordHash;
	}

	public Role getRole() {
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

}

package com.navigant.model;

/**
 * Enum representing admin roles with hierarchical permissions.
 * Extend as needed (e.g., add `MODERATOR`, `SUPPORT_AGENT`).
 * 
 * Designed for:
 * - Immutability (no setters, final fields)
 * - Extensibility (e.g., add `getLevel()` for permission checks)
 * - JSON serialization/deserialization compatibility
 */

public enum Role {

	ADMIN("ADMIN"),
	SUPER_ADMIN("SUPER_ADMIN");

	private final String value;
	
	Role(String value) {
		this.value = value;
	}
	
	// Explicit getter for JSON (e.g., Jackson) and MongoDB serialization
	public String getValue() {
		return value;
	}
	
	// Optional: static factory for safe string-to-enum conversion
	public static Role fromString(String value) {
		for(Role role:Role.values()) {
			if(role.value.equalsIgnoreCase(value)) {
				return role;
			}
		}
		throw new IllegalArgumentException("Unknown Role : "+value);
	}
	
	 // Override toString for logging/debugging clarity
	@Override
	public String toString() {
		return value;
	}
}

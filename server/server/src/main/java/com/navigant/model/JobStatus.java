package com.navigant.model;

/**
 * Enum representing the status of a Job Post.
 * Provides type safety for status values.
 */
public enum JobStatus {

    DRAFT("DRAFT"),
    PUBLISHED("PUBLISHED"),
    PAUSED("PAUSED"),
    EXPIRED("EXPIRED"),
    CLOSED("CLOSED");

    private final String value;

    JobStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    /**
     * Convert from string (for backward compatibility).
     */
    public static JobStatus fromString(String status) {
        if (status == null)
            return DRAFT;
        for (JobStatus s : values()) {
            if (s.value.equalsIgnoreCase(status)) {
                return s;
            }
        }
        return DRAFT; // Default
    }
}

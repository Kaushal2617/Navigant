package com.navigant.model;

/**
 * Enum representing the status of a Job Application.
 * Provides type safety for status values.
 */
public enum ApplicationStatus {

    NEW("NEW"),
    REVIEWED("REVIEWED"),
    SHORTLISTED("SHORTLISTED"),
    INTERVIEW_SCHEDULED("INTERVIEW_SCHEDULED"),
    REJECTED("REJECTED"),
    HIRED("HIRED");

    private final String value;

    ApplicationStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    /**
     * Convert from string (for backward compatibility).
     */
    public static ApplicationStatus fromString(String status) {
        if (status == null)
            return NEW;
        for (ApplicationStatus s : values()) {
            if (s.value.equalsIgnoreCase(status)) {
                return s;
            }
        }
        return NEW; // Default
    }
}

package com.navigant.model;

/**
 * Enum representing the status of a Lead.
 * Provides type safety for status values.
 */
public enum LeadStatus {

    NEW("NEW"),
    CONTACTED("CONTACTED"),
    QUALIFIED("QUALIFIED"),
    CONVERTED("CONVERTED"),
    CLOSED("CLOSED");

    private final String value;

    LeadStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    /**
     * Convert from string (for backward compatibility).
     */
    public static LeadStatus fromString(String status) {
        if (status == null)
            return NEW;
        for (LeadStatus s : values()) {
            if (s.value.equalsIgnoreCase(status)) {
                return s;
            }
        }
        return NEW; // Default
    }
}

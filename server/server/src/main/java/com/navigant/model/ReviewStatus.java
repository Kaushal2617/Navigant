package com.navigant.model;

/**
 * Enum representing review approval status.
 */
public enum ReviewStatus {
	
	PENDING("PENDING"),
	APPROVED("APPROVED"),
	REJECTED("REJECTED");
	
	private final String value;
	
	ReviewStatus(String value){
		this.value = value;
	}
	
	public String getValue() {
		return value;
	}
	
	public static ReviewStatus fromString(String value) {
		for(ReviewStatus status : ReviewStatus.values()) {
			if(status.value.equalsIgnoreCase(value)) {
				return status;
			}
		}
		throw new IllegalArgumentException("Unknown ReviewStatus: "+value);
	}
	
	@Override
	public String toString() {
		return value;
	}

}

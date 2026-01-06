package com.navigant.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "settings")
public class Setting {

	@Id
	private String id;					// Unique identifier, e.g., "LEAD_NOTIFICATIONS"
	
	@Field("value")
	private String value;				// The setting value, e.g., "leads@company.com"
	
	@Field("enabled")
	private boolean enabled;			// Toggle for On/Off
	
	@Field("description")
	private String description;			// UI friendly label
	
	public Setting() {}

	public Setting(String id, String value, boolean enabled, String description) {
		this.id = id;
		this.value = value;
		this.enabled = enabled;
		this.description = description;
	}

	 // Getters and Setters
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	
	
}

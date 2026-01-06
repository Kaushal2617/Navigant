package com.navigant.dto;

import com.navigant.model.Setting;

public class SettingDTO {

	private String id;
    private String value;
    private boolean enabled;
    private String description;
    public SettingDTO() {}
    
	public SettingDTO(Setting setting) {
		this.id = setting.getId();
        this.value = setting.getValue();
        this.enabled = setting.isEnabled();
        this.description = setting.getDescription();
	}

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

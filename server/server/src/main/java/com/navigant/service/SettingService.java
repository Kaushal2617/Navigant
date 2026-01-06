package com.navigant.service;

import java.util.List;

import com.navigant.dto.SettingDTO;

/**
 * Service Interface for System Settings.
 * <p>
 * Manages key-value pairs for application configuration.
 * Includes helper methods to check specific feature toggles.
 * </p>
 */
public interface SettingService {

	// Constant Keys for known settings
	String KEY_LEAD_NOTIFICATIONS = "LEAD_NOTIFICATIONS";
	String KEY_JOB_NOTIFICATIONS = "JOB_NOTIFICATIONS";

	/**
	 * Retrieves all stored settings.
	 * 
	 * @return List of settings.
	 */
	List<SettingDTO> getAllSettings();

	/**
	 * Updates a setting's value.
	 * 
	 * @param key        Setting key.
	 * @param settingDTO details containing new value.
	 * @return Updated setting.
	 */
	SettingDTO updateSetting(String key, SettingDTO settingDTO);

	/**
	 * Helper: Checks if notifications are enabled for a specific key.
	 * 
	 * @param key Setting key.
	 * @return True if enabled, False otherwise.
	 */
	boolean isNotificationEnabled(String key);

	/**
	 * Helper: Gets the configured email address for notifications.
	 * 
	 * @param key Setting key.
	 * @return Email string.
	 */
	String getNotificationEmail(String key);
}

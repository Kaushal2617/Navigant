package com.navigant.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.navigant.dto.SettingDTO;
import com.navigant.service.SettingService;

/**
 * Controller for Global Application Settings.
 * <p>
 * Manages configuration values like email notification toggles.
 * Only accessible to Admins (secured by global config).
 * </p>
 */
@RestController
@RequestMapping("/api/v1/settings")
public class SettingController {

	private final SettingService settingService;

	public SettingController(SettingService settingService) {
		this.settingService = settingService;
	}

	/**
	 * ADMIN: Retrieves all system settings.
	 * 
	 * @return List of settings.
	 */
	@GetMapping
	public List<SettingDTO> getAllSettings() {
		return settingService.getAllSettings();
	}

	/**
	 * ADMIN: Updates a specific setting value.
	 * 
	 * @param id            The setting key (e.g., LEAD_NOTIFICATIONS).
	 * @param updateRequest New value.
	 * @return Updated setting.
	 */
	@PutMapping("/{id}")
	public SettingDTO updateSetting(@PathVariable String id, @RequestBody SettingDTO updateRequest) {
		return settingService.updateSetting(id, updateRequest);
	}
}

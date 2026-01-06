package com.navigant.service.impl;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.navigant.dto.SettingDTO;
import com.navigant.model.Setting;
import com.navigant.repository.SettingRepository;
import com.navigant.service.SettingService;
import jakarta.annotation.PostConstruct;

@Service
public class SettingServiceImpl implements SettingService {

    @Autowired
    private SettingRepository settingRepository;

    // Inject defaults from application.yml
    @Value("${app.notifications.leads-email}")
    private String defaultLeadsEmail;

    @Value("${app.notifications.hr-email}")
    private String defaultHrEmail;

    /**
     * Initialize default settings if they don't exist.
     */
    @PostConstruct
    public void initDefaults() {
        createIfNotExists(KEY_LEAD_NOTIFICATIONS, defaultLeadsEmail, true, "Lead Form Email Notifications");
        createIfNotExists(KEY_JOB_NOTIFICATIONS, defaultHrEmail, true, "Job Application Email Notifications");
    }

    private void createIfNotExists(String key, String defaultValue, boolean defaultEnabled, String desc) {
        if (!settingRepository.existsById(key)) {
            settingRepository.save(new Setting(key, defaultValue, defaultEnabled, desc));
        }
    }

    @Override
    public List<SettingDTO> getAllSettings() {
        return settingRepository.findAll().stream()
                .map(SettingDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public SettingDTO updateSetting(String key, SettingDTO dto) {
        Setting setting = settingRepository.findById(key)
                .orElseThrow(() -> new RuntimeException("Setting not found: " + key));

        setting.setValue(dto.getValue());
        setting.setEnabled(dto.isEnabled());
        // Description is usually static but can be updated if needed

        Setting updated = settingRepository.save(setting);
        return new SettingDTO(updated);
    }

    // --- Helper methods for other services ---
    @Override
    public boolean isNotificationEnabled(String key) {
        return settingRepository.findById(key)
                .map(Setting::isEnabled)
                .orElse(false);
    }

    @Override
    public String getNotificationEmail(String key) {
        return settingRepository.findById(key)
                .map(Setting::getValue)
                .orElse(null);
    }
}
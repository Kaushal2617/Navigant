package com.navigant.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.navigant.model.ActivityLog;

public interface ActivityLogService {

    void log(String adminId, String action, String entityType, String entityId, String details, String ipAddress);

    Page<ActivityLog> getAllLogs(Pageable pageable);
}

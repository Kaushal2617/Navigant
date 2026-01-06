package com.navigant.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.navigant.model.ActivityLog;
import com.navigant.service.ActivityLogService;

@RestController
@RequestMapping("/api/v1/admin/logs")
public class ActivityLogController {

    private final ActivityLogService activityLogService;

    public ActivityLogController(ActivityLogService activityLogService) {
        this.activityLogService = activityLogService;
    }

    @GetMapping
    @PreAuthorize("hasRole('SUPER_ADMIN')") // Only Super Admin should see full audit logs
    public Page<ActivityLog> getAllLogs(Pageable pageable) {
        return activityLogService.getAllLogs(pageable);
    }
}

package com.navigant.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.navigant.model.ActivityLog;
import com.navigant.repository.ActivityLogRepository;
import com.navigant.service.ActivityLogService;

@Service
public class ActivityLogServiceImpl implements ActivityLogService {

    private final ActivityLogRepository repository;

    public ActivityLogServiceImpl(ActivityLogRepository repository) {
        this.repository = repository;
    }

    @Async // Run in background thread to not block main flow
    @Override
    public void log(String adminId, String action, String entityType, String entityId, String details,
            String ipAddress) {
        try {
            ActivityLog log = new ActivityLog(adminId, action, entityType, entityId, details, ipAddress);
            repository.save(log);
        } catch (Exception e) {
            // Log logging failure but don't crash application
            System.err.println("Failed to save activity log: " + e.getMessage());
        }
    }

    @Override
    public Page<ActivityLog> getAllLogs(Pageable pageable) {
        // Enforce default sort if not provided
        if (pageable.getSort().isUnsorted()) {
            pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
                    Sort.by(Sort.Direction.DESC, "createdAt"));
        }
        return repository.findAll(pageable);
    }
}

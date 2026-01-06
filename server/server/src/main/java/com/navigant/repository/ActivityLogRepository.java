package com.navigant.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.navigant.model.ActivityLog;

@Repository
public interface ActivityLogRepository extends MongoRepository<ActivityLog, String> {

    // Find logs by Admin ID
    Page<ActivityLog> findByAdminId(String adminId, Pageable pageable);

    // Find logs by Entity Type
    Page<ActivityLog> findByEntityType(String entityType, Pageable pageable);
}

package com.navigant.model;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * Audit log for tracking admin actions.
 * <p>
 * Records "Who did What, When, and to Which entity".
 * </p>
 */
@Document(collection = "activity_logs")
public class ActivityLog {

    @Id
    private String id;

    @Field("admin_id")
    private String adminId; // Who

    @Field("action")
    private String action; // CREATE, UPDATE, DELETE, LOGIN

    @Field("entity_type")
    private String entityType; // LEAD, JOB, APPLICATION, ADMIN, SETTING

    @Field("entity_id")
    private String entityId; // ID of the affected entity

    @Field("details")
    private String details; // Short description or JSON diff

    @Field("ip_address")
    private String ipAddress;

    @Field("created_at")
    private Instant createdAt = Instant.now();

    // Constructors
    public ActivityLog() {
    }

    public ActivityLog(String adminId, String action, String entityType, String entityId, String details,
            String ipAddress) {
        this.adminId = adminId;
        this.action = action;
        this.entityType = entityType;
        this.entityId = entityId;
        this.details = details;
        this.ipAddress = ipAddress;
        this.createdAt = Instant.now();
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAdminId() {
        return adminId;
    }

    public void setAdminId(String adminId) {
        this.adminId = adminId;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getEntityType() {
        return entityType;
    }

    public void setEntityType(String entityType) {
        this.entityType = entityType;
    }

    public String getEntityId() {
        return entityId;
    }

    public void setEntityId(String entityId) {
        this.entityId = entityId;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}

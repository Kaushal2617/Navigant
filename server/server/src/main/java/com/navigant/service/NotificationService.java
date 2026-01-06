package com.navigant.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.navigant.model.Notification;

/**
 * Service Interface for Notification Management.
 * <p>
 * Centralized service for logging system events and retrieving them for admins.
 * </p>
 */
public interface NotificationService {

    /**
     * Logs a new system notification.
     * 
     * @param to      Target audience (e.g., "ADMIN").
     * @param subject Short summary.
     * @param message Detailed body.
     * @param type    Category (LEAD, JOB, REVIEW).
     * @param status  Initial status (usually UNREAD).
     */
    void logNotification(String to, String subject, String message, String type, String status);

    /**
     * Retrieves all notifications paginated.
     * 
     * @param pageable Pagination config.
     * @return Page of notifications.
     */
    Page<Notification> getAllNotifications(Pageable pageable);

    /**
     * Counts notifications that have not been read yet.
     * 
     * @return Unread count.
     */
    long getUnreadCount();

    /**
     * Updates all unread notifications to READ status.
     */
    void markAllAsRead();
}

package com.navigant.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.navigant.model.Notification;
import com.navigant.security.AdminUserDetails;
import com.navigant.service.NotificationService;

/**
 * Controller for Admin Notifications.
 * <p>
 * Provides endpoints for admins to view system alerts (e.g., new leads, review
 * submissions).
 * Supports polling for unread counts and marking notifications as read.
 * </p>
 */
@RestController
@RequestMapping("/api/v1/admin/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    /**
     * ADMIN: Retrieves a paginated list of notifications.
     * 
     * @param admin    Authenticated admin.
     * @param pageable Pagination info (default sort: newest first).
     * @return Page of notifications.
     */
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public Page<Notification> getAllNotifications(
            @AuthenticationPrincipal AdminUserDetails admin,
            @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        return notificationService.getAllNotifications(pageable);
    }

    /**
     * ADMIN: Gets the count of unread notifications.
     * <p>
     * Used for the badge on the notification bell icon.
     * </p>
     * 
     * @return Count of unread notifications.
     */
    @GetMapping("/unread-count")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public long getUnreadCount() {
        return notificationService.getUnreadCount();
    }

    /**
     * ADMIN: Marks all notifications as read.
     * <p>
     * Called when the admin opens the notifications page.
     * </p>
     */
    @PatchMapping("/mark-read")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public void markAllAsRead() {
        notificationService.markAllAsRead();
    }
}

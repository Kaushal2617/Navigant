package com.navigant.service.impl;

import java.time.Instant;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.navigant.model.Notification;
import com.navigant.repository.NotificationRepository;
import com.navigant.service.NotificationService;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationServiceImpl(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    public void logNotification(String to, String subject, String message, String type, String status) {
        Notification notification = new Notification(to, subject, message, type, status, Instant.now());
        notificationRepository.save(notification);
    }

    @Override
    public Page<Notification> getAllNotifications(Pageable pageable) {
        return notificationRepository.findAll(pageable);
    }

    @Override
    public long getUnreadCount() {
        return notificationRepository.countByReadFalse();
    }

    @Override
    public void markAllAsRead() {
        var unreadNotifications = notificationRepository.findAll().stream()
                .filter(n -> !n.isRead())
                .map(n -> {
                    n.setRead(true);
                    return n;
                })
                .toList();

        if (!unreadNotifications.isEmpty()) {
            notificationRepository.saveAll(unreadNotifications);
        }
    }
}

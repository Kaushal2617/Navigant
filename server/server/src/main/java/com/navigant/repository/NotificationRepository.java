package com.navigant.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.navigant.model.Notification;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, String> {
    long countByReadFalse();
}

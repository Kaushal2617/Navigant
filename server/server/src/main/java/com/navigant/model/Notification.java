package com.navigant.model;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "notifications")
public class Notification {

    @Id
    private String id;

    @Field("recipient")
    private String recipient;

    @Field("subject")
    private String subject;

    @Field("message")
    private String message;

    @Field("type")
    private String type; // EMAIL, SYSTEM

    @Field("status")
    private String status; // SENT, FAILED

    @Field("read")
    private boolean read = false;

    @Field("createdAt")
    private Instant createdAt;

    public Notification() {
    }

    public Notification(String recipient, String subject, String message, String type, String status,
            Instant createdAt) {
        this.recipient = recipient;
        this.subject = subject;
        this.message = message;
        this.type = type;
        this.status = status;
        this.createdAt = createdAt;
        this.read = false;
    }

    public String getId() {
        return id;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public boolean isRead() {
        return read;
    }

    public void setRead(boolean read) {
        this.read = read;
    }
}

package com.navigant.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.navigant.service.EmailService;
import com.navigant.service.NotificationService;

@Service
public class EmailServiceImpl implements EmailService {

	private final JavaMailSender javaMailSender;
	private final NotificationService notificationService;

	@Value("${spring.mail.username}")
	private String senderEmail;

	public EmailServiceImpl(JavaMailSender javaMailSender, NotificationService notificationService) {
		this.javaMailSender = javaMailSender;
		this.notificationService = notificationService;
	}

	/**
	 * Send a simple text email asynchronously.
	 */
	@Override
	@Async
	public void sendEmail(String to, String subject, String body) {

		try {
			SimpleMailMessage message = new SimpleMailMessage();

			message.setFrom(senderEmail);
			message.setTo(to);
			message.setSubject(subject);
			message.setText(body);

			javaMailSender.send(message);
			System.out.println("Email sent successfully to: " + to);
			notificationService.logNotification(to, subject, body, "EMAIL", "SENT");

		} catch (Exception e) {
			System.err.println("Error sending email: " + e.getMessage());
			notificationService.logNotification(to, subject, body, "EMAIL", "FAILED");
		}

	}

}

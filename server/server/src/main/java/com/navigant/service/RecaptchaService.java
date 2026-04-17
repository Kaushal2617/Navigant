package com.navigant.service;

public interface RecaptchaService {
	void verifyLeadSubmission(String token, String remoteIp);
}

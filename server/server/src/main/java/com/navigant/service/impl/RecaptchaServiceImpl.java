package com.navigant.service.impl;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.navigant.config.AppProperties;
import com.navigant.exception.RecaptchaValidationException;
import com.navigant.service.RecaptchaService;

@Service
public class RecaptchaServiceImpl implements RecaptchaService {

	private final RestClient restClient;
	private final AppProperties appProperties;

	public RecaptchaServiceImpl(RestClient.Builder restClientBuilder, AppProperties appProperties) {
		this.restClient = restClientBuilder.build();
		this.appProperties = appProperties;
	}

	@Override
	public void verifyLeadSubmission(String token, String remoteIp) {
		AppProperties.Recaptcha config = appProperties.getRecaptcha();
		if (!config.isEnabled()) {
			return;
		}

		if (config.getSecretKey() == null || config.getSecretKey().isBlank()) {
			throw new RecaptchaValidationException("reCAPTCHA is not configured on the server.");
		}
		if (token == null || token.isBlank()) {
			throw new RecaptchaValidationException("reCAPTCHA token missing.");
		}

		MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
		requestBody.add("secret", config.getSecretKey());
		requestBody.add("response", token);
		if (remoteIp != null && !remoteIp.isBlank()) {
			requestBody.add("remoteip", remoteIp);
		}

		RecaptchaVerifyResponse response = restClient.post()
				.uri(config.getVerifyUrl())
				.contentType(MediaType.APPLICATION_FORM_URLENCODED)
				.body(requestBody)
				.retrieve()
				.body(RecaptchaVerifyResponse.class);

		if (response == null || !response.success()) {
			throw new RecaptchaValidationException("reCAPTCHA verification failed. Please try again.");
		}
		if (response.score() == null || response.score() < config.getMinimumScore()) {
			throw new RecaptchaValidationException("reCAPTCHA score too low. Please try again.");
		}
		if (response.action() == null || !config.getExpectedAction().equals(response.action())) {
			throw new RecaptchaValidationException("reCAPTCHA action mismatch.");
		}
	}

	private record RecaptchaVerifyResponse(
			boolean success,
			Double score,
			String action,
			String hostname,
			@JsonProperty("error-codes") List<String> errorCodes) {
	}
}

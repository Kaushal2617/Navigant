// config/AppProperties.java
package com.navigant.config;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
@ConfigurationProperties(prefix = "app")
public class AppProperties {

	private String env;
	private Cors cors = new Cors();
	private Recaptcha recaptcha = new Recaptcha();

	@Data
	public static class Cors {
		private List<String> allowedOrigins;
	}

	@Data
	public static class Recaptcha {
		private boolean enabled = true;
		private String secretKey;
		private double minimumScore = 0.5;
		private String expectedAction = "lead_submit";
		private String verifyUrl = "https://www.google.com/recaptcha/api/siteverify";
	}
}

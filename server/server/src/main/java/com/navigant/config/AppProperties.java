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

	@Data
	public static class Cors {
		private List<String> allowedOrigins;
	}
}

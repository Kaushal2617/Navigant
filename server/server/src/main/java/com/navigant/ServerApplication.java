//ServerApplication.java
package com.navigant;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.navigant.config.AppProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
@org.springframework.scheduling.annotation.EnableAsync
public class ServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }
}

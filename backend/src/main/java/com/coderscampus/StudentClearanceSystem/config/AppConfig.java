package com.coderscampus.StudentClearanceSystem.config;

import com.coderscampus.StudentClearanceSystem.util.NetworkUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public String baseUrl() {
        String ipAddress = NetworkUtils.getLocalIpAddress();
        return "http://" + ipAddress + ":3000";
    }
}

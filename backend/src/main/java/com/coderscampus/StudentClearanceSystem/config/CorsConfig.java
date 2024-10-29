package com.coderscampus.StudentClearanceSystem.config;

import com.coderscampus.StudentClearanceSystem.util.NetworkUtils;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String dynamicIp = "http://" + NetworkUtils.getLocalIpAddress() + ":3000";
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:3000", 
                            "http://127.0.0.1:3000", 
                            dynamicIp) // Include dynamic IP
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("Authorization", "Content-Type", "Accept")
            .exposedHeaders("Authorization")
            .allowCredentials(true);
    }
}

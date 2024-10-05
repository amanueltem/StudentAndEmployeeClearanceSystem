package com.coderscampus.StudentClearanceSystem.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000",
        "http://127.0.0.1:3000","http://localhost:3001", "http://localhost:5173",
        "http://10.42.0.1:3000","http://10.10.11.156:3000") // Allow requests from both localhost:3000 and localhost:5173
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .exposedHeaders("Authorization") // Expose Authorization header
                .allowCredentials(true);
    }
}


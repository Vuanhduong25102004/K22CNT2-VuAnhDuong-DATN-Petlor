package com.example.petlorshop.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Áp dụng cho tất cả các API bắt đầu bằng /api
                .allowedOriginPatterns("*") // Cho phép tất cả các domain (thay bằng domain frontend của bạn trong production)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Các phương thức được phép
                .allowedHeaders("*") // Cho phép tất cả các header
                .allowCredentials(true) // Cho phép gửi cookie và thông tin xác thực
                .maxAge(3600); // Thời gian cache của pre-flight request (giây)
    }
}

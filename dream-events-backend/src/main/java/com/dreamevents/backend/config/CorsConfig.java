package com.dreamevents.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.Collections;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        config.setAllowCredentials(true);
        // Allow all origin patterns for local dev and hosting flexibilty
        config.setAllowedOriginPatterns(Collections.singletonList("*"));
        
        config.setAllowedHeaders(Arrays.asList(
                "Origin", 
                "Content-Type", 
                "Accept", 
                "Authorization", 
                "x-requested-with",
                "Cache-Control"
        ));
        
        config.setAllowedMethods(Arrays.asList(
                "GET", 
                "POST", 
                "PUT", 
                "PATCH", 
                "DELETE", 
                "OPTIONS"
        ));
        
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}

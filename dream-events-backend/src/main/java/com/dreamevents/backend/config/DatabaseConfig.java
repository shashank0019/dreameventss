package com.dreamevents.backend.config;

import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import com.zaxxer.hikari.HikariDataSource;
import javax.sql.DataSource;

@Configuration
public class DatabaseConfig {

    @Bean
    @Primary
    public DataSource dataSource(DataSourceProperties properties) {
        String url = properties.getUrl();
        if (url != null && url.startsWith("postgresql://")) {
            url = "jdbc:" + url;
        }
        return properties.initializeDataSourceBuilder()
                .type(HikariDataSource.class)
                .url(url)
                .build();
    }
}

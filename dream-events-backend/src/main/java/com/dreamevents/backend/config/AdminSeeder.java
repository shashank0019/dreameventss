package com.dreamevents.backend.config;

import com.dreamevents.backend.entity.Admin;
import com.dreamevents.backend.entity.enums.Role;
import com.dreamevents.backend.repository.AdminRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class AdminSeeder implements CommandLineRunner {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${app.admin.username}")
    private String defaultUsername;

    @Value("${app.admin.password}")
    private String defaultPassword;

    @Value("${app.admin.email}")
    private String defaultEmail;

    @Override
    public void run(String... args) throws Exception {
        if (adminRepository.count() == 0) {
            log.info("No admin accounts found. Seeding default admin account...");
            Admin admin = Admin.builder()
                    .username(defaultUsername)
                    .password(passwordEncoder.encode(defaultPassword))
                    .email(defaultEmail)
                    .role(Role.ROLE_ADMIN)
                    .build();
            adminRepository.save(admin);
            log.info("Admin account seeded successfully with username: {}", defaultUsername);
        } else {
            log.info("Admin accounts already exist. Seeding skipped.");
        }
    }
}

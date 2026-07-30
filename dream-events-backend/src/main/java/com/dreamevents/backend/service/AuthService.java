package com.dreamevents.backend.service;

import com.dreamevents.backend.dto.request.LoginRequest;
import com.dreamevents.backend.dto.response.LoginResponse;
import com.dreamevents.backend.entity.Admin;
import com.dreamevents.backend.repository.AdminRepository;
import com.dreamevents.backend.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AdminRepository adminRepository;

    public LoginResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        Admin admin = adminRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("Admin account not found with username: " + loginRequest.getUsername()));

        return LoginResponse.builder()
                .token(jwt)
                .username(admin.getUsername())
                .email(admin.getEmail())
                .role(admin.getRole().name())
                .build();
    }
}

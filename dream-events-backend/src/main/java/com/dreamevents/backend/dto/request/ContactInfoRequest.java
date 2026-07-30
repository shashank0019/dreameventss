package com.dreamevents.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactInfoRequest {

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Phone number is required")
    private String phone;

    @NotBlank(message = "Address is required")
    private String address;

    private String instagramUrl;

    private String facebookUrl;

    @NotBlank(message = "WhatsApp number is required")
    private String whatsappNumber;

    private String googleMapsEmbedUrl;
}

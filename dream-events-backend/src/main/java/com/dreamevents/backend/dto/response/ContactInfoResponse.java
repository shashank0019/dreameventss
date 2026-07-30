package com.dreamevents.backend.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactInfoResponse {
    private Long id;
    private String email;
    private String phone;
    private String address;
    private String instagramUrl;
    private String facebookUrl;
    private String whatsappNumber;
    private String googleMapsEmbedUrl;
}

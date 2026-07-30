package com.dreamevents.backend.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServiceResponse {
    private Long id;
    private String title;
    private String description;
    private String imageUrl;
    private String publicId;
}

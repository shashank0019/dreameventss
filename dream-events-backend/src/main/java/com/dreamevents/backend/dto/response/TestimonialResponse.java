package com.dreamevents.backend.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TestimonialResponse {
    private Long id;
    private String clientName;
    private String reviewText;
    private Integer rating;
    private String eventType;
    private String clientImageUrl;
    private String clientImagePublicId;
}

package com.dreamevents.backend.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GalleryResponse {
    private Long id;
    private String imageUrl;
    private String publicId;
    private String caption;
    private CategoryResponse category;
}

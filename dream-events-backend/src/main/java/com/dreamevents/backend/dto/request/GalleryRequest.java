package com.dreamevents.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GalleryRequest {

    private String caption;

    @NotNull(message = "Category ID is required")
    private Long categoryId;
}

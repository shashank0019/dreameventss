package com.dreamevents.backend.dto.response;

import com.dreamevents.backend.entity.enums.PackageStatus;
import com.dreamevents.backend.entity.enums.PackageTier;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PackageResponse {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private PackageTier tier;
    private PackageStatus status;
    private CategoryResponse category;
    private List<ImageResponse> images;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ImageResponse {
        private Long id;
        private String imageUrl;
        private String publicId;
    }
}

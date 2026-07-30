package com.dreamevents.backend.dto.request;

import com.dreamevents.backend.entity.enums.PackageStatus;
import com.dreamevents.backend.entity.enums.PackageTier;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PackageRequest {

    @NotBlank(message = "Package name is required")
    @Size(max = 150, message = "Package name must not exceed 150 characters")
    private String name;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be a positive number")
    private BigDecimal price;

    @NotNull(message = "Tier is required")
    private PackageTier tier;

    @NotNull(message = "Status is required")
    private PackageStatus status;

    @NotNull(message = "Category ID is required")
    private Long categoryId;

    // Optional list of package image IDs to retain (useful for editing)
    private List<Long> existingImageIds;
}

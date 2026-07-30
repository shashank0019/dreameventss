package com.dreamevents.backend.mapper;

import com.dreamevents.backend.dto.request.PackageRequest;
import com.dreamevents.backend.dto.response.PackageResponse;
import com.dreamevents.backend.entity.Package;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class PackageMapper {

    @Autowired
    private CategoryMapper categoryMapper;

    public PackageResponse toResponse(Package eventPackage) {
        if (eventPackage == null) {
            return null;
        }

        List<PackageResponse.ImageResponse> imageResponses = Collections.emptyList();
        if (eventPackage.getImages() != null) {
            imageResponses = eventPackage.getImages().stream()
                    .map(img -> PackageResponse.ImageResponse.builder()
                            .id(img.getId())
                            .imageUrl(img.getImageUrl())
                            .publicId(img.getPublicId())
                            .build())
                    .collect(Collectors.toList());
        }

        return PackageResponse.builder()
                .id(eventPackage.getId())
                .name(eventPackage.getName())
                .description(eventPackage.getDescription())
                .price(eventPackage.getPrice())
                .tier(eventPackage.getTier())
                .status(eventPackage.getStatus())
                .category(categoryMapper.toResponse(eventPackage.getCategory()))
                .images(imageResponses)
                .build();
    }

    public Package toEntity(PackageRequest request) {
        if (request == null) {
            return null;
        }
        return Package.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .tier(request.getTier())
                .status(request.getStatus())
                .build();
    }

    public void updateEntity(Package eventPackage, PackageRequest request) {
        if (request == null || eventPackage == null) {
            return;
        }
        eventPackage.setName(request.getName());
        eventPackage.setDescription(request.getDescription());
        eventPackage.setPrice(request.getPrice());
        eventPackage.setTier(request.getTier());
        eventPackage.setStatus(request.getStatus());
    }
}

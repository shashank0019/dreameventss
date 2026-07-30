package com.dreamevents.backend.mapper;

import com.dreamevents.backend.dto.request.GalleryRequest;
import com.dreamevents.backend.dto.response.GalleryResponse;
import com.dreamevents.backend.entity.Gallery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GalleryMapper {

    @Autowired
    private CategoryMapper categoryMapper;

    public GalleryResponse toResponse(Gallery gallery) {
        if (gallery == null) {
            return null;
        }
        return GalleryResponse.builder()
                .id(gallery.getId())
                .imageUrl(gallery.getImageUrl())
                .publicId(gallery.getPublicId())
                .caption(gallery.getCaption())
                .category(categoryMapper.toResponse(gallery.getCategory()))
                .build();
    }

    public Gallery toEntity(GalleryRequest request) {
        if (request == null) {
            return null;
        }
        return Gallery.builder()
                .caption(request.getCaption())
                .build();
    }
}

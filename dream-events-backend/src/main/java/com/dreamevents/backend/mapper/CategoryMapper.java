package com.dreamevents.backend.mapper;

import com.dreamevents.backend.dto.request.CategoryRequest;
import com.dreamevents.backend.dto.response.CategoryResponse;
import com.dreamevents.backend.entity.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {

    public CategoryResponse toResponse(Category category) {
        if (category == null) {
            return null;
        }
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .build();
    }

    public Category toEntity(CategoryRequest request) {
        if (request == null) {
            return null;
        }
        return Category.builder()
                .name(request.getName())
                .description(request.getDescription())
                .build();
    }

    public void updateEntity(Category category, CategoryRequest request) {
        if (request == null || category == null) {
            return;
        }
        category.setName(request.getName());
        category.setDescription(request.getDescription());
    }
}

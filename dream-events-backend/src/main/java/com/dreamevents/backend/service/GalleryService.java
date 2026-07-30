package com.dreamevents.backend.service;

import com.dreamevents.backend.dto.request.GalleryRequest;
import com.dreamevents.backend.dto.response.GalleryResponse;
import com.dreamevents.backend.entity.Category;
import com.dreamevents.backend.entity.Gallery;
import com.dreamevents.backend.exception.ResourceNotFoundException;
import com.dreamevents.backend.mapper.GalleryMapper;
import com.dreamevents.backend.repository.CategoryRepository;
import com.dreamevents.backend.repository.GalleryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class GalleryService {

    @Autowired
    private GalleryRepository galleryRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private GalleryMapper galleryMapper;

    @Transactional(readOnly = true)
    public List<GalleryResponse> getGalleryItems(Long categoryId) {
        Specification<Gallery> spec = (root, query, cb) -> {
            if (categoryId != null) {
                return cb.equal(root.get("category").get("id"), categoryId);
            }
            return cb.conjunction();
        };

        return galleryRepository.findAll(spec, Sort.by("createdAt").descending()).stream()
                .map(galleryMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public GalleryResponse createGalleryItem(GalleryRequest request, MultipartFile file) throws IOException {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.getCategoryId()));

        Map<String, String> uploadResult = cloudinaryService.uploadFile(file, "gallery");

        Gallery gallery = galleryMapper.toEntity(request);
        gallery.setCategory(category);
        gallery.setImageUrl(uploadResult.get("url"));
        gallery.setPublicId(uploadResult.get("public_id"));

        Gallery savedGallery = galleryRepository.save(gallery);
        return galleryMapper.toResponse(savedGallery);
    }

    @Transactional
    public void deleteGalleryItem(Long id) {
        Gallery gallery = galleryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gallery item not found with id: " + id));

        cloudinaryService.deleteFile(gallery.getPublicId());
        galleryRepository.delete(gallery);
    }
}

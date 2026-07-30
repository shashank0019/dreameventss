package com.dreamevents.backend.controller;

import com.dreamevents.backend.dto.request.GalleryRequest;
import com.dreamevents.backend.dto.response.GalleryResponse;
import com.dreamevents.backend.service.GalleryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class GalleryController {

    @Autowired
    private GalleryService galleryService;

    @GetMapping("/gallery")
    public ResponseEntity<List<GalleryResponse>> getGalleryItems(
            @RequestParam(value = "category", required = false) Long categoryId) {
        return ResponseEntity.ok(galleryService.getGalleryItems(categoryId));
    }

    @PostMapping(value = "/admin/gallery", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<GalleryResponse> createGalleryItem(
            @RequestPart("gallery") @Valid GalleryRequest request,
            @RequestPart("image") MultipartFile file) throws IOException {
        GalleryResponse response = galleryService.createGalleryItem(request, file);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/admin/gallery/{id}")
    public ResponseEntity<Void> deleteGalleryItem(@PathVariable Long id) {
        galleryService.deleteGalleryItem(id);
        return ResponseEntity.noContent().build();
    }
}

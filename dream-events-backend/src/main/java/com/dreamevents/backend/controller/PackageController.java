package com.dreamevents.backend.controller;

import com.dreamevents.backend.dto.request.PackageRequest;
import com.dreamevents.backend.dto.response.PackageResponse;
import com.dreamevents.backend.dto.response.PageResponse;
import com.dreamevents.backend.entity.enums.PackageStatus;
import com.dreamevents.backend.service.PackageService;
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
public class PackageController {

    @Autowired
    private PackageService packageService;

    @GetMapping("/packages")
    public ResponseEntity<PageResponse<PackageResponse>> getPackages(
            @RequestParam(value = "category", required = false) Long categoryId,
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "sort", required = false) String sort,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "9") int size) {
        return ResponseEntity.ok(packageService.getPackages(categoryId, search, sort, page, size));
    }

    @GetMapping("/packages/{id}")
    public ResponseEntity<PackageResponse> getPackageById(@PathVariable Long id) {
        return ResponseEntity.ok(packageService.getPackageById(id));
    }

    @GetMapping("/packages/{id}/related")
    public ResponseEntity<List<PackageResponse>> getRelatedPackages(
            @PathVariable Long id,
            @RequestParam(value = "limit", defaultValue = "3") int limit) {
        return ResponseEntity.ok(packageService.getRelatedPackages(id, limit));
    }

    @PostMapping(value = "/admin/packages", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PackageResponse> createPackage(
            @RequestPart("package") @Valid PackageRequest request,
            @RequestPart(value = "images", required = false) List<MultipartFile> images) throws IOException {
        PackageResponse response = packageService.createPackage(request, images);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping(value = "/admin/packages/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PackageResponse> updatePackage(
            @PathVariable Long id,
            @RequestPart("package") @Valid PackageRequest request,
            @RequestPart(value = "images", required = false) List<MultipartFile> newImages) throws IOException {
        PackageResponse response = packageService.updatePackage(id, request, newImages);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/admin/packages/{id}")
    public ResponseEntity<Void> deletePackage(@PathVariable Long id) {
        packageService.deletePackage(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/admin/packages/{id}/status")
    public ResponseEntity<PackageResponse> updateStatus(
            @PathVariable Long id,
            @RequestParam("status") PackageStatus status) {
        return ResponseEntity.ok(packageService.updateStatus(id, status));
    }
}

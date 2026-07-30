package com.dreamevents.backend.service;

import com.dreamevents.backend.dto.request.PackageRequest;
import com.dreamevents.backend.dto.response.PackageResponse;
import com.dreamevents.backend.dto.response.PageResponse;
import com.dreamevents.backend.entity.Category;
import com.dreamevents.backend.entity.Package;
import com.dreamevents.backend.entity.PackageImage;
import com.dreamevents.backend.entity.enums.PackageStatus;
import com.dreamevents.backend.exception.ResourceNotFoundException;
import com.dreamevents.backend.mapper.PackageMapper;
import com.dreamevents.backend.repository.CategoryRepository;
import com.dreamevents.backend.repository.PackageImageRepository;
import com.dreamevents.backend.repository.PackageRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
public class PackageService {

    @Autowired
    private PackageRepository packageRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private PackageImageRepository packageImageRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private PackageMapper packageMapper;

    @Transactional(readOnly = true)
    public PageResponse<PackageResponse> getPackages(Long categoryId, String search, String sort, int page, int size) {
        Sort sortObj = Sort.by("createdAt").descending(); // default newest
        if (sort != null) {
            switch (sort) {
                case "price_asc":
                    sortObj = Sort.by("price").ascending();
                    break;
                case "price_desc":
                    sortObj = Sort.by("price").descending();
                    break;
                case "name_asc":
                    sortObj = Sort.by("name").ascending();
                    break;
                case "name_desc":
                    sortObj = Sort.by("name").descending();
                    break;
                case "newest":
                default:
                    sortObj = Sort.by("createdAt").descending();
                    break;
            }
        }

        Pageable pageable = PageRequest.of(page, size, sortObj);

        Specification<Package> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // By default, for public queries, filter only ACTIVE packages
            // (Note: Admin can see everything, let's keep it simple: filter by status in public queries)
            // But we will allow filtering packages. For now, let's allow all packages or filter by status based on endpoint
            // For simplicity, let's filter ACTIVE status if it's not admin (but this method is used by both, so let's allow status filter if needed. We can just return ACTIVE here or pass in status)
            
            if (categoryId != null) {
                predicates.add(cb.equal(root.get("category").get("id"), categoryId));
            }

            if (search != null && !search.trim().isEmpty()) {
                String searchPattern = "%" + search.trim().toLowerCase() + "%";
                Predicate nameLike = cb.like(cb.lower(root.get("name")), searchPattern);
                Predicate descLike = cb.like(cb.lower(root.get("description")), searchPattern);
                predicates.add(cb.or(nameLike, descLike));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        Page<Package> packagePage = packageRepository.findAll(spec, pageable);

        List<PackageResponse> content = packagePage.getContent().stream()
                .map(packageMapper::toResponse)
                .collect(Collectors.toList());

        return PageResponse.<PackageResponse>builder()
                .content(content)
                .pageNumber(packagePage.getNumber())
                .pageSize(packagePage.getSize())
                .totalElements(packagePage.getTotalElements())
                .totalPages(packagePage.getTotalPages())
                .last(packagePage.isLast())
                .build();
    }

    @Transactional(readOnly = true)
    public PackageResponse getPackageById(Long id) {
        Package eventPackage = packageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Package not found with id: " + id));
        return packageMapper.toResponse(eventPackage);
    }

    @Transactional(readOnly = true)
    public List<PackageResponse> getRelatedPackages(Long id, int limit) {
        Package eventPackage = packageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Package not found with id: " + id));

        Specification<Package> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(cb.equal(root.get("category").get("id"), eventPackage.getCategory().getId()));
            predicates.add(cb.notEqual(root.get("id"), id));
            predicates.add(cb.equal(root.get("status"), PackageStatus.ACTIVE));
            return cb.and(predicates.toArray(new Predicate[0]));
        };

        Pageable limitPageable = PageRequest.of(0, limit, Sort.by("createdAt").descending());
        return packageRepository.findAll(spec, limitPageable).getContent().stream()
                .map(packageMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public PackageResponse createPackage(PackageRequest request, List<MultipartFile> images) throws IOException {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.getCategoryId()));

        Package eventPackage = packageMapper.toEntity(request);
        eventPackage.setCategory(category);

        Package savedPackage = packageRepository.save(eventPackage);

        if (images != null && !images.isEmpty()) {
            List<PackageImage> packageImages = new ArrayList<>();
            for (MultipartFile file : images) {
                if (!file.isEmpty()) {
                    Map<String, String> uploadResult = cloudinaryService.uploadFile(file, "packages");
                    PackageImage pkgImg = PackageImage.builder()
                            .imageUrl(uploadResult.get("url"))
                            .publicId(uploadResult.get("public_id"))
                            .eventPackage(savedPackage)
                            .build();
                    packageImages.add(pkgImg);
                }
            }
            if (!packageImages.isEmpty()) {
                packageImageRepository.saveAll(packageImages);
                savedPackage.setImages(packageImages);
            }
        }

        return packageMapper.toResponse(savedPackage);
    }

    @Transactional
    public PackageResponse updatePackage(Long id, PackageRequest request, List<MultipartFile> newImages) throws IOException {
        Package eventPackage = packageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Package not found with id: " + id));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.getCategoryId()));

        packageMapper.updateEntity(eventPackage, request);
        eventPackage.setCategory(category);

        // Manage existing images (delete removed ones)
        List<PackageImage> currentImages = eventPackage.getImages();
        List<Long> existingToKeep = request.getExistingImageIds() != null ? request.getExistingImageIds() : Collections.emptyList();
        
        List<PackageImage> toDelete = new ArrayList<>();
        List<PackageImage> toKeep = new ArrayList<>();

        for (PackageImage img : currentImages) {
            if (existingToKeep.contains(img.getId())) {
                toKeep.add(img);
            } else {
                toDelete.add(img);
            }
        }

        // Delete from Cloudinary & DB
        for (PackageImage img : toDelete) {
            cloudinaryService.deleteFile(img.getPublicId());
            packageImageRepository.delete(img);
        }

        eventPackage.setImages(toKeep);

        // Upload and link new images
        if (newImages != null && !newImages.isEmpty()) {
            for (MultipartFile file : newImages) {
                if (!file.isEmpty()) {
                    Map<String, String> uploadResult = cloudinaryService.uploadFile(file, "packages");
                    PackageImage pkgImg = PackageImage.builder()
                            .imageUrl(uploadResult.get("url"))
                            .publicId(uploadResult.get("public_id"))
                            .eventPackage(eventPackage)
                            .build();
                    packageImageRepository.save(pkgImg);
                    eventPackage.getImages().add(pkgImg);
                }
            }
        }

        Package updatedPackage = packageRepository.save(eventPackage);
        return packageMapper.toResponse(updatedPackage);
    }

    @Transactional
    public void deletePackage(Long id) {
        Package eventPackage = packageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Package not found with id: " + id));

        // Delete associated images from Cloudinary
        for (PackageImage img : eventPackage.getImages()) {
            cloudinaryService.deleteFile(img.getPublicId());
        }

        packageRepository.delete(eventPackage);
    }

    @Transactional
    public PackageResponse updateStatus(Long id, PackageStatus status) {
        Package eventPackage = packageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Package not found with id: " + id));
        eventPackage.setStatus(status);
        Package updatedPackage = packageRepository.save(eventPackage);
        return packageMapper.toResponse(updatedPackage);
    }
}

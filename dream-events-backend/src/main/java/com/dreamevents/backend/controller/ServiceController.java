package com.dreamevents.backend.controller;

import com.dreamevents.backend.dto.request.ServiceRequest;
import com.dreamevents.backend.dto.response.ServiceResponse;
import com.dreamevents.backend.service.ServiceEntityService;
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
public class ServiceController {

    @Autowired
    private ServiceEntityService serviceEntityService;

    @GetMapping("/services")
    public ResponseEntity<List<ServiceResponse>> getAllServices() {
        return ResponseEntity.ok(serviceEntityService.getAllServices());
    }

    @PostMapping(value = "/admin/services", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ServiceResponse> createService(
            @RequestPart("service") @Valid ServiceRequest request,
            @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {
        ServiceResponse response = serviceEntityService.createService(request, image);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping(value = "/admin/services/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ServiceResponse> updateService(
            @PathVariable Long id,
            @RequestPart("service") @Valid ServiceRequest request,
            @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {
        ServiceResponse response = serviceEntityService.updateService(id, request, image);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/admin/services/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        serviceEntityService.deleteService(id);
        return ResponseEntity.noContent().build();
    }
}

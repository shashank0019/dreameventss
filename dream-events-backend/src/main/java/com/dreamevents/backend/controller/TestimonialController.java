package com.dreamevents.backend.controller;

import com.dreamevents.backend.dto.request.TestimonialRequest;
import com.dreamevents.backend.dto.response.TestimonialResponse;
import com.dreamevents.backend.service.TestimonialService;
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
public class TestimonialController {

    @Autowired
    private TestimonialService testimonialService;

    @GetMapping("/testimonials")
    public ResponseEntity<List<TestimonialResponse>> getAllTestimonials() {
        return ResponseEntity.ok(testimonialService.getAllTestimonials());
    }

    @PostMapping(value = "/admin/testimonials", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<TestimonialResponse> createTestimonial(
            @RequestPart("testimonial") @Valid TestimonialRequest request,
            @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {
        TestimonialResponse response = testimonialService.createTestimonial(request, image);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping(value = "/admin/testimonials/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<TestimonialResponse> updateTestimonial(
            @PathVariable Long id,
            @RequestPart("testimonial") @Valid TestimonialRequest request,
            @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {
        TestimonialResponse response = testimonialService.updateTestimonial(id, request, image);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/admin/testimonials/{id}")
    public ResponseEntity<Void> deleteTestimonial(@PathVariable Long id) {
        testimonialService.deleteTestimonial(id);
        return ResponseEntity.noContent().build();
    }
}

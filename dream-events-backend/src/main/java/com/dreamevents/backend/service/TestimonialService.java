package com.dreamevents.backend.service;

import com.dreamevents.backend.dto.request.TestimonialRequest;
import com.dreamevents.backend.dto.response.TestimonialResponse;
import com.dreamevents.backend.entity.Testimonial;
import com.dreamevents.backend.exception.ResourceNotFoundException;
import com.dreamevents.backend.mapper.TestimonialMapper;
import com.dreamevents.backend.repository.TestimonialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TestimonialService {

    @Autowired
    private TestimonialRepository testimonialRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private TestimonialMapper testimonialMapper;

    @Transactional(readOnly = true)
    public List<TestimonialResponse> getAllTestimonials() {
        return testimonialRepository.findAll().stream()
                .map(testimonialMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public TestimonialResponse createTestimonial(TestimonialRequest request, MultipartFile image) throws IOException {
        Testimonial testimonial = testimonialMapper.toEntity(request);

        if (image != null && !image.isEmpty()) {
            Map<String, String> uploadResult = cloudinaryService.uploadFile(image, "testimonials");
            testimonial.setClientImageUrl(uploadResult.get("url"));
            testimonial.setClientImagePublicId(uploadResult.get("public_id"));
        }

        Testimonial savedTestimonial = testimonialRepository.save(testimonial);
        return testimonialMapper.toResponse(savedTestimonial);
    }

    @Transactional
    public TestimonialResponse updateTestimonial(Long id, TestimonialRequest request, MultipartFile image) throws IOException {
        Testimonial testimonial = testimonialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial not found with id: " + id));

        testimonialMapper.updateEntity(testimonial, request);

        if (image != null && !image.isEmpty()) {
            // Delete old image if exists
            if (testimonial.getClientImagePublicId() != null) {
                cloudinaryService.deleteFile(testimonial.getClientImagePublicId());
            }
            Map<String, String> uploadResult = cloudinaryService.uploadFile(image, "testimonials");
            testimonial.setClientImageUrl(uploadResult.get("url"));
            testimonial.setClientImagePublicId(uploadResult.get("public_id"));
        }

        Testimonial updatedTestimonial = testimonialRepository.save(testimonial);
        return testimonialMapper.toResponse(updatedTestimonial);
    }

    @Transactional
    public void deleteTestimonial(Long id) {
        Testimonial testimonial = testimonialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial not found with id: " + id));

        if (testimonial.getClientImagePublicId() != null) {
            cloudinaryService.deleteFile(testimonial.getClientImagePublicId());
        }

        testimonialRepository.delete(testimonial);
    }
}

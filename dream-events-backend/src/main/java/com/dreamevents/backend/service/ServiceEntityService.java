package com.dreamevents.backend.service;

import com.dreamevents.backend.dto.request.ServiceRequest;
import com.dreamevents.backend.dto.response.ServiceResponse;
import com.dreamevents.backend.entity.Service;
import com.dreamevents.backend.exception.ResourceNotFoundException;
import com.dreamevents.backend.mapper.ServiceMapper;
import com.dreamevents.backend.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class ServiceEntityService {

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private ServiceMapper serviceMapper;

    @Transactional(readOnly = true)
    public List<ServiceResponse> getAllServices() {
        return serviceRepository.findAll().stream()
                .map(serviceMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ServiceResponse createService(ServiceRequest request, MultipartFile image) throws IOException {
        Service service = serviceMapper.toEntity(request);

        if (image != null && !image.isEmpty()) {
            Map<String, String> uploadResult = cloudinaryService.uploadFile(image, "services");
            service.setImageUrl(uploadResult.get("url"));
            service.setPublicId(uploadResult.get("public_id"));
        }

        Service savedService = serviceRepository.save(service);
        return serviceMapper.toResponse(savedService);
    }

    @Transactional
    public ServiceResponse updateService(Long id, ServiceRequest request, MultipartFile image) throws IOException {
        Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + id));

        serviceMapper.updateEntity(service, request);

        if (image != null && !image.isEmpty()) {
            // Delete old image if exists
            if (service.getPublicId() != null) {
                cloudinaryService.deleteFile(service.getPublicId());
            }
            Map<String, String> uploadResult = cloudinaryService.uploadFile(image, "services");
            service.setImageUrl(uploadResult.get("url"));
            service.setPublicId(uploadResult.get("public_id"));
        }

        Service updatedService = serviceRepository.save(service);
        return serviceMapper.toResponse(updatedService);
    }

    @Transactional
    public void deleteService(Long id) {
        Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + id));

        if (service.getPublicId() != null) {
            cloudinaryService.deleteFile(service.getPublicId());
        }

        serviceRepository.delete(service);
    }
}

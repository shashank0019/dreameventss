package com.dreamevents.backend.mapper;

import com.dreamevents.backend.dto.request.ServiceRequest;
import com.dreamevents.backend.dto.response.ServiceResponse;
import com.dreamevents.backend.entity.Service;
import org.springframework.stereotype.Component;

@Component
public class ServiceMapper {

    public ServiceResponse toResponse(Service service) {
        if (service == null) {
            return null;
        }
        return ServiceResponse.builder()
                .id(service.getId())
                .title(service.getTitle())
                .description(service.getDescription())
                .imageUrl(service.getImageUrl())
                .publicId(service.getPublicId())
                .build();
    }

    public Service toEntity(ServiceRequest request) {
        if (request == null) {
            return null;
        }
        return Service.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .build();
    }

    public void updateEntity(Service service, ServiceRequest request) {
        if (request == null || service == null) {
            return;
        }
        service.setTitle(request.getTitle());
        service.setDescription(request.getDescription());
    }
}

package com.dreamevents.backend.mapper;

import com.dreamevents.backend.dto.request.TestimonialRequest;
import com.dreamevents.backend.dto.response.TestimonialResponse;
import com.dreamevents.backend.entity.Testimonial;
import org.springframework.stereotype.Component;

@Component
public class TestimonialMapper {

    public TestimonialResponse toResponse(Testimonial testimonial) {
        if (testimonial == null) {
            return null;
        }
        return TestimonialResponse.builder()
                .id(testimonial.getId())
                .clientName(testimonial.getClientName())
                .reviewText(testimonial.getReviewText())
                .rating(testimonial.getRating())
                .eventType(testimonial.getEventType())
                .clientImageUrl(testimonial.getClientImageUrl())
                .clientImagePublicId(testimonial.getClientImagePublicId())
                .build();
    }

    public Testimonial toEntity(TestimonialRequest request) {
        if (request == null) {
            return null;
        }
        return Testimonial.builder()
                .clientName(request.getClientName())
                .reviewText(request.getReviewText())
                .rating(request.getRating())
                .eventType(request.getEventType())
                .build();
    }

    public void updateEntity(Testimonial testimonial, TestimonialRequest request) {
        if (request == null || testimonial == null) {
            return;
        }
        testimonial.setClientName(request.getClientName());
        testimonial.setReviewText(request.getReviewText());
        testimonial.setRating(request.getRating());
        testimonial.setEventType(request.getEventType());
    }
}

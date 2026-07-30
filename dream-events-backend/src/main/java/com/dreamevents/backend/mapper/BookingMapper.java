package com.dreamevents.backend.mapper;

import com.dreamevents.backend.dto.request.BookingRequest;
import com.dreamevents.backend.dto.response.BookingResponse;
import com.dreamevents.backend.entity.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BookingMapper {

    @Autowired
    private PackageMapper packageMapper;

    public BookingResponse toResponse(Booking booking) {
        if (booking == null) {
            return null;
        }
        return BookingResponse.builder()
                .id(booking.getId())
                .clientName(booking.getClientName())
                .email(booking.getEmail())
                .phone(booking.getPhone())
                .eventDate(booking.getEventDate())
                .guestCount(booking.getGuestCount())
                .location(booking.getLocation())
                .eventPackage(packageMapper.toResponse(booking.getEventPackage()))
                .customNotes(booking.getCustomNotes())
                .attachmentUrl(booking.getAttachmentUrl())
                .attachmentPublicId(booking.getAttachmentPublicId())
                .status(booking.getStatus())
                .createdAt(booking.getCreatedAt())
                .updatedAt(booking.getUpdatedAt())
                .build();
    }

    public Booking toEntity(BookingRequest request) {
        if (request == null) {
            return null;
        }
        return Booking.builder()
                .clientName(request.getClientName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .eventDate(request.getEventDate())
                .guestCount(request.getGuestCount())
                .location(request.getLocation())
                .customNotes(request.getCustomNotes())
                .build();
    }
}

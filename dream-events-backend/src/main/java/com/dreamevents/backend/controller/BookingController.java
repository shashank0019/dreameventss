package com.dreamevents.backend.controller;

import com.dreamevents.backend.dto.request.BookingRequest;
import com.dreamevents.backend.dto.response.BookingResponse;
import com.dreamevents.backend.dto.response.PageResponse;
import com.dreamevents.backend.entity.enums.BookingStatus;
import com.dreamevents.backend.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping(value = "/bookings", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BookingResponse> createBooking(
            @RequestPart("booking") @Valid BookingRequest request,
            @RequestPart(value = "attachment", required = false) MultipartFile attachment) throws IOException {
        BookingResponse response = bookingService.createBooking(request, attachment);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/admin/bookings")
    public ResponseEntity<PageResponse<BookingResponse>> getBookings(
            @RequestParam(value = "status", required = false) BookingStatus status,
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        return ResponseEntity.ok(bookingService.getBookings(status, search, page, size));
    }

    @GetMapping("/admin/bookings/{id}")
    public ResponseEntity<BookingResponse> getBookingById(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.getBookingById(id));
    }

    @PatchMapping("/admin/bookings/{id}/status")
    public ResponseEntity<BookingResponse> updateStatus(
            @PathVariable Long id,
            @RequestParam("status") BookingStatus status) {
        return ResponseEntity.ok(bookingService.updateStatus(id, status));
    }

    @DeleteMapping("/admin/bookings/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }
}

package com.dreamevents.backend.service;

import com.dreamevents.backend.dto.request.BookingRequest;
import com.dreamevents.backend.dto.response.BookingResponse;
import com.dreamevents.backend.dto.response.PageResponse;
import com.dreamevents.backend.entity.Booking;
import com.dreamevents.backend.entity.Package;
import com.dreamevents.backend.entity.enums.BookingStatus;
import com.dreamevents.backend.exception.ResourceNotFoundException;
import com.dreamevents.backend.mapper.BookingMapper;
import com.dreamevents.backend.repository.BookingRepository;
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
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private PackageRepository packageRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private BookingMapper bookingMapper;

    @Transactional(readOnly = true)
    public PageResponse<BookingResponse> getBookings(BookingStatus status, String search, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

        Specification<Booking> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }

            if (search != null && !search.trim().isEmpty()) {
                String searchPattern = "%" + search.trim().toLowerCase() + "%";
                Predicate clientLike = cb.like(cb.lower(root.get("clientName")), searchPattern);
                Predicate emailLike = cb.like(cb.lower(root.get("email")), searchPattern);
                Predicate pkgLike = cb.like(cb.lower(root.get("eventPackage").get("name")), searchPattern);
                predicates.add(cb.or(clientLike, emailLike, pkgLike));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        Page<Booking> bookingPage = bookingRepository.findAll(spec, pageable);

        List<BookingResponse> content = bookingPage.getContent().stream()
                .map(bookingMapper::toResponse)
                .collect(Collectors.toList());

        return PageResponse.<BookingResponse>builder()
                .content(content)
                .pageNumber(bookingPage.getNumber())
                .pageSize(bookingPage.getSize())
                .totalElements(bookingPage.getTotalElements())
                .totalPages(bookingPage.getTotalPages())
                .last(bookingPage.isLast())
                .build();
    }

    @Transactional(readOnly = true)
    public BookingResponse getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking request not found with id: " + id));
        return bookingMapper.toResponse(booking);
    }

    @Transactional
    public BookingResponse createBooking(BookingRequest request, MultipartFile attachment) throws IOException {
        Package eventPackage = packageRepository.findById(request.getPackageId())
                .orElseThrow(() -> new ResourceNotFoundException("Package not found with id: " + request.getPackageId()));

        Booking booking = bookingMapper.toEntity(request);
        booking.setEventPackage(eventPackage);
        booking.setStatus(BookingStatus.PENDING);

        // Upload attachment if provided by client (e.g. event brief, layout image)
        if (attachment != null && !attachment.isEmpty()) {
            Map<String, String> uploadResult = cloudinaryService.uploadFile(attachment, "bookings");
            booking.setAttachmentUrl(uploadResult.get("url"));
            booking.setAttachmentPublicId(uploadResult.get("public_id"));
        }

        Booking savedBooking = bookingRepository.save(booking);

        // Trigger asynchronous/safe alert email notification to business owner
        emailService.sendBookingNotification(savedBooking);

        return bookingMapper.toResponse(savedBooking);
    }

    @Transactional
    public BookingResponse updateStatus(Long id, BookingStatus status) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking request not found with id: " + id));
        
        booking.setStatus(status);
        Booking updatedBooking = bookingRepository.save(booking);
        return bookingMapper.toResponse(updatedBooking);
    }

    @Transactional
    public void deleteBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking request not found with id: " + id));

        // Delete any associated attachment from Cloudinary
        if (booking.getAttachmentPublicId() != null) {
            cloudinaryService.deleteFile(booking.getAttachmentPublicId());
        }

        bookingRepository.delete(booking);
    }
}

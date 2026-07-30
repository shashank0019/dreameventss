package com.dreamevents.backend.service;

import com.dreamevents.backend.dto.response.BookingResponse;
import com.dreamevents.backend.dto.response.DashboardResponse;
import com.dreamevents.backend.entity.enums.BookingStatus;
import com.dreamevents.backend.mapper.BookingMapper;
import com.dreamevents.backend.repository.BookingRepository;
import com.dreamevents.backend.repository.CategoryRepository;
import com.dreamevents.backend.repository.PackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    @Autowired
    private PackageRepository packageRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private BookingMapper bookingMapper;

    @Transactional(readOnly = true)
    public DashboardResponse getDashboardStatistics() {
        long totalPackages = packageRepository.count();
        long totalCategories = categoryRepository.count();
        long totalBookings = bookingRepository.count();

        long pendingBookings = bookingRepository.countByStatus(BookingStatus.PENDING);
        long approvedBookings = bookingRepository.countByStatus(BookingStatus.APPROVED);
        long completedBookings = bookingRepository.countByStatus(BookingStatus.COMPLETED);
        long cancelledBookings = bookingRepository.countByStatus(BookingStatus.CANCELLED);

        BigDecimal totalRevenue = bookingRepository.calculateTotalRevenue();

        List<BookingResponse> recentBookings = bookingRepository.findTop5ByOrderByCreatedAtDesc().stream()
                .map(bookingMapper::toResponse)
                .collect(Collectors.toList());

        return DashboardResponse.builder()
                .totalPackages(totalPackages)
                .totalCategories(totalCategories)
                .totalBookings(totalBookings)
                .pendingBookings(pendingBookings)
                .approvedBookings(approvedBookings)
                .completedBookings(completedBookings)
                .cancelledBookings(cancelledBookings)
                .totalRevenue(totalRevenue)
                .recentBookings(recentBookings)
                .build();
    }
}

package com.dreamevents.backend.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardResponse {
    private Long totalPackages;
    private Long totalCategories;
    private Long totalBookings;
    private Long pendingBookings;
    private Long approvedBookings;
    private Long completedBookings;
    private Long cancelledBookings;
    private BigDecimal totalRevenue;
    private List<BookingResponse> recentBookings;
}

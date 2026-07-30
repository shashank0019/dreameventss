package com.dreamevents.backend.repository;

import com.dreamevents.backend.entity.Booking;
import com.dreamevents.backend.entity.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long>, JpaSpecificationExecutor<Booking> {
    
    long countByStatus(BookingStatus status);

    @Query("SELECT COALESCE(SUM(b.eventPackage.price), 0) FROM Booking b WHERE b.status IN (com.dreamevents.backend.entity.enums.BookingStatus.APPROVED, com.dreamevents.backend.entity.enums.BookingStatus.COMPLETED)")
    BigDecimal calculateTotalRevenue();

    List<Booking> findTop5ByOrderByCreatedAtDesc();
}

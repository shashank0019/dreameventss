package com.dreamevents.backend.dto.response;

import com.dreamevents.backend.entity.enums.BookingStatus;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingResponse {
    private Long id;
    private String clientName;
    private String email;
    private String phone;
    private LocalDate eventDate;
    private Integer guestCount;
    private String location;
    private PackageResponse eventPackage;
    private String customNotes;
    private String attachmentUrl;
    private String attachmentPublicId;
    private BookingStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

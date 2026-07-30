package com.dreamevents.backend.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingRequest {

    @NotBlank(message = "Client name is required")
    private String clientName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Phone number is required")
    private String phone;

    @NotNull(message = "Event date is required")
    @FutureOrPresent(message = "Event date must be today or in the future")
    private LocalDate eventDate;

    @NotNull(message = "Guest count is required")
    @Positive(message = "Guest count must be positive")
    private Integer guestCount;

    @NotBlank(message = "Location is required")
    private String location;

    @NotNull(message = "Selected package ID is required")
    private Long packageId;

    private String customNotes;
}

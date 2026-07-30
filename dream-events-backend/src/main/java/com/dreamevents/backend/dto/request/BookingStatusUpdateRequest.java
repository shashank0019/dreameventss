package com.dreamevents.backend.dto.request;

import com.dreamevents.backend.entity.enums.BookingStatus;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingStatusUpdateRequest {

    @NotNull(message = "Status is required")
    private BookingStatus status;
}

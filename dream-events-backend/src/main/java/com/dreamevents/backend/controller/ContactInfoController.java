package com.dreamevents.backend.controller;

import com.dreamevents.backend.dto.request.ContactInfoRequest;
import com.dreamevents.backend.dto.response.ContactInfoResponse;
import com.dreamevents.backend.service.ContactInfoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ContactInfoController {

    @Autowired
    private ContactInfoService contactInfoService;

    @GetMapping("/contact-info")
    public ResponseEntity<ContactInfoResponse> getContactInfo() {
        return ResponseEntity.ok(contactInfoService.getContactInfo());
    }

    @PutMapping("/admin/contact-info")
    public ResponseEntity<ContactInfoResponse> updateContactInfo(
            @Valid @RequestBody ContactInfoRequest request) {
        return ResponseEntity.ok(contactInfoService.updateContactInfo(request));
    }
}

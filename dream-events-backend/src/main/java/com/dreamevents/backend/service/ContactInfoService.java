package com.dreamevents.backend.service;

import com.dreamevents.backend.dto.request.ContactInfoRequest;
import com.dreamevents.backend.dto.response.ContactInfoResponse;
import com.dreamevents.backend.entity.ContactInfo;
import com.dreamevents.backend.repository.ContactInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ContactInfoService {

    @Autowired
    private ContactInfoRepository contactInfoRepository;

    private ContactInfoResponse toResponse(ContactInfo info) {
        if (info == null) {
            return null;
        }
        return ContactInfoResponse.builder()
                .id(info.getId())
                .email(info.getEmail())
                .phone(info.getPhone())
                .address(info.getAddress())
                .instagramUrl(info.getInstagramUrl())
                .facebookUrl(info.getFacebookUrl())
                .whatsappNumber(info.getWhatsappNumber())
                .googleMapsEmbedUrl(info.getGoogleMapsEmbedUrl())
                .build();
    }

    @Transactional
    public ContactInfoResponse getContactInfo() {
        List<ContactInfo> infoList = contactInfoRepository.findAll();
        if (infoList.isEmpty()) {
            // Seed a default contact info row so site doesn't fail on first load
            ContactInfo defaultInfo = ContactInfo.builder()
                    .email("info@dreamevents.com")
                    .phone("+1 123 456 7890")
                    .address("123 Dream Street, Event City")
                    .whatsappNumber("+11234567890")
                    .instagramUrl("https://instagram.com/dreamevents")
                    .facebookUrl("https://facebook.com/dreamevents")
                    .googleMapsEmbedUrl("https://www.google.com/maps/embed?pb=...")
                    .build();
            ContactInfo saved = contactInfoRepository.save(defaultInfo);
            return toResponse(saved);
        }
        return toResponse(infoList.get(0));
    }

    @Transactional
    public ContactInfoResponse updateContactInfo(ContactInfoRequest request) {
        List<ContactInfo> infoList = contactInfoRepository.findAll();
        ContactInfo info;
        if (infoList.isEmpty()) {
            info = new ContactInfo();
        } else {
            info = infoList.get(0);
        }

        info.setEmail(request.getEmail());
        info.setPhone(request.getPhone());
        info.setAddress(request.getAddress());
        info.setInstagramUrl(request.getInstagramUrl());
        info.setFacebookUrl(request.getFacebookUrl());
        info.setWhatsappNumber(request.getWhatsappNumber());
        info.setGoogleMapsEmbedUrl(request.getGoogleMapsEmbedUrl());

        ContactInfo saved = contactInfoRepository.save(info);
        return toResponse(saved);
    }
}

package com.dreamevents.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class CloudinaryService {

    @Autowired(required = false)
    private Cloudinary cloudinary;

    public Map<String, String> uploadFile(MultipartFile file, String folder) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File must not be empty");
        }

        // Graceful fallback if Cloudinary credentials are not supplied
        if (cloudinary == null || cloudinary.config.cloudName == null || cloudinary.config.cloudName.isEmpty()) {
            log.warn("Cloudinary credentials are not configured! Simulating file upload for: {}", file.getOriginalFilename());
            Map<String, String> result = new HashMap<>();
            String simulatedPublicId = "dummy_" + System.currentTimeMillis();
            // Provide a sensible default demo image
            result.put("url", "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80");
            result.put("public_id", simulatedPublicId);
            return result;
        }

        Map<?, ?> uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap("folder", folder)
        );

        Map<String, String> result = new HashMap<>();
        result.put("url", (String) uploadResult.get("secure_url"));
        result.put("public_id", (String) uploadResult.get("public_id"));
        return result;
    }

    public void deleteFile(String publicId) {
        if (publicId == null || publicId.isEmpty() || publicId.startsWith("dummy_")) {
            log.info("Skipping deletion for simulated/null publicId: {}", publicId);
            return;
        }

        if (cloudinary == null || cloudinary.config.cloudName == null || cloudinary.config.cloudName.isEmpty()) {
            log.warn("Cloudinary credentials not configured. Skipping deletion of public_id: {}", publicId);
            return;
        }

        try {
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            log.info("Deleted file from Cloudinary: {}", publicId);
        } catch (IOException e) {
            log.error("Failed to delete file from Cloudinary: {}", e.getMessage());
        }
    }
}

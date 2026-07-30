package com.dreamevents.backend.repository;

import com.dreamevents.backend.entity.PackageImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PackageImageRepository extends JpaRepository<PackageImage, Long> {
}

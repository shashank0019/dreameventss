package com.dreamevents.backend.repository;

import com.dreamevents.backend.entity.Gallery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface GalleryRepository extends JpaRepository<Gallery, Long>, JpaSpecificationExecutor<Gallery> {
}

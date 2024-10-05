package com.coderscampus.StudentClearanceSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coderscampus.StudentClearanceSystem.domain.Campus;

public interface CampusRepository extends JpaRepository<Campus,Long> {
    
}

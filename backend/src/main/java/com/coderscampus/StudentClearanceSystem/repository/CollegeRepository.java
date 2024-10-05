package com.coderscampus.StudentClearanceSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coderscampus.StudentClearanceSystem.domain.College;
public interface CollegeRepository  extends JpaRepository<College,Long>{
    
}

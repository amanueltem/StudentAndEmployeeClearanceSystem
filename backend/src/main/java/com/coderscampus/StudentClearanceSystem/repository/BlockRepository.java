package com.coderscampus.StudentClearanceSystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coderscampus.StudentClearanceSystem.domain.Block;
import com.coderscampus.StudentClearanceSystem.domain.Campus;

public interface BlockRepository extends JpaRepository<Block,Long> {

    List<Block> findByCampus(Campus campus);
    
} 

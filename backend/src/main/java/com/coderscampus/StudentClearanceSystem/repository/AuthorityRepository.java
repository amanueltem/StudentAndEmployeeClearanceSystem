package com.coderscampus.StudentClearanceSystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coderscampus.StudentClearanceSystem.domain.Authority;

public interface AuthorityRepository  extends JpaRepository<Authority,Long>{
    List<Authority> findByAuthority(String authority);
}

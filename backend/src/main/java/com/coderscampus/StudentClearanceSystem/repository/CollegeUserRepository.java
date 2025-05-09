package com.coderscampus.StudentClearanceSystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.coderscampus.StudentClearanceSystem.domain.Account;
import com.coderscampus.StudentClearanceSystem.domain.College;
import com.coderscampus.StudentClearanceSystem.domain.CollegeUser;

public interface CollegeUserRepository extends JpaRepository<CollegeUser,Long> {
  
    List<CollegeUser> findByPosition(String position);
    List<CollegeUser> findByCollege(College college);
    Optional<CollegeUser> findByAccount(Account account);
}

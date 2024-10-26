package com.coderscampus.StudentClearanceSystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.coderscampus.StudentClearanceSystem.domain.Account;
import com.coderscampus.StudentClearanceSystem.domain.Student;

public interface StudentRepository  extends JpaRepository<Student,Long>{
    Optional<Student> findByAccount(Account account);
}

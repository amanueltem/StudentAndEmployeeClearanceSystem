package com.coderscampus.StudentClearanceSystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.coderscampus.StudentClearanceSystem.domain.Account;
import com.coderscampus.StudentClearanceSystem.domain.Student;

public interface StudentRepository  extends JpaRepository<Student,Long>{
    @Query("SELECT s FROM Student s WHERE s.email=?1")
    //select clearance_request.requested_reason,users.fname from clearance_request INNER JOIN users ON clearance_request.requested_by_id=users.id;
    Optional<Student> findStudentByEmail(String email);
    Optional<Student> findByAccount(Account account);
}

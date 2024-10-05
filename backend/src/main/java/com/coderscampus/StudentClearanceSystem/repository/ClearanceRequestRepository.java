package com.coderscampus.StudentClearanceSystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.coderscampus.StudentClearanceSystem.domain.ClearanceRequest;
import com.coderscampus.StudentClearanceSystem.domain.Student;

public interface ClearanceRequestRepository extends JpaRepository<ClearanceRequest, Long> {
   List<ClearanceRequest> findByRequestedBy(Student student);
    /*@Query("SELECT cr.requestedReason, u.fname FROM ClearanceRequest cr " +
           "INNER JOIN cr.requestedBy s " +
           "INNER JOIN s.user u " +
           "WHERE u.departmentId = :departmentId")
    List<Object[]> findRequestByDepartment(@Param("departmentId") Long departmentId);*/
}


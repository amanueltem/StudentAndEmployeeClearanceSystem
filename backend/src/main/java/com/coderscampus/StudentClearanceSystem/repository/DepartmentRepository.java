package com.coderscampus.StudentClearanceSystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coderscampus.StudentClearanceSystem.domain.College;
import com.coderscampus.StudentClearanceSystem.domain.Department;

public interface DepartmentRepository extends JpaRepository<Department,Long>{

    List<Department> findByCollege(College college);
}

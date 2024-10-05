package com.coderscampus.StudentClearanceSystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.coderscampus.StudentClearanceSystem.domain.Account;
import com.coderscampus.StudentClearanceSystem.domain.Department;
import com.coderscampus.StudentClearanceSystem.domain.DepartmentUser;

public interface DepartmentUserRepository extends JpaRepository<DepartmentUser,Long>{
    @Query("SELECT s FROM DepartmentUser s WHERE s.email=?1")
    Optional<DepartmentUser> findByEmail(String email);
    List<DepartmentUser> findByPosition(String position);
    List <DepartmentUser> findByDepartment(Department department);
    Optional <DepartmentUser> findByAccount(Account account);
}

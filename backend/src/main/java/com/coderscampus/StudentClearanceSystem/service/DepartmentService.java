package com.coderscampus.StudentClearanceSystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coderscampus.StudentClearanceSystem.domain.Account;
import com.coderscampus.StudentClearanceSystem.domain.CollegeUser;
import com.coderscampus.StudentClearanceSystem.domain.Department;
import com.coderscampus.StudentClearanceSystem.repository.CollegeUserRepository;
import com.coderscampus.StudentClearanceSystem.repository.DepartmentRepository;

@Service
public class DepartmentService {
    @Autowired
    private DepartmentRepository departmentRepo;
    @Autowired
    private CollegeUserRepository cuRepo;
    public List<Department> findAllDepartments(){
        return departmentRepo.findAll();
    }
    public List<Department> findDepartmentsInCollege(Account account) {
        Optional<CollegeUser> userOptional=cuRepo.findByAccount(account);
        CollegeUser user=userOptional.orElse(new CollegeUser());
        return departmentRepo.findByCollege(user.getCollege());
    }
}

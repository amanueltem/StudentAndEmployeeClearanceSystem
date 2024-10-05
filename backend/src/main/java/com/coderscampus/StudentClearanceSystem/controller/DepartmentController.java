package com.coderscampus.StudentClearanceSystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coderscampus.StudentClearanceSystem.domain.Account;
import com.coderscampus.StudentClearanceSystem.domain.Department;
import com.coderscampus.StudentClearanceSystem.enums.AuthorityEnum;
import com.coderscampus.StudentClearanceSystem.service.DepartmentService;
import com.coderscampus.StudentClearanceSystem.util.AuthorityUtil;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {
    @Autowired
    private DepartmentService departmentService;
    @GetMapping
    public List<Department> findAllDepartments(){
        return departmentService.findAllDepartments();
    }
    @GetMapping("incollege")
    public ResponseEntity<?> findDepartmentsInCollege(@AuthenticationPrincipal Account account){
        if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_REGISTRAR.name(), account)){
            return ResponseEntity.ok(departmentService.findDepartmentsInCollege(account));
        }
        else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}

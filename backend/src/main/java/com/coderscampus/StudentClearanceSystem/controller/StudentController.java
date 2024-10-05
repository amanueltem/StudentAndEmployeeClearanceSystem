package com.coderscampus.StudentClearanceSystem.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coderscampus.StudentClearanceSystem.domain.Account;
import com.coderscampus.StudentClearanceSystem.dto.StudentDto;
import com.coderscampus.StudentClearanceSystem.enums.AuthorityEnum;
import com.coderscampus.StudentClearanceSystem.service.StudentService;
import com.coderscampus.StudentClearanceSystem.util.AuthorityUtil;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    @Autowired
    private StudentService studentService;
    

    @PostMapping
    public ResponseEntity<?> saveStudent(@AuthenticationPrincipal Account account,
     @RequestBody StudentDto studentDto) {
       
        //Authorization based on Role
        if (AuthorityUtil.hasRole(AuthorityEnum.ROLE_REGISTRAR.name(), account)){
                return ResponseEntity.ok(studentService.saveStudent(studentDto));
          
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        // return ResponseEntity.ok().build();
    }
    @GetMapping
    public ResponseEntity<?> getStudentByCollege(@AuthenticationPrincipal Account account){
    
        if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_REGISTRAR.name(), account)){
             return ResponseEntity.ok(studentService.getStudentsByCollege(account));
        }
        else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
        @GetMapping("all")
        public ResponseEntity<?> getAllStudents(@AuthenticationPrincipal Account account){
            if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_ADMIN.name(), account)){
                return ResponseEntity.ok(studentService.getAllStudents());
            }
            else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }
    
    }

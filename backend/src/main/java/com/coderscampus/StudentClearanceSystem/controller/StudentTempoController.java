package com.coderscampus.StudentClearanceSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.coderscampus.StudentClearanceSystem.domain.*;
import com.coderscampus.StudentClearanceSystem.dto.StudentDto;
import com.coderscampus.StudentClearanceSystem.enums.AuthorityEnum;
import com.coderscampus.StudentClearanceSystem.service.*;
import com.coderscampus.StudentClearanceSystem.util.AuthorityUtil;

@RestController
@RequestMapping("/api/tempo_students")
public class StudentTempoController {
    @Autowired
    private StudentTempoService studentTempoService;

    @PostMapping
    public ResponseEntity<?> saveStudent(@RequestBody StudentDto studentDto) {
            return ResponseEntity.ok(studentTempoService.saveStudent(studentDto));
    }

    @GetMapping
    public ResponseEntity<?> getStudentByCollege(@AuthenticationPrincipal Account account) {
        if (AuthorityUtil.hasRole(AuthorityEnum.ROLE_REGISTRAR.name(), account)) {
            return ResponseEntity.ok(studentTempoService.getStudentsByCollege(account));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("all")
    public ResponseEntity<?> getAllStudents(@AuthenticationPrincipal Account account) {
        if (AuthorityUtil.hasRole(AuthorityEnum.ROLE_ADMIN.name(), account)) {
            return ResponseEntity.ok(studentTempoService.getAllStudents());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

   
    
 
@GetMapping("/{id}")
public ResponseEntity<StudentTempo> getStudent(@AuthenticationPrincipal Account account,
                                          @PathVariable Long id) {
    if (AuthorityUtil.hasRole(AuthorityEnum.ROLE_REGISTRAR.name(), account) || 
        AuthorityUtil.hasRole(AuthorityEnum.ROLE_ADMIN.name(), account)) {
        // Call the service to retrieve the student
        StudentTempo student = studentTempoService.getStudent(id);
        return ResponseEntity.ok(student);
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}


}

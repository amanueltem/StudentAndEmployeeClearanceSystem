package com.coderscampus.StudentClearanceSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.coderscampus.StudentClearanceSystem.domain.*;
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
                                         @RequestBody StudentTempo studentTempo) {
      try{
        if (AuthorityUtil.hasRole(AuthorityEnum.ROLE_REGISTRAR.name(), account)) {
            return ResponseEntity.ok(studentService.saveStudent(studentTempo));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    catch (Exception e) {
        // Handle other exceptions
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                             .body("An error occurred while saving the student: " + e.getMessage());
    }
    
    }

    @GetMapping
    public ResponseEntity<?> getStudentByCollege(@AuthenticationPrincipal Account account) {
        if (AuthorityUtil.hasRole(AuthorityEnum.ROLE_REGISTRAR.name(), account)) {
            return ResponseEntity.ok(studentService.getStudentsByCollege(account));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("self")
    public ResponseEntity<?> getStudentByAccount(@AuthenticationPrincipal Account account){
        if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_STUDENT.name(),account)){
            return ResponseEntity.ok(studentService.getStudent(account));
        }
        else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("all")
    public ResponseEntity<?> getAllStudents(@AuthenticationPrincipal Account account) {
        if (AuthorityUtil.hasRole(AuthorityEnum.ROLE_ADMIN.name(), account)) {
            return ResponseEntity.ok(studentService.getAllStudents());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @DeleteMapping("/{studentId}")
    public ResponseEntity<?> deleteStudent(@AuthenticationPrincipal Account account,
                                           @PathVariable Long studentId) {
        if (AuthorityUtil.hasRole(AuthorityEnum.ROLE_REGISTRAR.name(), account)) {
            studentService.deleteStudent(studentId);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    
    @PutMapping
public ResponseEntity<?> updateStudent(@AuthenticationPrincipal Account account,
                                       @RequestBody Student student) {
    if (AuthorityUtil.hasRole(AuthorityEnum.ROLE_REGISTRAR.name(), account)) {
        // Call the service to update the student
        Student updatedStudent = studentService.updateStudent(student);
        
        return ResponseEntity.ok(updatedStudent);
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
@GetMapping("/{id}")
public ResponseEntity<Student> getStudent(@AuthenticationPrincipal Account account,
                                          @PathVariable Long id) {
    if (AuthorityUtil.hasRole(AuthorityEnum.ROLE_REGISTRAR.name(), account) || 
        AuthorityUtil.hasRole(AuthorityEnum.ROLE_ADMIN.name(), account)) {
        // Call the service to retrieve the student
        Student student = studentService.getStudent(id);
        return ResponseEntity.ok(student);
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}


}

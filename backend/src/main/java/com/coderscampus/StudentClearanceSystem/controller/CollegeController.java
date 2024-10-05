package com.coderscampus.StudentClearanceSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coderscampus.StudentClearanceSystem.service.CollegeService;


@RestController
@RequestMapping("/api/colleges")
public class CollegeController {
    @Autowired
    private CollegeService collegeService;
    @GetMapping
    public ResponseEntity<?> findAllColleges(){
        return ResponseEntity.ok(collegeService.findAllColleges());
    }
}

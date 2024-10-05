package com.coderscampus.StudentClearanceSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coderscampus.StudentClearanceSystem.service.CampusService;

@RestController
@RequestMapping("/api/campuses")
public class CampusController {
    @Autowired
    private CampusService campusService;
    @GetMapping
    public ResponseEntity<?> findAllCampuses(){
        return ResponseEntity.ok(campusService.findAllCampuses());
    }
}

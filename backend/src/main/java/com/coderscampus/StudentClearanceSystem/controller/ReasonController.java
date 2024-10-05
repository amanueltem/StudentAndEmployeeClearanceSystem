package com.coderscampus.StudentClearanceSystem.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coderscampus.StudentClearanceSystem.enums.ReasonEnum;

@RestController
@RequestMapping("/api/reasons")
public class ReasonController {
    @GetMapping
    public ResponseEntity<?> getReasons(){
        return ResponseEntity.ok(ReasonEnum.values());
    }
}

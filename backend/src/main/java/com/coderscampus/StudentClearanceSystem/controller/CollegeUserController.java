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
import com.coderscampus.StudentClearanceSystem.dto.StaffDto;
import com.coderscampus.StudentClearanceSystem.enums.AuthorityEnum;
import com.coderscampus.StudentClearanceSystem.service.CollegeUserService;
import com.coderscampus.StudentClearanceSystem.util.AuthorityUtil;

@RestController
@RequestMapping("/api/college_users")
public class CollegeUserController {
    @Autowired
    private CollegeUserService collegeUserService;

    @PostMapping
    public ResponseEntity<?> saveUser(@AuthenticationPrincipal Account account,
            @RequestBody StaffDto staff) {
        try {
            if (AuthorityUtil.hasRole(AuthorityEnum.ROLE_ADMIN.name(), account)) {
                return ResponseEntity.ok(collegeUserService.saveUser(staff));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

    }

    @GetMapping("librarians")
    public ResponseEntity<?> getLibrarian(@AuthenticationPrincipal Account account) {
        try {
            if (AuthorityUtil.hasRole(AuthorityEnum.ROLE_ADMIN.name(), account)) {
                return ResponseEntity.ok(collegeUserService.getLibrarian());
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @GetMapping("college_deans")
    public ResponseEntity<?> getCollegeDean(@AuthenticationPrincipal Account account) {
        try {
            if (AuthorityUtil.hasRole(AuthorityEnum.ROLE_ADMIN.name(), account)) {
                return ResponseEntity.ok(collegeUserService.getCollegeDean());
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @GetMapping("registrars")
    public ResponseEntity<?> getREgistrar(@AuthenticationPrincipal Account account) {
        try {
            if (AuthorityUtil.hasRole(AuthorityEnum.ROLE_ADMIN.name(), account)) {
                return ResponseEntity.ok(collegeUserService.getRegistrar());
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

}

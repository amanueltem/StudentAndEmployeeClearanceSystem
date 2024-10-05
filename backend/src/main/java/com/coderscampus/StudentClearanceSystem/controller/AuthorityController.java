package com.coderscampus.StudentClearanceSystem.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coderscampus.StudentClearanceSystem.domain.Account;
import com.coderscampus.StudentClearanceSystem.enums.AuthorityEnum;
import com.coderscampus.StudentClearanceSystem.util.AuthorityUtil;

@RestController
@RequestMapping("/api/authorities")
public class AuthorityController {
    @GetMapping
    public ResponseEntity<?> getAuthorities(@AuthenticationPrincipal Account account){
        if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_ADMIN.name(), account)){
            return ResponseEntity.ok(AuthorityEnum.values());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}

package com.coderscampus.StudentClearanceSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coderscampus.StudentClearanceSystem.domain.Account;
import com.coderscampus.StudentClearanceSystem.domain.ClearanceResponse;
import com.coderscampus.StudentClearanceSystem.enums.AuthorityEnum;
import com.coderscampus.StudentClearanceSystem.service.ClearanceResponseService;
import com.coderscampus.StudentClearanceSystem.util.AuthorityUtil;

@RestController
@RequestMapping("/api/responses")
public class ClearanceResponseController {
    @Autowired
    private ClearanceResponseService responseService;
    @GetMapping
    public ResponseEntity<?> findRequests(@AuthenticationPrincipal Account account){
        if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_STUDENT.name(), account)){
            return ResponseEntity.ok(responseService.getResponseDetails(account));
        }
        else{
        return ResponseEntity.ok(responseService.findRequests(account));
        }
    }
    @GetMapping("{responseId}")
    public ResponseEntity<?> findResponseById(@AuthenticationPrincipal Account account,
    @PathVariable Long responseId){
        if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_STUDENT.name(), account))
        {
            return ResponseEntity.ok(responseService.responseDetailsById(responseId));
        }
        return ResponseEntity.ok(responseService.findResponsebyId(responseId));
    }
    @GetMapping("details/{requestId}")
    public ResponseEntity<?> findByRequest(@AuthenticationPrincipal Account account,
    @PathVariable Long requestId){
        return ResponseEntity.ok(responseService.responseDetailsByClearanceRequest(requestId));
    }

    @PutMapping
    public ResponseEntity<?> updateClearanceResponse(@AuthenticationPrincipal Account account,
    @RequestBody ClearanceResponse clResponse){
     if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_STUDENT.name(), account)){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
     }
     else{
        return ResponseEntity.ok(responseService.updateClearanceResponse(clResponse));
     }
    }
}

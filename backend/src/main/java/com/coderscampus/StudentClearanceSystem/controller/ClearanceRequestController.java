package com.coderscampus.StudentClearanceSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.coderscampus.StudentClearanceSystem.domain.*;
import com.coderscampus.StudentClearanceSystem.enums.AuthorityEnum;
import com.coderscampus.StudentClearanceSystem.service.ClearanceRequestService;
import com.coderscampus.StudentClearanceSystem.util.AuthorityUtil;

@RestController
@RequestMapping("/api/requests")
public class ClearanceRequestController {
    @Autowired
    private ClearanceRequestService requestService;
    @PostMapping
    public ResponseEntity<?> saveRequest(@AuthenticationPrincipal Account account, 
    @RequestBody String reason){
        if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_STUDENT.name(), account)){
            try{
            return ResponseEntity.ok(requestService.saveClearanceRequest(account,reason));
            }
            catch(Exception e){
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }
        }
       else{
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
       }
    }
    @GetMapping("self")
    public ResponseEntity<?> searchRequest(@AuthenticationPrincipal Account account){
        if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_STUDENT.name(),account)){
            return ResponseEntity.ok(requestService.searchClearanceRequest(account));
        }
    
          else{
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
       }
    }


    @GetMapping("/{id}")
public ResponseEntity<ClearanceRequest> getClearanceRequest(@AuthenticationPrincipal Account account,
                                          @PathVariable Long id) {
    if (AuthorityUtil.hasRole(AuthorityEnum.ROLE_STUDENT.name(), account)) {
        // Call the service to retrieve the student
        ClearanceRequest request = requestService.getClearanceRequest(id);
        return ResponseEntity.ok(request);
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}

    
   
}

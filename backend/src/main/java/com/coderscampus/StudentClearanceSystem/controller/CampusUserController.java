package com.coderscampus.StudentClearanceSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.coderscampus.StudentClearanceSystem.domain.Account;
import com.coderscampus.StudentClearanceSystem.dto.StaffDto;
import com.coderscampus.StudentClearanceSystem.enums.AuthorityEnum;
import com.coderscampus.StudentClearanceSystem.service.CampusUserService;
import com.coderscampus.StudentClearanceSystem.util.AuthorityUtil;

@RestController
@RequestMapping("/api/campus_users")
public class CampusUserController {
    @Autowired
    private CampusUserService campusUserService;
    @PostMapping
    public ResponseEntity<?> saveUser(@AuthenticationPrincipal Account account,
    @RequestBody StaffDto staff){
    System.out.println("\n\n\n\n\n\n\n\n\n.............++++++++++++++++++++++++.................\n\n");
    System.out.println(staff.getFname());
        try{
            if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_ADMIN.name(),account)){
                return ResponseEntity.ok(campusUserService.saveUser(staff));
            }
            else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }
        catch(Exception ex){
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }
    @GetMapping("cafeterias")
    public ResponseEntity<?> getCafeteria(@AuthenticationPrincipal Account account){
        try{
            if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_ADMIN.name(),account)){
                return ResponseEntity.ok(campusUserService.getCafeteria());
            }
            else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }
        catch(Exception ex){
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

   

    @GetMapping("campus_polices")
    public ResponseEntity<?> getCampusPolice(@AuthenticationPrincipal Account account){
      
            if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_ADMIN.name(),account)){
                return ResponseEntity.ok(campusUserService.getCampusPolice());
            }
            else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
       
    }

    @GetMapping("general_stores")
    public ResponseEntity<?> getGeneralStore(@AuthenticationPrincipal Account account){
      
            if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_ADMIN.name(),account)){
                return ResponseEntity.ok(campusUserService.getGeneralStore());
            }
            else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
       
    }




         @DeleteMapping("/{staffId}")
    public ResponseEntity<?> deleteStaff(@AuthenticationPrincipal Account account,
                                           @PathVariable Long staffId) {
     
        if (AuthorityUtil.hasRole(AuthorityEnum.ROLE_ADMIN.name(), account)) {
            campusUserService.deleteStaff(staffId);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}

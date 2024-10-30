package com.coderscampus.StudentClearanceSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.coderscampus.StudentClearanceSystem.domain.Account;
import com.coderscampus.StudentClearanceSystem.dto.StaffDto;
import com.coderscampus.StudentClearanceSystem.enums.AuthorityEnum;
import com.coderscampus.StudentClearanceSystem.service.DepartmentUserService;
import com.coderscampus.StudentClearanceSystem.util.AuthorityUtil;

@RestController
@RequestMapping("/api/dept_users")
public class DepartmentUserController {
    @Autowired
    private DepartmentUserService deptUserService;

    @GetMapping("department_heads")
    public ResponseEntity<?> getHeads(@AuthenticationPrincipal Account account
    ){
        try{
            if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_ADMIN.name(), account)){
                return ResponseEntity.ok(deptUserService.getDeptHeads());
            }
            else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }
    @PostMapping
    public ResponseEntity<?> saveUser(@AuthenticationPrincipal Account account,
    @RequestBody StaffDto staffDto){
        try{
        if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_ADMIN.name(),account)){
           return ResponseEntity.ok(deptUserService.saveUser(staffDto));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    catch(Exception e){
        return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }
    }  






      @DeleteMapping("/{staffId}")
    public ResponseEntity<?> deleteStaff(@AuthenticationPrincipal Account account,
                                           @PathVariable Long staffId) {
        System.out.println("\n\n\n\n =================staff deletion.");
        if (AuthorityUtil.hasRole(AuthorityEnum.ROLE_ADMIN.name(), account)) {
            deptUserService.deleteStaff(staffId);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}

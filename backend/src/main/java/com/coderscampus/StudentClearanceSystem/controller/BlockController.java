package com.coderscampus.StudentClearanceSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coderscampus.StudentClearanceSystem.domain.Account;
import com.coderscampus.StudentClearanceSystem.enums.AuthorityEnum;
import com.coderscampus.StudentClearanceSystem.service.BlockService;
import com.coderscampus.StudentClearanceSystem.util.AuthorityUtil;

@RestController
@RequestMapping("/api/blocks")
public class BlockController {
    @Autowired
    private BlockService blockService;
    @GetMapping
    public ResponseEntity<?> findAllBlocks(){
        return ResponseEntity.ok(blockService.findAllBlocks());
    }
    @GetMapping("incampus")
    public ResponseEntity<?> findBlocksInCampus(@AuthenticationPrincipal Account account){
        if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_REGISTRAR.name(), account)){
            return ResponseEntity.ok(blockService.findBlocksInCampus(account));
        }
        else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
         
    }
}

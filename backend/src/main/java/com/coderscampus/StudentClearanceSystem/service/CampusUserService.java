package com.coderscampus.StudentClearanceSystem.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.coderscampus.StudentClearanceSystem.domain.*;

import com.coderscampus.StudentClearanceSystem.util.*;
import com.coderscampus.StudentClearanceSystem.dto.StaffDto;
import com.coderscampus.StudentClearanceSystem.enums.AuthorityEnum;
import com.coderscampus.StudentClearanceSystem.repository.*;


@Service
public class CampusUserService {
    @Autowired
    private CampusUserRepository campusUserRepo;
    @Autowired
    private AccountService accountService;
    @Autowired
    private AuthorityService authService;
    @Autowired
    private AccountRepository accountRepo;
    public CampusUser saveUser(StaffDto staff){
        CampusUser newUser=new CampusUser();
        newUser.setFname(staff.getFname());
        newUser.setMname(staff.getMname());
        newUser.setLname(staff.getLname());
     


        newUser.setPosition(staff.getRoleName());
     
        newUser.setGender(staff.getGender());
        newUser.setPhoneNumber(staff.getPhoneNumber());
        newUser.setCampus(staff.getCampus());

        Account newAccount=new Account();


          String staffId;
        Account userInDB;
        while(true){
            staffId=IDGenerator.generateID("staff");
           userInDB=accountRepo.findByUsername(staffId).orElse(null);
           if(userInDB!=null){
            newAccount.setUsername(staffId);
            break;
            }
        }
        
        PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
        String password=passwordEncoder.encode(newUser.getFname());
        newAccount.setPassword(password);
        newAccount.setCreatedDate(LocalDate.now());
        newAccount.setIsDefault(true);

        Account savedAccount=accountService.saveAccount(newAccount);
        Authority authority=new Authority();
       System.out.println(staff.getRoleName());
        authority.setAuthority(staff.getRoleName());
        authority.setUser(savedAccount);
        authService.saveAuthority(authority);

        newUser.setAccount(savedAccount);
      
        return campusUserRepo.save(newUser);
    }

    public List<CampusUser> getCafeteria(){
        return campusUserRepo.findByPosition(AuthorityEnum.ROLE_CAFETERIA.name());
      }
    
     
      public List<CampusUser> getCampusPolice(){
        return campusUserRepo.findByPosition(AuthorityEnum.ROLE_CAMPUS_POLICE.name());
      }
}

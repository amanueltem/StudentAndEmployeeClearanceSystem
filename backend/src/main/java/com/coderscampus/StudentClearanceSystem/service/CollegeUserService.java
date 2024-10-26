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
public class CollegeUserService {
    @Autowired
    private CollegeUserRepository collegeUserRepo;
    @Autowired
    private AccountService accountService;
    @Autowired
    private AccountRepository accountRepo;
    @Autowired
    private AuthorityService authService;
    public CollegeUser saveUser(StaffDto staff){
        CollegeUser newUser=new CollegeUser();
        newUser.setFname(staff.getFname());
        newUser.setMname(staff.getMname());
        newUser.setLname(staff.getLname());
      
        newUser.setPosition(staff.getRoleName());
      
        newUser.setGender(staff.getGender());
        newUser.setPhoneNumber(staff.getPhoneNumber());
        newUser.setCollege(staff.getCollege());

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
        newAccount.setEmail(staff.getEmail());

        Account savedAccount=accountService.saveAccount(newAccount);
        Authority authority=new Authority();
       System.out.println("\n\n\n\n\n\n\n");
        authority.setAuthority(staff.getRoleName());
        authority.setUser(savedAccount);
        authService.saveAuthority(authority);

        newUser.setAccount(savedAccount);
        
        return collegeUserRepo.save(newUser);
    }


    public List<CollegeUser> getLibrarian(){
       return collegeUserRepo.findByPosition(AuthorityEnum.ROLE_LIBRARY.name());
      }

      public List<CollegeUser> getCollegeDean(){
        return collegeUserRepo.findByPosition(AuthorityEnum.ROLE_COLLEGE_DEAN.name());
      }
    public List<CollegeUser> getRegistrar(){
      return collegeUserRepo.findByPosition(AuthorityEnum.ROLE_REGISTRAR.name());
      }

}

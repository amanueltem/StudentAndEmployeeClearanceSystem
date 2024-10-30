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
import org.springframework.transaction.annotation.Transactional;

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
      @Autowired
    private PasswordResetTokenRepository presetRepo;
    public CampusUser saveUser(StaffDto staff){
        CampusUser newUser=new CampusUser();



           List<CampusUser> users = campusUserRepo.findByPosition(staff.getRoleName());
              for (CampusUser user : users) {
            if (user.getCampus().getId().equals(staff.getCampus().getId())) {
                throw new IllegalStateException("Someone is registered in this position at the specified campus.");
            }
        }
        newUser.setFname(staff.getFname());
        newUser.setMname(staff.getMname());
        newUser.setLname(staff.getLname());
     


        newUser.setPosition(staff.getRoleName());
     
        newUser.setGender(staff.getGender());
        newUser.setPhoneNumber(staff.getPhoneNumber());
        newUser.setCampus(staff.getCampus());

        Account newAccount=new Account();


          String staffId;
       
            staffId=IDGenerator.generateID("campus");
            newAccount.setUsername(staffId);
            newAccount.setEmail(staff.getEmail());
        
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

      public List<CampusUser> getGeneralStore(){
        return campusUserRepo.findByPosition(AuthorityEnum.ROLE_GENERAL_STORE.name());
      }


         @Transactional
    public CampusUser deleteStaff(Long id) {
        CampusUser staff = campusUserRepo.findById(id).orElse(null);
        if (staff != null) {
            campusUserRepo.deleteById(id);
            PasswordResetToken ps = presetRepo.findByAccount(staff.getAccount()).orElse(null);
            if (ps != null) {
                presetRepo.deleteById(ps.getId());
            }
        }
        return staff;
    }
}

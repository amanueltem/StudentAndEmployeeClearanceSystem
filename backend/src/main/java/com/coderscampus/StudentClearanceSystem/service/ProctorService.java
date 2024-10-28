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
public class ProctorService {
    @Autowired
    private AccountService accountService;
    @Autowired
    private AuthorityService authService;
    @Autowired
    private ProctorRepository proRepo;
    @Autowired
    private AccountRepository accountRepo;
       @Autowired
    private PasswordResetTokenRepository presetRepo;
    
    public Proctor saveUser(StaffDto staff){
        Proctor newUser=new Proctor();

         List<Proctor> users = proRepo.findByPosition(staff.getRoleName());
        
        // Check for existing users in the same college and position
        for (Proctor user : users) {
            if (user.getBlock().getId().equals(staff.getBlock().getId())) {
                throw new IllegalStateException("Someone is registered in this position at the specified college.");
            }
        }

        newUser.setFname(staff.getFname());
        newUser.setMname(staff.getMname());
        newUser.setLname(staff.getLname());
     
        newUser.setPosition(staff.getRoleName());
      
        newUser.setGender(staff.getGender());
        newUser.setPhoneNumber(staff.getPhoneNumber());
        newUser.setBlock(staff.getBlock());

        Account newAccount=new Account();
         String staffId;
      
            staffId=IDGenerator.generateID("pro");
         
            newAccount.setUsername(staffId);
           
      
        PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
        
        String password=passwordEncoder.encode(newUser.getFname());
        newAccount.setPassword(password);
        newAccount.setCreatedDate(LocalDate.now());
        newAccount.setIsDefault(true);
        newAccount.setEmail(staff.getEmail());

        Account savedAccount=accountService.saveAccount(newAccount);
        Authority authority=new Authority();
       System.out.println(staff.getRoleName());
        authority.setAuthority(staff.getRoleName());
        authority.setUser(savedAccount);
        authService.saveAuthority(authority);

        newUser.setAccount(savedAccount);
       
        
        return proRepo.save(newUser);
    }

  
      public List<Proctor> getProctor(){
       return proRepo.findByPosition(AuthorityEnum.ROLE_PROCTOR.name());
      }  


         @Transactional
    public Proctor deleteStaff(Long id) {
        Proctor staff = proRepo.findById(id).orElse(null);
        if (staff != null) {
            proRepo.deleteById(id);
            PasswordResetToken ps = presetRepo.findByAccount(staff.getAccount()).orElse(null);
            if (ps != null) {
                presetRepo.deleteById(ps.getId());
            }
        }
        return staff;
    }
}

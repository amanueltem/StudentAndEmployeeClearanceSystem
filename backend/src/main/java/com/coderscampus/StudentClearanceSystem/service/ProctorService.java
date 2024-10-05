package com.coderscampus.StudentClearanceSystem.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.coderscampus.StudentClearanceSystem.domain.Account;
import com.coderscampus.StudentClearanceSystem.domain.Authority;
import com.coderscampus.StudentClearanceSystem.domain.Proctor;
import com.coderscampus.StudentClearanceSystem.dto.StaffDto;
import com.coderscampus.StudentClearanceSystem.enums.AuthorityEnum;
import com.coderscampus.StudentClearanceSystem.repository.ProctorRepository;

@Service
public class ProctorService {
    @Autowired
    private AccountService accountService;
    @Autowired
    private AuthorityService authService;
    @Autowired
    private ProctorRepository proRepo;
    public Proctor saveUser(StaffDto staff){
        Proctor newUser=new Proctor();
        newUser.setFname(staff.getFname());
        newUser.setMname(staff.getMname());
        newUser.setLname(staff.getLname());
        newUser.setEmail(staff.getEmail());
        newUser.setPosition(staff.getRoleName());
        Boolean g;
        if(staff.getGender()=="Male"){
            g=true;
        }
        else{
            g=false;
        }
        newUser.setGender(g);
        newUser.setPhoneNumber(staff.getPhoneNumber());
        newUser.setBlock(staff.getBlock());

        Account newAccount=new Account();
        newAccount.setUsername(newUser.getEmail());
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
       
        Optional <Proctor> userOptional=proRepo.findCampusUserByEmail(newUser.getEmail());
        if(userOptional.isPresent()){
            new IllegalStateException("Email already taken");
        }
        return proRepo.save(newUser);
    }

  
      public List<Proctor> getProctor(){
       return proRepo.findByPosition(AuthorityEnum.ROLE_PROCTOR.name());
      }  
}

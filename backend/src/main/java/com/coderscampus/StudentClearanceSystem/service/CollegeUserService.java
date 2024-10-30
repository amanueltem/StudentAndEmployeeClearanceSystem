package com.coderscampus.StudentClearanceSystem.service;

import java.time.LocalDate;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    @Autowired
    private PasswordResetTokenRepository presetRepo;

    @Transactional
    public CollegeUser saveUser(StaffDto staff) {
        CollegeUser newUser = new CollegeUser();
        List<CollegeUser> users = collegeUserRepo.findByPosition(staff.getRoleName());
        
        // Check for existing users in the same college and position
        for (CollegeUser user : users) {
            if (user.getCollege().getName().equals(staff.getCollege().getName())) {
                throw new IllegalStateException("Someone is registered in this position at the specified college.");
            }
        }
        
        // Set user fields
        newUser.setFname(staff.getFname());
        newUser.setMname(staff.getMname());
        newUser.setLname(staff.getLname());
        newUser.setPosition(staff.getRoleName());
        newUser.setGender(staff.getGender());
        newUser.setPhoneNumber(staff.getPhoneNumber());
        newUser.setCollege(staff.getCollege());

        // Create and configure account
        Account newAccount = new Account();
        String staffId;
        do {
            staffId = IDGenerator.generateID("staff");
            Optional<Account> existingAccount = accountRepo.findByUsername(staffId);
            if (existingAccount.isEmpty()) break;
        } while (true);

        newAccount.setUsername(staffId);
        
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String password = passwordEncoder.encode(newUser.getFname());
        newAccount.setPassword(password);
        newAccount.setCreatedDate(LocalDate.now());
        newAccount.setIsDefault(true); 
        newAccount.setEmail(staff.getEmail());

        // Save account and create authority
        Account savedAccount = accountService.saveAccount(newAccount);
        Authority authority = new Authority();
        authority.setAuthority(staff.getRoleName());
        authority.setUser(savedAccount);
        authService.saveAuthority(authority);

        // Associate account with the new user
        newUser.setAccount(savedAccount);
        
        return collegeUserRepo.save(newUser);
    }

    public List<CollegeUser> getLibrarian() {
        return collegeUserRepo.findByPosition(AuthorityEnum.ROLE_LIBRARY.name());
    }

    public List<CollegeUser> getCollegeDean() {
        return collegeUserRepo.findByPosition(AuthorityEnum.ROLE_COLLEGE_DEAN.name());
    }

    public List<CollegeUser> getRegistrar() {
        return collegeUserRepo.findByPosition(AuthorityEnum.ROLE_REGISTRAR.name());
    }
      public List<CollegeUser> getHR() {
        return collegeUserRepo.findByPosition(AuthorityEnum.ROLE_HR.name());
    }

    @Transactional
    public CollegeUser deleteStaff(Long id) {
        CollegeUser staff = collegeUserRepo.findById(id).orElse(null);
        if (staff != null) {
            collegeUserRepo.deleteById(id);
            PasswordResetToken ps = presetRepo.findByAccount(staff.getAccount()).orElse(null);
            if (ps != null) {
                presetRepo.deleteById(ps.getId());
            }
        }
        return staff;
    }
}

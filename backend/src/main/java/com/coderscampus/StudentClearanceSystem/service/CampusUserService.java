package com.coderscampus.StudentClearanceSystem.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.io.BufferedReader;
import java.io.FileReader;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.coderscampus.StudentClearanceSystem.domain.*;
import com.coderscampus.StudentClearanceSystem.service.*;
import com.coderscampus.StudentClearanceSystem.util.*;
import com.coderscampus.StudentClearanceSystem.dto.StaffDto;
import com.coderscampus.StudentClearanceSystem.enums.AuthorityEnum;
import com.coderscampus.StudentClearanceSystem.repository.*;
import org.springframework.transaction.annotation.Transactional;
import lombok.*;
import java.io.IOException;
@Service
@RequiredArgsConstructor
public class CampusUserService {
    private final  CampusUserRepository campusUserRepo;
    private final AccountService accountService;
    private final AuthorityService authService;
    private final AccountRepository accountRepo;
    private final PasswordResetTokenRepository presetRepo;
    private final CampusService campusService;
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
    
    
        public void loadCampusUserFromCSV(String campusUserCsvPath){
        if (campusUserRepo.count() > 0) {
            System.out.println("campus user data already exists in the database.");
            return; 
        }
        
        try (BufferedReader br = new BufferedReader(new FileReader(campusUserCsvPath))) {
            String line;
            while ((line = br.readLine()) != null) {
                // Split the CSV line into name and campus_id
                String[] data = line.split(",");
                if (data.length == 8) {
                    String fname = data[0].trim();  // Trim any spaces from the college name
                    String mname=data[1].trim();
                    String lname=data[2].trim();
                    String gender=data[3].trim();
                 
                    Integer phoneNumber=Integer.valueOf(data[4].trim());
                       String email=data[5].trim();
                    String position=data[6].trim();
                    Long campusId = Long.valueOf(data[7].trim());  // Trim any spaces from campus_id

                    
                    Campus campus= campusService.getCampusById(campusId);
                    if (campus == null) {
                        System.out.println("Campus ID " + campusId + " not found. Skipping Campus User: " + fname+" "+lname);
                        continue;  
                    }

                    StaffDto staffDto=new StaffDto();
                  
                    staffDto.setFname(fname);
                    staffDto.setMname(mname);
                    staffDto.setLname(lname);
                    staffDto.setGender(gender);
                    staffDto.setPhoneNumber(phoneNumber);
                    staffDto.setEmail(email);
                    staffDto.setRoleName(position);
                    staffDto.setCampus(campus);
                    
                    
                     saveUser(staffDto);
                  
                } else {
                    System.out.println("Invalid line in CSV file: " + line);
                }
            }
        } catch (IOException e) {
            System.err.println("Error reading CSV file: " + e.getMessage());
            e.printStackTrace();
        }
        }
}

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
import com.coderscampus.StudentClearanceSystem.domain.DepartmentUser;
import com.coderscampus.StudentClearanceSystem.dto.StaffDto;
import com.coderscampus.StudentClearanceSystem.enums.AuthorityEnum;
import com.coderscampus.StudentClearanceSystem.repository.DepartmentUserRepository;

@Service
public class DepartmentUserService {
    @Autowired
    private DepartmentUserRepository deptUserRepo;
    @Autowired
    private AccountService accountService;
    @Autowired
    private AuthorityService authService;
    public DepartmentUser saveUser(StaffDto staff){
        DepartmentUser newUser=new DepartmentUser();
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
        newUser.setDepartment(staff.getDepartment());

        Account newAccount=new Account();
        newAccount.setUsername(newUser.getEmail());
        PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
        String password=passwordEncoder.encode(newUser.getFname());
        newAccount.setPassword(password);
        newAccount.setCreatedDate(LocalDate.now());
        newAccount.setIsDefault(true);

        Account savedAccount=accountService.saveAccount(newAccount);
        Authority authority=new Authority();
     
      
        authority.setAuthority(staff.getRoleName());
        
        authority.setUser(savedAccount);
        authService.saveAuthority(authority);

        newUser.setAccount(savedAccount);
        Optional <DepartmentUser> userOptional=deptUserRepo.findByEmail(newUser.getEmail());
        if(userOptional.isPresent()){
            new IllegalStateException("Email already taken");
        }
        return deptUserRepo.save(newUser);
    }


    public List<DepartmentUser> getDeptHeads(){
       return deptUserRepo.findByPosition(AuthorityEnum.ROLE_DEPARTMENT_HEAD.name());
      }
    
}

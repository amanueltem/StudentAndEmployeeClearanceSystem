package com.coderscampus.StudentClearanceSystem.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.coderscampus.StudentClearanceSystem.domain.*;
import com.coderscampus.StudentClearanceSystem.dto.StudentDto;
import com.coderscampus.StudentClearanceSystem.enums.AuthorityEnum;
import com.coderscampus.StudentClearanceSystem.repository.*;

import com.coderscampus.StudentClearanceSystem.util.*;
import org.springframework.transaction.annotation.Transactional;
import java.util.NoSuchElementException;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepo;
    @Autowired
    private AccountService accountService;
    @Autowired
    private AuthorityService authService;
    @Autowired
    private CollegeUserRepository cuRepo;
    @Autowired
    private CustomPasswordEncoder passwordEncoder;
    @Autowired
    private ClearanceRequestRepository clRequestRepo;
    @Autowired
    private ClearanceResponseRepository clResponseRepo;
    @Autowired
    private PasswordResetTokenRepository presetRepo;
    @Autowired
    private AccountRepository accountRepo;
    @Transactional
    public Student saveStudent(StudentDto studentDto){

        Student newStudent = new Student();
        newStudent.setFname(studentDto.getFname());
        newStudent.setMname(studentDto.getMname());
        newStudent.setLname(studentDto.getLname());
      
        newStudent.setPosition("ROLE_STUDENT");
        Boolean g;
        if (studentDto.getGender() == "male") {
            g = true;
        } else {
            g = false;
        }
        newStudent.setGender(g);
        newStudent.setYear(studentDto.getYear());
        newStudent.setSemister(studentDto.getSemister());
        newStudent.setRoomNo(studentDto.getRoomNo());
        newStudent.setBlock(studentDto.getBlock());
        newStudent.setPhoneNumber(studentDto.getPhoneNumber());
        newStudent.setDepartment(studentDto.getDepartment());

        Account newAccount = new Account();
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
     
        String password = passwordEncoder.getPasswordEncoder().encode(newStudent.getFname());
        newAccount.setPassword(password);
        newAccount.setCreatedDate(LocalDate.now());
        newAccount.setIsDefault(true);
        newAccount.setEmail(studentDto.getEmail());
        Account savedAccount = accountService.saveAccount(newAccount);
        Authority authority = new Authority();
        authority.setAuthority(AuthorityEnum.ROLE_STUDENT.name());
        authority.setUser(savedAccount);
        authService.saveAuthority(authority);
       

        newStudent.setAccount(savedAccount);
       
        return studentRepo.save(newStudent);
    }
    public List<Student> getStudentsByCollege(Account account){
        Optional<CollegeUser> cuOptional=cuRepo.findByAccount(account);
        CollegeUser cuUser=cuOptional.orElse(new CollegeUser());
        System.out.println(account.getId());
        System.out.println(cuUser.getCollege().getName());
        List<Student> students=studentRepo.findAll();
        List<Student> filteredStudents=new ArrayList<>();
        for(Student student:students){
            if(student.getDepartment().getCollege().equals(cuUser.getCollege())){
                filteredStudents.add(student);
            }
        }
        return filteredStudents;
    }
    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }
    public Student getStudent(Long id){
        return  studentRepo.findById(id)
                                       .orElseThrow(() -> new NoSuchElementException("Student not found"));
    }
    @Transactional
    public Student deleteStudent(Long id){
        Student student=studentRepo.findById(id).orElse(new Student());
         List<ClearanceRequest> requests=clRequestRepo.findByRequestedBy(student);
         for(ClearanceRequest r:requests){
            List<ClearanceResponse> responses=clResponseRepo.findByClearanceRequest(r);
            for(ClearanceResponse res: responses){
                clResponseRepo.deleteById(res.getId());
            }

            clRequestRepo.deleteById(r.getId());
         }
         studentRepo.deleteById(id);
         PasswordResetToken ps=presetRepo.findByAccount(student.getAccount()).orElse(null);
         if(ps!=null)
         presetRepo.deleteById(ps.getId());
      return student;
    }
    
      @Transactional
    public Student updateStudent(Student student) {
    // Fetch student from the database, update its fields, and save it
    Student savedStudent = studentRepo.findById(student.getId())
                                       .orElseThrow(() -> new NoSuchElementException("Student not found"));
    
    if(student.getAccount().getEmail()!=savedStudent.getAccount().getEmail()){
    Account account=accountRepo.findByUsername(student.getAccount().getUsername()).orElseThrow(()-> new NoSuchElementException("email not found"));
     account.setEmail(student.getAccount().getEmail());
     accountRepo.save(account);
    }
    
    // Set other fields as needed...

    // Save the updated student back to the repository
    student = studentRepo.save(student);
    
    // Return the updated StudentDto
    return student;
}

}

package com.coderscampus.StudentClearanceSystem.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.coderscampus.StudentClearanceSystem.domain.*;
import com.coderscampus.StudentClearanceSystem.enums.AuthorityEnum;
import com.coderscampus.StudentClearanceSystem.repository.*;

import lombok.RequiredArgsConstructor;

import org.springframework.transaction.annotation.Transactional;
import java.util.NoSuchElementException;
@RequiredArgsConstructor
@Service
public class StudentService {
    private  final StudentRepository studentRepo;
    private  final AccountService accountService;
    private final AuthorityService authService;
    private  final CollegeUserRepository cuRepo;
    private final PasswordEncoder passwordEncoder;
    private  final ClearanceRequestRepository clRequestRepo;
    private  final ClearanceResponseRepository clResponseRepo;
    private final  PasswordResetTokenRepository presetRepo;
    private  final AccountRepository accountRepo;
    private  final StudentTempoRepository studentTempoRepo;
    private  final EmailService emailService;
    private final String baseUrl;

    @Transactional
    public Student saveStudent(StudentTempo studentTempo){

        Student newStudent = new Student();
        newStudent.setFname(studentTempo.getFname());
        newStudent.setMname(studentTempo.getMname());
        newStudent.setLname(studentTempo.getLname());
      
        newStudent.setPosition("ROLE_STUDENT");
        
        newStudent.setGender(studentTempo.getGender());
        newStudent.setYear(studentTempo.getYear());
        newStudent.setSemister(studentTempo.getSemister());
        newStudent.setRoomNo(studentTempo.getRoomNo());
        newStudent.setBlock(studentTempo.getBlock());
        newStudent.setPhoneNumber(studentTempo.getPhoneNumber());
        newStudent.setDepartment(studentTempo.getDepartment());

        Account newAccount = new Account();
        
      
            newAccount.setUsername(studentTempo.getStudentId());
          
     
        String password = passwordEncoder.encode(newStudent.getFname().trim());
        newAccount.setPassword(password);
        newAccount.setCreatedDate(LocalDate.now());
        newAccount.setIsDefault(true);
        newAccount.setEmail(studentTempo.getEmail().trim().toLowerCase());
        Account savedAccount = accountService.saveAccount(newAccount);
        Authority authority = new Authority();
        authority.setAuthority(AuthorityEnum.ROLE_STUDENT.name());
        authority.setUser(savedAccount);
        authService.saveAuthority(authority);
       

        newStudent.setAccount(savedAccount);
        studentTempoRepo.delete(studentTempo);
          
/*
        emailService.sendEmail(studentTempo.getEmail(), "Registration approved", 
            "your username is="+savedAccount.getUsername()+" and your default password is="+studentTempo.getFname()+".\n\n" + baseUrl);*/
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


   public Student getStudent(Account account){
    return studentRepo.findByAccount(account).orElse(null);
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

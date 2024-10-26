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

import com.coderscampus.StudentClearanceSystem.util.CustomPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import java.util.NoSuchElementException;

@Service
public class StudentTempoService {
    @Autowired
    private StudentTempoRepository studentTempoRepo;
    @Autowired
    private AccountService accountService;
    @Autowired
    private AuthorityService authService;
    
    @Autowired
    private AccountRepository accountRepo;
     @Autowired
    private CollegeUserRepository cuRepo;
    @Transactional
    public StudentTempo saveStudent(StudentDto studentDto){

        StudentTempo newStudent = new StudentTempo();
        newStudent.setStudentId(studentDto.getStudentId());
        newStudent.setFname(studentDto.getFname());
        newStudent.setMname(studentDto.getMname());
        newStudent.setLname(studentDto.getLname());
        newStudent.setEmail(studentDto.getEmail());
        newStudent.setStudentId(studentDto.getStudentId());
        newStudent.setGender(studentDto.getGender());
        newStudent.setYear(studentDto.getYear());
        newStudent.setSemister(studentDto.getSemister());
        newStudent.setRoomNo(studentDto.getRoomNo());
        newStudent.setBlock(studentDto.getBlock());
        newStudent.setPhoneNumber(studentDto.getPhoneNumber());
        newStudent.setDepartment(studentDto.getDepartment());
        return studentTempoRepo.save(newStudent);
    }
   
    public List<StudentTempo> getAllStudents() {
        return studentTempoRepo.findAll();
    }
    public StudentTempo getStudent(Long id){
        return  studentTempoRepo.findById(id)
                                       .orElseThrow(() -> new NoSuchElementException("Student not found"));
    }


       public List<StudentTempo> getStudentsByCollege(Account account){
        Optional<CollegeUser> cuOptional=cuRepo.findByAccount(account);
        CollegeUser cuUser=cuOptional.orElse(new CollegeUser());
       
        List<StudentTempo> students=studentTempoRepo.findAll();
        List<StudentTempo> filteredStudents=new ArrayList<>();
        for(StudentTempo student:students){
            if(student.getDepartment().getCollege().equals(cuUser.getCollege())){
                filteredStudents.add(student);
            }
        }
        return filteredStudents;
    }
   
    

}

package com.coderscampus.StudentClearanceSystem.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.coderscampus.StudentClearanceSystem.domain.Account;
import com.coderscampus.StudentClearanceSystem.domain.Authority;
import com.coderscampus.StudentClearanceSystem.domain.CollegeUser;
import com.coderscampus.StudentClearanceSystem.domain.Student;
import com.coderscampus.StudentClearanceSystem.dto.StudentDto;
import com.coderscampus.StudentClearanceSystem.enums.AuthorityEnum;
import com.coderscampus.StudentClearanceSystem.repository.CollegeUserRepository;
import com.coderscampus.StudentClearanceSystem.repository.StudentRepository;
import com.coderscampus.StudentClearanceSystem.util.CustomPasswordEncoder;

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
    public Student saveStudent(StudentDto studentDto){

        Student newStudent = new Student();
        newStudent.setFname(studentDto.getFname());
        newStudent.setMname(studentDto.getMname());
        newStudent.setLname(studentDto.getLname());
        newStudent.setEmail(studentDto.getEmail());
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
        newAccount.setUsername(newStudent.getEmail());
     
        String password = passwordEncoder.getPasswordEncoder().encode(newStudent.getFname());
        newAccount.setPassword(password);
        newAccount.setCreatedDate(LocalDate.now());
        newAccount.setIsDefault(true);
        Account savedAccount = accountService.saveAccount(newAccount);
        Authority authority = new Authority();
        authority.setAuthority(AuthorityEnum.ROLE_STUDENT.name());
        authority.setUser(savedAccount);
        authService.saveAuthority(authority);
        // newAccount.setAuthorities(List.of(savedAuthority));

        newStudent.setAccount(savedAccount);
        Optional<Student> studentOptional = studentRepo.findStudentByEmail(newStudent.getEmail());
        if (studentOptional.isPresent()) {
            // If a student with the email exists, throw an exception with a custom message
            throw new IllegalStateException("Email already taken");
        }
        return studentRepo.save(newStudent);
    }
    public List<Student> getStudentsByCollege(Account account){
        Optional<CollegeUser> cuOptional=cuRepo.findByAccount(account);
        CollegeUser cuUser=cuOptional.orElse(new CollegeUser());
        System.out.println("\n\n\n\n\n\n\n\n");
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
}

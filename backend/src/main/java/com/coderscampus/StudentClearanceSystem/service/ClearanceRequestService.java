package com.coderscampus.StudentClearanceSystem.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coderscampus.StudentClearanceSystem.domain.Account;
import com.coderscampus.StudentClearanceSystem.domain.Block;
import com.coderscampus.StudentClearanceSystem.domain.Campus;
import com.coderscampus.StudentClearanceSystem.domain.CampusUser;
import com.coderscampus.StudentClearanceSystem.domain.ClearanceRequest;
import com.coderscampus.StudentClearanceSystem.domain.ClearanceResponse;
import com.coderscampus.StudentClearanceSystem.domain.College;
import com.coderscampus.StudentClearanceSystem.domain.CollegeUser;
import com.coderscampus.StudentClearanceSystem.domain.Department;
import com.coderscampus.StudentClearanceSystem.domain.DepartmentUser;
import com.coderscampus.StudentClearanceSystem.domain.Proctor;
import com.coderscampus.StudentClearanceSystem.domain.Student;
import com.coderscampus.StudentClearanceSystem.repository.ClearanceRequestRepository;
import com.coderscampus.StudentClearanceSystem.repository.ClearanceResponseRepository;
import com.coderscampus.StudentClearanceSystem.repository.StudentRepository;

@Service
public class ClearanceRequestService {
    @Autowired
    private ClearanceRequestRepository requestRepo;
    @Autowired
    private StudentRepository studentRepo;
    @Autowired
    private ClearanceResponseRepository clResponseRepository;
    @Autowired
    private DepartmentUserService deptService;
    @Autowired
    private CollegeUserService collegeUserService;
    @Autowired
    private CampusUserService campusUserService;
    @Autowired
    private ProctorService proctorService;
    public ClearanceResponse saveClearanceRequest(Account account, String reason) {
        ClearanceRequest request = new ClearanceRequest();
        request.setRequestedDate(LocalDate.now());
        request.setRequestedReason(reason);
        Optional<Student> optionalStudent = studentRepo.findByAccount(account);
        Student student = optionalStudent.orElse(new Student());
        List<ClearanceRequest> requests =requestRepo.findByRequestedBy(student);
        if(requests.size()>0){
            throw new IllegalStateException("Already requested.");
        }
        //intialize Responses

        request.setRequestedBy(student);
        
       
        ClearanceRequest savedClearance=requestRepo.save(request);
          //intialize Response Department Head
        List<DepartmentUser> departmentHead=deptService.getDeptHeads();
        ClearanceResponse clResponse=new ClearanceResponse();
        clResponse.setClearanceRequest(savedClearance);
        clResponse.setResponsedBy(filterDepartmentHead(student.getDepartment(), 
        departmentHead));
        clResponseRepository.save(clResponse);
        //intialize Response Library Head
        List<CollegeUser> librarian=collegeUserService.getLibrarian();
        clResponse=new ClearanceResponse();
        clResponse.setClearanceRequest(savedClearance);
        clResponse.setResponsedBy(filterCollegeUser(student.getDepartment().getCollege(), librarian));
        clResponseRepository.save(clResponse);
        //intialize  Response Registrar
        List<CollegeUser> registrar=collegeUserService.getRegistrar();
        clResponse=new ClearanceResponse();
        clResponse.setClearanceRequest(savedClearance);
        clResponse.setResponsedBy(filterCollegeUser(student.getDepartment().getCollege(),registrar));
        clResponseRepository.save(clResponse);

        //intialize Student Cafteria
        List<CampusUser> cafeterias=campusUserService.getCafeteria();
        clResponse=new ClearanceResponse();
        clResponse.setClearanceRequest(savedClearance);
        clResponse.setResponsedBy(filterCampusUser(
            student.getDepartment().getCollege().getCampus(), cafeterias));
            clResponseRepository.save(clResponse);

            //intialize proctor
            List<Proctor> proctors=proctorService.getProctor();
            clResponse=new ClearanceResponse();
            clResponse.setClearanceRequest(savedClearance);
            clResponse.setResponsedBy(
                filterProctor(student.getBlock(), proctors)
            );
            clResponseRepository.save(clResponse);

            //intialize college dean
            if(savedClearance.getRequestedReason().equals("\"Withdrawal\"")){
                List<CollegeUser> deans=collegeUserService.getCollegeDean();
                clResponse=new ClearanceResponse();
                clResponse.setClearanceRequest(savedClearance);
                clResponse.setResponsedBy(
                    filterCollegeUser(student.getDepartment().getCollege(),deans)
                );
                clResponseRepository.save(clResponse);
            }
            //intialize Campus Police
            if(savedClearance.getRequestedReason().equals("\"Id Replacement\"")){
                List<CampusUser> campusUsers=campusUserService.getCampusPolice();
                clResponse=new ClearanceResponse();
                clResponse.setClearanceRequest(savedClearance);
                clResponse.setResponsedBy(
                    filterCampusUser(
                        student.getDepartment().getCollege().getCampus(), campusUsers)
                );
                clResponseRepository.save(clResponse);
            }
            return clResponse;
    }


    private DepartmentUser filterDepartmentHead(Department dept,List<DepartmentUser> users){
        for(DepartmentUser user:users){
            if(user.getDepartment().equals(dept)){
                return user;
            }
        }
        return null;
    }
  
    private CollegeUser filterCollegeUser(College college,List<CollegeUser> users){
        for(CollegeUser user:users){
            if(user.getCollege().equals(college)){
                return user;
            }
        }
        return null;
    }

    private CampusUser filterCampusUser(Campus campus,List<CampusUser> users){
        for(CampusUser user:users){
            if(user.getCampus().equals(campus)){
                return user;
            }
        }
        return null;
    }

    private Proctor filterProctor(Block block,List<Proctor> users){
        for(Proctor user:users){
            if(user.getBlock().equals(block)){
                return user;
            }
        }
        return null;
    }
   public List<ClearanceRequest> searchClearanceRequest(Account account){
    Optional<Student> optionalStudent=studentRepo.findByAccount(account);
    Student student=optionalStudent.orElse(new Student());
    return requestRepo.findByRequestedBy(student);
   } 
   

}

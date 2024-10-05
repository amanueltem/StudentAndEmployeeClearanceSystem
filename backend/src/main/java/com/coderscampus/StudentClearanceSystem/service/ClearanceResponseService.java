package com.coderscampus.StudentClearanceSystem.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coderscampus.StudentClearanceSystem.domain.Account;
import com.coderscampus.StudentClearanceSystem.domain.CampusUser;
import com.coderscampus.StudentClearanceSystem.domain.ClearanceRequest;
import com.coderscampus.StudentClearanceSystem.domain.ClearanceResponse;
import com.coderscampus.StudentClearanceSystem.domain.CollegeUser;
import com.coderscampus.StudentClearanceSystem.domain.DepartmentUser;
import com.coderscampus.StudentClearanceSystem.domain.Proctor;
import com.coderscampus.StudentClearanceSystem.domain.Student;
import com.coderscampus.StudentClearanceSystem.dto.ResponseDto;
import com.coderscampus.StudentClearanceSystem.enums.AuthorityEnum;
import com.coderscampus.StudentClearanceSystem.repository.CampusUserRepository;
import com.coderscampus.StudentClearanceSystem.repository.ClearanceRequestRepository;
import com.coderscampus.StudentClearanceSystem.repository.ClearanceResponseRepository;
import com.coderscampus.StudentClearanceSystem.repository.CollegeUserRepository;
import com.coderscampus.StudentClearanceSystem.repository.DepartmentUserRepository;
import com.coderscampus.StudentClearanceSystem.repository.ProctorRepository;
import com.coderscampus.StudentClearanceSystem.repository.StudentRepository;
import com.coderscampus.StudentClearanceSystem.util.AuthorityUtil;

@Service
public class ClearanceResponseService {
    @Autowired
    private ClearanceResponseRepository clResponseRepo;
    @Autowired
    private CampusUserRepository cuRepo;
    @Autowired
    private CollegeUserRepository collRepo;
    @Autowired
    private DepartmentUserRepository deptRepo;
    @Autowired
    private ProctorRepository proRepo;
    @Autowired
    private StudentRepository studentRepo;
    @Autowired
    private ClearanceRequestRepository clRequestRepo;
    public List<ClearanceResponse> findRequests(Account account){
        if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_CAFETERIA.name(), account)||
        AuthorityUtil.hasRole(AuthorityEnum.ROLE_CAMPUS_POLICE.name(), account)){
            Optional<CampusUser> userOptional=cuRepo.findByAccount(account);
            CampusUser user=userOptional.orElse(new CampusUser());
            List<ClearanceResponse> clResponse=clResponseRepo.findByResponsedBy(user);
            return clResponse;
        }
        else if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_COLLEGE_DEAN.name(), account)||
                AuthorityUtil.hasRole(AuthorityEnum.ROLE_LIBRARY.name(), account)||
                AuthorityUtil.hasRole(AuthorityEnum.ROLE_REGISTRAR.name(), account)){
                    Optional<CollegeUser> userOptional=collRepo.findByAccount(account);
                    CollegeUser user=userOptional.orElse(new CollegeUser());
                    List<ClearanceResponse> clResponse=clResponseRepo.findByResponsedBy(user);
                    return clResponse;
                }
        else if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_DEPARTMENT_HEAD.name(),account)){
            Optional<DepartmentUser> userOptional=deptRepo.findByAccount(account);
            DepartmentUser user=userOptional.orElse(new DepartmentUser());
            List<ClearanceResponse> clResponse=clResponseRepo.findByResponsedBy(user);
            return clResponse;
        }
        else if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_PROCTOR.name(), account)){
        Optional<Proctor> userOptional=proRepo.findByAccount(account);
        Proctor user=userOptional.orElse(new Proctor());
        List<ClearanceResponse> clResponse=clResponseRepo.findByResponsedBy(user);
        return clResponse;
        }
        else {
            return null;
        }
    }
    public List<ResponseDto> getResponseDetails(Account account){
        Optional<Student> userOptional=studentRepo.findByAccount(account);
        Student user=userOptional.orElse(new Student());
        List<ClearanceRequest> requsts=clRequestRepo.findByRequestedBy(user);
        if(requsts.size()>0){
            ClearanceRequest clRequest=requsts.get(0);
            List<ClearanceResponse> clResponses=clResponseRepo.findByClearanceRequest(clRequest);
            List<ResponseDto> responseDetails=new ArrayList<>();
            for(ClearanceResponse response:clResponses){
                responseDetails.add(new ResponseDto(response));
            }
            return responseDetails;
        }
        return null;
    }
    public ClearanceResponse findResponsebyId(Long responseId) {
        Optional<ClearanceResponse> responseOptional=clResponseRepo.findById(responseId);
        return responseOptional.orElse(new ClearanceResponse());
    }
    public ClearanceResponse updateClearanceResponse(ClearanceResponse clResponse) {
    clResponse.setResponseDate(LocalDate.now());
      return clResponseRepo.save(clResponse);
    }
    public ResponseDto responseDetailsById(Long responseId){
      Optional <ClearanceResponse> responseOptional=clResponseRepo.findById(responseId);
      ClearanceResponse response=responseOptional.orElse(new ClearanceResponse());
      return new ResponseDto(response);
    }
    public List<ResponseDto> responseDetailsByClearanceRequest(Long requestId){
        Optional<ClearanceRequest> requestOptional=clRequestRepo.findById(requestId);
        ClearanceRequest request=requestOptional.orElse(new ClearanceRequest());
        List<ClearanceResponse> responses=clResponseRepo.findByClearanceRequest(request);
        List<ResponseDto> responseDtos=new ArrayList<>();
        for(ClearanceResponse response:responses){
            responseDtos.add(new ResponseDto(response));
        }
        return responseDtos;
    }
}

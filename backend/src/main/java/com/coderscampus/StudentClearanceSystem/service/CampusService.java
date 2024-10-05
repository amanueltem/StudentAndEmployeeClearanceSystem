package com.coderscampus.StudentClearanceSystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coderscampus.StudentClearanceSystem.domain.Campus;
import com.coderscampus.StudentClearanceSystem.repository.CampusRepository;

@Service
public class CampusService {
    @Autowired
    private CampusRepository campusRepo;
    public List<Campus> findAllCampuses(){
        return campusRepo.findAll();
    }
}

package com.coderscampus.StudentClearanceSystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coderscampus.StudentClearanceSystem.domain.Authority;
import com.coderscampus.StudentClearanceSystem.repository.AuthorityRepository;

@Service
public class AuthorityService {
   @Autowired
   private AuthorityRepository authRepo;
   public Authority saveAuthority(Authority auth){
    return authRepo.save(auth);
   } 
}

package com.coderscampus.StudentClearanceSystem.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.coderscampus.StudentClearanceSystem.domain.Account;
import com.coderscampus.StudentClearanceSystem.domain.Proctor;



public interface ProctorRepository  extends JpaRepository<Proctor,Long>{
  
    List<Proctor> findByPosition(String position);
    Optional<Proctor> findByAccount(Account account);
}

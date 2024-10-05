package com.coderscampus.StudentClearanceSystem.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.coderscampus.StudentClearanceSystem.domain.Account;
import com.coderscampus.StudentClearanceSystem.domain.Proctor;



public interface ProctorRepository  extends JpaRepository<Proctor,Long>{
    @Query("SELECT s FROM  Proctor s WHERE s.email=?1")
    Optional<Proctor> findCampusUserByEmail(String email);
    List<Proctor> findByPosition(String position);
    Optional<Proctor> findByAccount(Account account);
}

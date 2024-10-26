package com.coderscampus.StudentClearanceSystem.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coderscampus.StudentClearanceSystem.domain.Account;



public interface AccountRepository extends JpaRepository<Account,Long> {
    public Optional<Account> findByUsername(String usernmae);
    public Optional<Account> findByEmail(String email);
   
}

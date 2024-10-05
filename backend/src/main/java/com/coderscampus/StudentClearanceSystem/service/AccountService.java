package com.coderscampus.StudentClearanceSystem.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coderscampus.StudentClearanceSystem.domain.Account;
import com.coderscampus.StudentClearanceSystem.repository.AccountRepository;


@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepo;
    public Optional<Account> findUserByUsername(String username){
        return accountRepo.findByUsername(username);
    }
    public Account saveAccount(Account account){
        Optional<Account> accountOptional = accountRepo.findByUsername(account.getUsername());
        try{
        if (accountOptional.isPresent()) {
            // If a student with the email exists, throw an exception with a custom message
            throw new IllegalStateException("Email already taken");
        }
        return accountRepo.save(account);
    }
    catch(Exception e){
        throw new IllegalStateException("Email already taken", e);
    }

        
    }
}

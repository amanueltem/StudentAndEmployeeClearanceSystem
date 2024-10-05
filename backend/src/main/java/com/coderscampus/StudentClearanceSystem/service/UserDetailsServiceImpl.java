package com.coderscampus.StudentClearanceSystem.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.coderscampus.StudentClearanceSystem.domain.Account;
import com.coderscampus.StudentClearanceSystem.repository.AccountRepository;



@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private AccountRepository accountRepo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Account> userOpt=accountRepo.findByUsername(username);
        return userOpt.orElseThrow(()->new UsernameNotFoundException("invalid credentials"));
    }
    
}

package com.coderscampus.StudentClearanceSystem.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.coderscampus.StudentClearanceSystem.domain.Account;
import com.coderscampus.StudentClearanceSystem.domain.PasswordResetToken;
import com.coderscampus.StudentClearanceSystem.repository.AccountRepository;
import com.coderscampus.StudentClearanceSystem.repository.PasswordResetTokenRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private  final AccountRepository accountRepo;
    private  final PasswordResetTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Account> userOpt = accountRepo.findByUsername(username);
        return userOpt.orElseThrow(() -> new UsernameNotFoundException("Invalid credentials"));
    }
    
    public Account findByUsername(String username) {
        return accountRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }

    public void updatePassword(Account account, String newPassword) {
        account.setPassword(passwordEncoder.encode(newPassword));
        accountRepo.save(account);
    }
    
    public PasswordResetToken createPasswordResetTokenForUser(Account user) {
        String token = UUID.randomUUID().toString();
        PasswordResetToken passwordResetToken = new PasswordResetToken(token, LocalDateTime.now().plusHours(1), user);
        return tokenRepository.save(passwordResetToken);
    }
    
    public PasswordResetToken getPasswordResetToken(String token) {
        return tokenRepository.findByToken(token)
                .orElseThrow(() -> new IllegalStateException("Invalid or expired token"));
    }

    public String generatePasswordResetToken(String username) {
        Account account = accountRepo.findByEmail(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        PasswordResetToken presetToken=tokenRepository.findByAccount(account).orElse(null);
        if(presetToken!=null)
        tokenRepository.delete(presetToken);
        return createPasswordResetTokenForUser(account).getToken(); // Return the token as a String
    }
    
    // New method to reset password using the token
    public void resetPasswordWithToken(String token, String newPassword) {
        PasswordResetToken passwordResetToken = getPasswordResetToken(token); // Validate the token

        if (passwordResetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
              tokenRepository.delete(passwordResetToken); 
            throw new IllegalStateException("Token has expired");
        }

        Account account = passwordResetToken.getAccount();
        updatePassword(account, newPassword); // Update the user's password
        tokenRepository.delete(passwordResetToken); // Optionally delete the token after use
    }
}


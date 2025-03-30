package com.coderscampus.StudentClearanceSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity; // Add this import
import org.springframework.web.bind.annotation.*;
import com.coderscampus.StudentClearanceSystem.service.*;

import lombok.RequiredArgsConstructor;

import com.coderscampus.StudentClearanceSystem.domain.Account;
import com.coderscampus.StudentClearanceSystem.domain.PasswordResetToken; // Corrected import
import java.util.Map;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class PasswordResetController {

    private final UserDetailsServiceImpl userDetailsService;
    private final EmailService emailService;
    private final AccountService accountService;
    private final PasswordEncoder passwordEncoder;
    private final String baseUrl;
    
   @PostMapping("/forgot-password")
    public String forgotPassword(@RequestParam("email") String email) {
        String token = userDetailsService.generatePasswordResetToken(email);
        System.out.println("\n\n\n\n\n..................................token=" + token);
        System.out.println(email);

        String resetUrl = baseUrl + "/reset-password?token=" + token;

        emailService.sendEmail(email, "Password Reset Request", 
            "To reset your password, please click the link below:\n The link will be expired within one hour.\n\n" + resetUrl);
        
        return "Password reset email sent successfully";
    }

  @PostMapping("/reset-password")
public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestBody Map<String, String> requestBody) {
    String password = requestBody.get("password"); // Get the password from the request body
    
    if (password == null) {
        return ResponseEntity.badRequest().body("Password is required.");
    }
    
    userDetailsService.resetPasswordWithToken(token, password); // Ensure this method exists in your service

    return ResponseEntity.ok("Password has been reset successfully.");
}

    @PostMapping("/reset_default")
    public ResponseEntity<Account> resetDefault(@AuthenticationPrincipal Account account
    ,@RequestBody String password){
        System.out.println("\n\n\n "+password);
        account.setIsDefault(false);
        account.setPassword(passwordEncoder.encode(password));
       return ResponseEntity.ok(accountService.resetDefault(account));
    }
}
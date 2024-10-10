package com.coderscampus.StudentClearanceSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity; // Add this import
import org.springframework.web.bind.annotation.*;
import com.coderscampus.StudentClearanceSystem.service.*;
import com.coderscampus.StudentClearanceSystem.domain.PasswordResetToken; // Corrected import
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class PasswordResetController {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestParam("email") String email) {
    
        String token = userDetailsService.generatePasswordResetToken(email);
        String resetUrl = "http://localhost:3000/reset-password?token=" + token;

        emailService.sendEmail(email, "Password Reset Request", 
            "To reset your password, please click the link below:\n The link will be expired with in one Hour.\n\n" + resetUrl);
        
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

    
}

package com.coderscampus.StudentClearanceSystem.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.coderscampus.StudentClearanceSystem.domain.Account;
import com.coderscampus.StudentClearanceSystem.repository.AccountRepository;
import com.coderscampus.StudentClearanceSystem.dto.AuthCredentialsRequest;
import com.coderscampus.StudentClearanceSystem.util.JwtService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtUtil;
    private final AccountRepository accountRepo;
    
@PostMapping("login")
public ResponseEntity<?> login(@RequestBody AuthCredentialsRequest request) {
    log.info("Login attempt for username: {}", request.getUsername()); // Log username attempt
    
    // Check if the username exists before authenticating
    if (!accountRepo.findByUsername(request.getUsername()).isPresent()) {
        log.warn("Username not found: {}", request.getUsername());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username.");
    }

    try {
        Authentication authenticate = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        Account user = (Account) authenticate.getPrincipal();
        String token = jwtUtil.generateToken(user);

        return ResponseEntity.ok()
            .header(HttpHeaders.AUTHORIZATION, token)
            .body(user);

    } catch (BadCredentialsException ex) {
        log.warn("Invalid password for user: {}", request.getUsername());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password.");
    } catch (Exception ex) {
        log.error("Unexpected error during authentication", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred. Please try again.");
    }
}


    @GetMapping("validate")
    public ResponseEntity<?> validateToken(@RequestParam String token, @AuthenticationPrincipal Account user) {
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token or user not authenticated.");
        }
        boolean isTokenValid = jwtUtil.isTokenValid(token, user);
        return ResponseEntity.ok(isTokenValid);
    }
}

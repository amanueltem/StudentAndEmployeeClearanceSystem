package com.coderscampus.StudentClearanceSystem.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.coderscampus.StudentClearanceSystem.domain.Account;
import com.coderscampus.StudentClearanceSystem.dto.AuthCredentialsRequest;
import com.coderscampus.StudentClearanceSystem.util.JwtUtil;


@RestController
@RequestMapping("/api/auth")

public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;
    @PostMapping("login")
    public ResponseEntity<?>login(@RequestBody AuthCredentialsRequest request){
        
        try{
            Authentication authenticate=authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken
                (request.getUsername(), request.getPassword())
            );
            Account user=(Account) authenticate.getPrincipal();
            user.setPassword(null);
            return ResponseEntity.ok()
            .header(HttpHeaders.AUTHORIZATION,
            jwtUtil.generateToken(user))
            .body(user);

        }
        catch(BadCredentialsException ex){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    @GetMapping("validate")
    public ResponseEntity<?> validateToken(@RequestParam String token,
    @AuthenticationPrincipal Account user){
        Boolean isTokenValid=jwtUtil.validateToken(token, user);
        return ResponseEntity.ok(isTokenValid);
    }


}

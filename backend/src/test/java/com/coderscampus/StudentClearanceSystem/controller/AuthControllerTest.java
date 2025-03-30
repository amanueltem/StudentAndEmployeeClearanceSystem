package com.coderscampus.StudentClearanceSystem.controller;

import com.coderscampus.StudentClearanceSystem.domain.Account;
import com.coderscampus.StudentClearanceSystem.dto.AuthCredentialsRequest;
import com.coderscampus.StudentClearanceSystem.util.JwtService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AuthControllerTest {

    @InjectMocks
    private AuthController authController;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtService jwtUtil;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLogin_Success() {
        // Arrange
       AuthCredentialsRequest request = new AuthCredentialsRequest();
request.setUsername("username");
request.setPassword("password");
        Account user = new Account(); // Initialize with necessary data
        user.setPassword("password"); // Just a placeholder, will be set to null later
        
        Authentication authentication = mock(Authentication.class);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(user);
        when(jwtUtil.generateToken(user)).thenReturn("jwt-token");

        // Act
        ResponseEntity<?> response = authController.login(request);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("jwt-token", response.getHeaders().getFirst(HttpHeaders.AUTHORIZATION));
        assertEquals(user, response.getBody());
    }

    @Test
    void testLogin_BadCredentials() {
        // Arrange
            AuthCredentialsRequest request = new AuthCredentialsRequest();
request.setUsername("username");
request.setPassword("password");
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new BadCredentialsException("Bad credentials"));

        // Act
        ResponseEntity<?> response = authController.login(request);

        // Assert
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }

    @Test
    void testValidateToken_Success() {
        // Arrange
        String token = "valid-token";
        Account user = new Account(); // Initialize the account as necessary
        when(jwtUtil.isTokenValid(token, user)).thenReturn(true);

        // Act
        ResponseEntity<?> response = authController.validateToken(token, user);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(true, response.getBody());
    }

    // Additional tests can be added for edge cases and failure scenarios
}

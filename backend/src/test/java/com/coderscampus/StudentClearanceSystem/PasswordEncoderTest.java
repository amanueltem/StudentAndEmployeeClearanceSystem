package com.coderscampus.StudentClearanceSystem;

import org.junit.jupiter.api.Test;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


public class PasswordEncoderTest {
    private final PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
    @Test
    public void encode_password(){
       
        System.out.println("\n\n\n*************************************");
        System.out.println(passwordEncoder.matches("asdfasdf", "$2a$10$TgKn8KXgW1Rf.B6hBzJ5meh07T4/8wPJxGjJQsR0TuR5uwPtOnbOm"));
    }
}

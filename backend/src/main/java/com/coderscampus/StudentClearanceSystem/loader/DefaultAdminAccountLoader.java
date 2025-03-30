package com.coderscampus.StudentClearanceSystem.loader;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.coderscampus.StudentClearanceSystem.domain.Account;
import com.coderscampus.StudentClearanceSystem.domain.Authority;
import com.coderscampus.StudentClearanceSystem.enums.AuthorityEnum;
import com.coderscampus.StudentClearanceSystem.repository.AccountRepository;
import com.coderscampus.StudentClearanceSystem.repository.AuthorityRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DefaultAdminAccountLoader implements CommandLineRunner {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthorityRepository authorityRepository;

    // Static block to load the .env file and get the values
    private static String adminUsername;
    private static String adminPassword;

    static {
        Dotenv dotenv = Dotenv.load();  // Load the .env file
        adminUsername = dotenv.get("DEFAULT_ADMIN");  // Get the DEFAULT_ADMIN value from .env file
        adminPassword = dotenv.get("DEFAULT_PASSWORD");  // Get the DEFAULT_PASSWORD value from .env file
    }

    @Override
    public void run(String... args) {
        if (accountRepository.count() == 0) {
            Account adminAccount = Account.builder()
                .username(adminUsername)  // Use value from .env file
                .password(passwordEncoder.encode(adminPassword))  // Securely hash password from .env file
                .isDefault(false)  // If `isDefault` is a String field
                .build();

            accountRepository.save(adminAccount);

            Authority authority = Authority.builder()
                .authority(AuthorityEnum.ROLE_ADMIN.name())
                .user(adminAccount)
                .build();
            authorityRepository.save(authority);

            System.out.println("Admin account created successfully.");
        } else {
            System.out.println("Admin account already exists. Skipping creation.");
        }
    }
}


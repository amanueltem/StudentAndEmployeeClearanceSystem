package com.coderscampus.StudentClearanceSystem.domain;


import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class PasswordResetToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String token;
    private LocalDateTime expiryDate;

    @OneToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private Account account;

    // Default constructor
    public PasswordResetToken() {}

    // Parameterized constructor
    public PasswordResetToken(String token, LocalDateTime expiryDate, Account account) {
        this.token = token;
        this.expiryDate = expiryDate;
        this.account = account;
    }

    // Getters
    public Long getId() { return id; }
    public String getToken() { return token; }
    public LocalDateTime getExpiryDate() { return expiryDate; }
    public Account getAccount() { return account; }

    // Setters
    public void setToken(String token) { this.token = token; }
    public void setExpiryDate(LocalDateTime expiryDate) { this.expiryDate = expiryDate; }
    public void setAccount(Account account) { this.account = account; }

    // Override toString() for better logging
    @Override
    public String toString() {
        return "PasswordResetToken{" +
                "id=" + id +
                ", token='" + token + '\'' +
                ", expiryDate=" + expiryDate +
                ", account=" + account +
                '}';
    }

    // Check if the token is expired
    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expiryDate);
    }
}

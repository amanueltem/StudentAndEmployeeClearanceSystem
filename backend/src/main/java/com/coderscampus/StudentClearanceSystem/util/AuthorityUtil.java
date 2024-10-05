package com.coderscampus.StudentClearanceSystem.util;

import com.coderscampus.StudentClearanceSystem.domain.Account;

public class AuthorityUtil {
    public static Boolean hasRole(String role, Account user) {
        return user.getAuthorities()
                .stream()
                .filter(auth -> auth.getAuthority().equals(role))
                .count() > 0;
    }
}

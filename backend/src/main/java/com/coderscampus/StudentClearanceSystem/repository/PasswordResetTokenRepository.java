package com.coderscampus.StudentClearanceSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.coderscampus.StudentClearanceSystem.domain.PasswordResetToken;
import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
}

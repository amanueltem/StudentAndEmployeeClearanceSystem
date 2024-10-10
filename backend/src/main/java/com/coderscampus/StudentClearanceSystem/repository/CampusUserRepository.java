package com.coderscampus.StudentClearanceSystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.coderscampus.StudentClearanceSystem.domain.Account;
import com.coderscampus.StudentClearanceSystem.domain.CampusUser;

public interface CampusUserRepository extends JpaRepository<CampusUser,Long> {
    @Query("SELECT s FROM  CampusUser s WHERE s.email=?1")
    Optional<CampusUser> findByEmail(String email);
    List<CampusUser> findByPosition(String position);
    Optional<CampusUser> findByAccount(Account account);
}
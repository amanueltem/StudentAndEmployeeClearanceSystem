package com.coderscampus.StudentClearanceSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coderscampus.StudentClearanceSystem.domain.*;
import java.util.Optional;

public interface UserRepository  extends JpaRepository<User,Long>{
   public Optional<User> findUserByAccount(Account account);
}

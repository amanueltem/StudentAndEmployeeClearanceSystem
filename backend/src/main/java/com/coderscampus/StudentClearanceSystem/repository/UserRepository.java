package com.coderscampus.StudentClearanceSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coderscampus.StudentClearanceSystem.domain.User;

public interface UserRepository  extends JpaRepository<User,Long>{
   
}
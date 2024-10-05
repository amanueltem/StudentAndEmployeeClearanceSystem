package com.coderscampus.StudentClearanceSystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coderscampus.StudentClearanceSystem.domain.ClearanceRequest;
import com.coderscampus.StudentClearanceSystem.domain.ClearanceResponse;
import com.coderscampus.StudentClearanceSystem.domain.User;

public interface ClearanceResponseRepository extends JpaRepository<ClearanceResponse,Long>{
    public List<ClearanceResponse> findByResponsedBy(User responsedBy);
    public List<ClearanceResponse> findByClearanceRequest(ClearanceRequest clearanceRequest);
}

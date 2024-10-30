package com.coderscampus.StudentClearanceSystem.dto;

import com.coderscampus.StudentClearanceSystem.domain.Block;
import com.coderscampus.StudentClearanceSystem.domain.Department;

import lombok.Data;
@Data
public class EmployeeDto {
    private String fname;
    private String mname;
    private String lname;
    private String email;
    private String gender;
    private Integer phoneNumber;
    private Department department;

}

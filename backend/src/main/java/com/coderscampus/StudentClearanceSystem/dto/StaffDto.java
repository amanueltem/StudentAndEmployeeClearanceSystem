package com.coderscampus.StudentClearanceSystem.dto;

import com.coderscampus.StudentClearanceSystem.domain.Block;
import com.coderscampus.StudentClearanceSystem.domain.Campus;
import com.coderscampus.StudentClearanceSystem.domain.College;
import com.coderscampus.StudentClearanceSystem.domain.Department;

import lombok.Data;
@Data
public class StaffDto {
    private String fname;
    private String mname;
    private String lname;
    private String email;
    private String gender;
    private Integer phoneNumber;
    private Block block;
    private Campus campus;
    private College college;
    private Department department;
    private String roleName;
}

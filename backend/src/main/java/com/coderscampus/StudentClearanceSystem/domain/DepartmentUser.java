package com.coderscampus.StudentClearanceSystem.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class DepartmentUser extends User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Department department;
    public Long getId(){
        return id;
    }
    public Department getDepartment(){
        return department;
    }
    public void setId(Long id){
        this.id=id;
    }
    public void setDepartment(Department department){
        this.department=department;
    }
}

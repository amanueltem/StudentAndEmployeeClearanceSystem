package com.coderscampus.StudentClearanceSystem.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

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

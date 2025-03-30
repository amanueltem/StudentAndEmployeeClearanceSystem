package com.coderscampus.StudentClearanceSystem.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class CollegeUser  extends User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private College college;
    public Long getId(){
        return id;
    }
    public College getCollege(){
        return college;
    }

    public void setId(Long id){
        this.id=id;
    }
    public void setCollege(College college){
        this.college=college;
    }
}

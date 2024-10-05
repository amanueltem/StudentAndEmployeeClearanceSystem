package com.coderscampus.StudentClearanceSystem.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

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

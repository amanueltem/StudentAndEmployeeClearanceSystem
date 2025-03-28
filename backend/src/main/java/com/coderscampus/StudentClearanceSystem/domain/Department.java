package com.coderscampus.StudentClearanceSystem.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Department {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Integer finalYear;
    @ManyToOne(optional = false)
    private College college;
     
    public void setId(Long id){
        this.id=id;
    }
    public void setName(String name){this.name=name;}
    public void setCollege(College college){this.college=college;}
    public void setFinalYear(Integer finalYear){this.finalYear=finalYear;}
    
    public Long getId(){return id;}
    public String getName(){return name;}
    public College getCollege(){return college;}
    public Integer getFinalYear(){return finalYear;}
}

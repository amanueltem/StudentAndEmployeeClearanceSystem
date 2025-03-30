package com.coderscampus.StudentClearanceSystem.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class CampusUser extends User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Campus campus;
    public Long getId(){
        return id;
    }
    public Campus getCampus(){
        return campus;
    }
    public void setId(Long id){
        this.id=id;
    }
    public void setCampus(Campus campus){
        this.campus=campus;
    }
    
}

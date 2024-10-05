package com.coderscampus.StudentClearanceSystem.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

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

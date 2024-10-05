package com.coderscampus.StudentClearanceSystem.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Student extends DepartmentUser {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer year;
    private  Integer semister;
    private  Integer roomNo;
    @ManyToOne
    private Block block;

    public void setBlock(Block block){this.block=block;}
    public void setRoomNo(Integer roomNo){
        this.roomNo=roomNo;
    }
    public void setId(Long id){this.id=id;}
    public void setYear(Integer year){this.year=year;}
    public void setSemister(Integer semister){this.semister=semister;}

    public Long getId(){return id;}
    public Integer getYear(){return year;}
    public Integer getSemister(){return semister;}
    public Integer getRoomNo(){
        return roomNo;
    }
    public Block getBlock(){return block;}
}

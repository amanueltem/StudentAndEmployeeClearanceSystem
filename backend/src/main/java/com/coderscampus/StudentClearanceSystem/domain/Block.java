package com.coderscampus.StudentClearanceSystem.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Block {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Integer blockNo;
    @ManyToOne(optional = false)
    private Campus campus;
    public void setId(Long id){
        this.id=id;
    }
    public void setName(String name){this.name=name;}
    public void setBlockNo(Integer blockNo){
        this.blockNo=blockNo;
    }
    public void setCampus(Campus campus){
        this.campus=campus;
    }
    public Integer getBlockNo(){return blockNo;}

    public Long getId(){return id;}
    public String getName(){return name;}
    public Campus getCampus(){return campus;}
}

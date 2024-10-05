package com.coderscampus.StudentClearanceSystem.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class College {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ManyToOne(optional = false)
    private Campus campus;

    public void setId(Long id){this.id=id;}
    public void setName(String name){this.name=name;}
    public void setCampus(Campus campus){this.campus=campus;}


    public Long getId(){return id;}
    public String getName(){return name;}
    public Campus getCampus(){return campus;}

}

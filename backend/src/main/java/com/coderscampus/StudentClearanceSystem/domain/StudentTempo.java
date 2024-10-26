package com.coderscampus.StudentClearanceSystem.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;


import lombok.Data;

@Entity
@Data
public class StudentTempo{
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
     private String studentId;
    private String fname;
    private String mname;
    private String lname;
    private String email;
    private String gender;
    private Integer phoneNumber;
    private Integer year;
    private Integer semister;
    private Integer roomNo;
    @ManyToOne
    private Block block;
    @ManyToOne
    private Department department;
}

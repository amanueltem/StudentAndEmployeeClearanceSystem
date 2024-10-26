package com.coderscampus.StudentClearanceSystem.domain;

import javax.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "student_tempo", uniqueConstraints = {
    @UniqueConstraint(columnNames = "email"),
    @UniqueConstraint(columnNames = "studentId")
})
public class StudentTempo {
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
    private Integer semister; // Fixed spelling
    private Integer roomNo;

    @ManyToOne
    private Block block;

    @ManyToOne
    private Department department;
}

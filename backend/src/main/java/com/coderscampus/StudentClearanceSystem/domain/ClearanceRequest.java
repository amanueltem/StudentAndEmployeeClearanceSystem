package com.coderscampus.StudentClearanceSystem.domain;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
@Entity
public class ClearanceRequest {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate requestedDate;
    @ManyToOne(optional = false)
    private Student requestedBy;
    private String requestedReason;
    private String status;

    public Long getId(){return id;}
    public LocalDate getRequestedDate(){return requestedDate;}
    public String getRequestedReason(){return requestedReason;}
    public Student getRequestedBy(){
        return requestedBy;
    }
    public String getStatus(){
        return status;
    }
    public void setId(Long id){this.id=id;}
    public void setRequestedDate(LocalDate requestedDate){this.requestedDate=requestedDate;}
    public void setRequestedReason(String requestedReason){this.requestedReason=requestedReason;}
    public void setRequestedBy(Student requestedBy){
        this.requestedBy=requestedBy;
    }
    public void setStatus(String status){
        this.status=status;
    }
}

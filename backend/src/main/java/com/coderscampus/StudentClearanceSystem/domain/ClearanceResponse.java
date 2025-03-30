package com.coderscampus.StudentClearanceSystem.domain;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;




@Entity
public class ClearanceResponse {
    
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate responseDate;
    private String  responseInfo;
     @ManyToOne
    private ClearanceRequest clearanceRequest;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User responsedBy;
    private String status="pending";

    public void setId(Long id){this.id=id;}
    public void setResponseDate(LocalDate responsDate){this.responseDate=responsDate;}
    public void setResponseInfo(String responseInfo){this.responseInfo=responseInfo;}
    public void setClearanceRequest(ClearanceRequest clearanceRequest){this.clearanceRequest=clearanceRequest;}
    public void setResponsedBy(User responsedBy){this.responsedBy=responsedBy;}
    public void setStatus(String status){this.status=status;}

    public Long getId(){return id;}
    public LocalDate getResponseDate(){return responseDate;}
    public String getResponseInfo(){return responseInfo;}
    public ClearanceRequest getClearanceRequest(){return clearanceRequest;}
    public User getResponsedBy(){return responsedBy;}
    public String getStatus(){return status;}
}

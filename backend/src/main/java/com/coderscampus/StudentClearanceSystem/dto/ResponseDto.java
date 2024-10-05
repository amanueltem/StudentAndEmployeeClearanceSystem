package com.coderscampus.StudentClearanceSystem.dto;

import java.time.LocalDate;



import com.coderscampus.StudentClearanceSystem.domain.ClearanceResponse;


public class ResponseDto {
 private Long id;   
 private String fname;
 private String mname;
 private String lname;
 private LocalDate requestedDate;
 private LocalDate responseDate;
 private String responseInfo;
 private String status;
 private Integer phoneNumber;
 private String position;

    public ResponseDto(ClearanceResponse clResponse){
        id=clResponse.getId();
        fname=clResponse.getResponsedBy().getFname();
        mname=clResponse.getResponsedBy().getMname();
        lname=clResponse.getResponsedBy().getLname();
        requestedDate=clResponse.getClearanceRequest().getRequestedDate();
        responseDate=clResponse.getResponseDate();
        responseInfo=clResponse.getResponseInfo();
        status=clResponse.getStatus();
        phoneNumber=clResponse.getResponsedBy().getPhoneNumber();
        position=clResponse.getResponsedBy().getPostion();
    }
 public Long getId(){return id;}
 public String getFname(){return fname;}
 public String getMname(){return mname;}
 public String getLname(){return lname;}
 public LocalDate getRequestedDate(){return requestedDate;}
 public LocalDate getResponseDate(){return responseDate;}
 public String getResponseInfo(){return responseInfo;}
 public String getStatus(){return status;}
 public Integer getPhoneNumber(){return phoneNumber;}
 public String getPosition(){return position;}
}

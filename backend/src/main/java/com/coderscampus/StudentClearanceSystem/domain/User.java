package com.coderscampus.StudentClearanceSystem.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;


@Entity
@Table(name = "users")
public class User {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fname;
    private String mname;
    private String lname;
    private String email;
    private Boolean gender;
    private Integer phoneNumber;
    private String position;
    @OneToOne(optional =true)
    private Account account;
    public void setId(Long id){this.id=id;}
    public void setFname(String fname){this.fname=fname;}
    public void setMname(String mname){this.mname=mname;}
    public void setLname(String lname){this.lname=lname;}
    public void setEmail(String email){this.email=email;}
    public void setGender(Boolean gender){this.gender=gender;}
    public void setPhoneNumber(Integer phoneNumber){this.phoneNumber=phoneNumber;}
    public void setAccount(Account account){this.account=account;}
    public void setPosition(String position){
        this.position=position;
    }
  
    public String getFname(){return fname;}
    public String getMname(){return mname;}
    public String getLname(){return lname;}
    public String getEmail(){return email;}
    public Boolean getGender(){return gender;}
    public Integer getPhoneNumber(){return phoneNumber;}
    public Account getAccount(){return account;}
    public String getPostion(){return position;}
}

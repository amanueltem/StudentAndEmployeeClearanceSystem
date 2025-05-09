package com.coderscampus.StudentClearanceSystem.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fname;
    private String mname;
    private String lname;

    private String gender;
    private Integer phoneNumber;
    private String position;

    @OneToOne(optional = false, cascade = CascadeType.REMOVE)
    private Account account;

    // Getters
    public Long getId() {
        return id;
    }

    public String getFname() {
        return fname;
    }

    public String getMname() {
        return mname;
    }

    public String getLname() {
        return lname;
    }

  

    public String getGender() {
        return gender;
    }

    public Integer getPhoneNumber() {
        return phoneNumber;
    }

    public Account getAccount() {
        return account;
    }

    public String getPosition() {
        return position;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public void setMname(String mname) {
        this.mname = mname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

 

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setPhoneNumber(Integer phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public void setPosition(String position) {
        this.position = position;
    }
}

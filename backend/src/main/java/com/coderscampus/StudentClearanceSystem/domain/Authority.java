package com.coderscampus.StudentClearanceSystem.domain;



import org.springframework.security.core.GrantedAuthority;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity

public class Authority implements GrantedAuthority{
    private static final long serialVersionUID=-6520881827973629031L;
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String authority;
    @ManyToOne(optional = false)
    private Account account;

    public Authority(){

    }

    public Authority(String authority){
        this.authority=authority;
    }

    //getters
    public Long getId(){return id;}
    public String getAuthority(){return authority;}
    public Account getUser(){return account;}
    //setters
    public void setId(Long id){this.id=id;}
    public void setAuthority(String authority){this.authority=authority;}
    public void setUser(Account user){this.account=user;}
}

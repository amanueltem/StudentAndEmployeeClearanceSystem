package com.coderscampus.StudentClearanceSystem.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Proctor extends User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 
    @ManyToOne
    private Block block;
    public Long getId(){return id;}
    public Block getBlock(){return block;}
    public void setId(Long id){
        this.id=id;
    }
    public void setBlock(Block block){
        this.block=block;
    }
}

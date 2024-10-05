package com.coderscampus.StudentClearanceSystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coderscampus.StudentClearanceSystem.domain.Account;
import com.coderscampus.StudentClearanceSystem.domain.Block;
import com.coderscampus.StudentClearanceSystem.domain.CollegeUser;
import com.coderscampus.StudentClearanceSystem.repository.BlockRepository;
import com.coderscampus.StudentClearanceSystem.repository.CollegeUserRepository;
@Service
public class BlockService {
@Autowired
private BlockRepository blockRepo;
@Autowired
private CollegeUserRepository cuRepo;
public List<Block> findAllBlocks(){
    return blockRepo.findAll();
}
public List<Block> findBlocksInCampus(Account account) {
    Optional<CollegeUser> userOptional=cuRepo.findByAccount(account);
    CollegeUser user=userOptional.orElse(new CollegeUser());
    return blockRepo.findByCampus(user.getCollege().getCampus());
}
}

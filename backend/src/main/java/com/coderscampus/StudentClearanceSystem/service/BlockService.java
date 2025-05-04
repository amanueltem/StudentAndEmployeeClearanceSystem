package com.coderscampus.StudentClearanceSystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

import com.coderscampus.StudentClearanceSystem.domain.*;
import com.coderscampus.StudentClearanceSystem.service.CampusService;
import com.coderscampus.StudentClearanceSystem.repository.BlockRepository;
import com.coderscampus.StudentClearanceSystem.repository.CollegeUserRepository;
import lombok.*;
@Service
@RequiredArgsConstructor
public class BlockService {
private  final BlockRepository blockRepo;
private final CollegeUserRepository cuRepo;
private final CampusService campusService;
public List<Block> findAllBlocks(){
    return blockRepo.findAll();
}
public List<Block> findBlocksInCampus(Account account) {
    Optional<CollegeUser> userOptional=cuRepo.findByAccount(account);
    CollegeUser user=userOptional.orElse(new CollegeUser());
    return blockRepo.findByCampus(user.getCollege().getCampus());
}


   public void loadBlockFromCSV(String blockCsvPath){
        if (blockRepo.count() > 0) {
            System.out.println("Block data already exists in the database.");
            return; 
        }
        
        try (BufferedReader br = new BufferedReader(new FileReader(blockCsvPath))) {
            String line;
            while ((line = br.readLine()) != null) {
                // Split the CSV line into name and campus_id
                String[] data = line.split(",");
                if (data.length == 3) {
                    String name = data[0].trim();  
                 
                    Integer blockNo=Integer.valueOf(data[1].trim());
                    Long campusId = Long.valueOf(data[2].trim());  // Trim any spaces from campus_id

                    
                    Campus campus= campusService.getCampusById(campusId);
                    if (campus == null) {
                        System.out.println("Campus ID " + campusId + " not found. Skipping Block: " + name+" 0"+blockNo);
                        continue;  
                    }

                    Block block=new Block();
                  
                    block.setName(name);
                    block.setBlockNo(blockNo);
                    block.setCampus(campus);
                    blockRepo.save(block);
                  
                } else {
                    System.out.println("Invalid line in CSV file: " + line);
                }
            }
        } catch (IOException e) {
            System.err.println("Error reading CSV file: " + e.getMessage());
            e.printStackTrace();
        }
        }
}

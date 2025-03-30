package com.coderscampus.StudentClearanceSystem.service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coderscampus.StudentClearanceSystem.domain.*;
import com.coderscampus.StudentClearanceSystem.repository.CollegeUserRepository;
import com.coderscampus.StudentClearanceSystem.repository.DepartmentRepository;
import com.coderscampus.StudentClearanceSystem.service.CollegeService;
import lombok.*;
@Service
@RequiredArgsConstructor
public class DepartmentService {
    private  final DepartmentRepository departmentRepo;
    private final  CollegeUserRepository cuRepo;
    private final CollegeService collegeService;
    public List<Department> findAllDepartments(){
        return departmentRepo.findAll();
    }
    public List<Department> findDepartmentsInCollege(Account account) {
        Optional<CollegeUser> userOptional=cuRepo.findByAccount(account);
        CollegeUser user=userOptional.orElse(new CollegeUser());
        return departmentRepo.findByCollege(user.getCollege());
    }
    
    
    public void loadDepartmentsFromCSV(String departmentCsvPath){
        if (departmentRepo.count() > 0) {
            System.out.println("Department data already exists in the database.");
            return; 
        }
        
        
        try (BufferedReader br = new BufferedReader(new FileReader(departmentCsvPath))) {
            String line;
            while ((line = br.readLine()) != null) {
                // Split the CSV line into name and campus_id
                String[] data = line.split(",");
                if (data.length == 3) {
                    String departmentName = data[0].trim();  // Trim any spaces from the college name
                    Integer finalYear=Integer.valueOf(data[1].trim());
                    Long collegeId = Long.valueOf(data[2].trim());  // Trim any spaces from campus_id

                    
                    College college = collegeService.getCollegeById(collegeId);
                    if (college == null) {
                        System.out.println("College ID " + collegeId + " not found. Skipping Department: " + departmentName);
                        continue;  
                    }

                    // Create a new College object and assign the campus
                    Department department = new Department();
                    department.setName(departmentName);
                    department.setFinalYear(finalYear);
                    department.setCollege(college);

                    // Save the college to the database
                    departmentRepo.save(department); // Use the repository's save method
                  
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

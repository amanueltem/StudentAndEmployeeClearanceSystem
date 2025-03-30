package com.coderscampus.StudentClearanceSystem.service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.coderscampus.StudentClearanceSystem.domain.College;
import com.coderscampus.StudentClearanceSystem.domain.Campus;
import com.coderscampus.StudentClearanceSystem.repository.CollegeRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CollegeService {

    private final CollegeRepository collegeRepo;
    private final CampusService campusService; // Inject CampusService

    // Method to load colleges from the CSV file
    public void loadCollegesFromCSV(String collegeCsvPath) {
        // Check if colleges already exist in the database
        if (collegeRepo.count() > 0) {
            System.out.println("College data already exists in the database.");
            return;  // Skip loading if college data already exists
        }

        try (BufferedReader br = new BufferedReader(new FileReader(collegeCsvPath))) {
            String line;
            while ((line = br.readLine()) != null) {
                // Split the CSV line into name and campus_id
                String[] data = line.split(",");
                if (data.length == 2) {
                    String collegeName = data[0].trim();  // Trim any spaces from the college name
                    Long campusId = Long.valueOf(data[1].trim());  // Trim any spaces from campus_id

                    // Fetch the campus entity by ID
                    Campus campus = campusService.getCampusById(campusId);
                    if (campus == null) {
                        System.out.println("Campus ID " + campusId + " not found. Skipping college: " + collegeName);
                        continue;  // Skip this line if the campus is not found
                    }

                    // Create a new College object and assign the campus
                    College college = new College();
                    college.setName(collegeName);
                    college.setCampus(campus);

                    // Save the college to the database
                    collegeRepo.save(college); // Use the repository's save method
                    System.out.println("College " + collegeName + " added successfully.");
                } else {
                    System.out.println("Invalid line in CSV file: " + line);
                }
            }
        } catch (IOException e) {
            System.err.println("Error reading CSV file: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Method to find all colleges
    public List<College> findAllColleges() {
        return collegeRepo.findAll();
    }
    
       public College getCollegeById(Long collegeId) {
        return collegeRepo.findById(collegeId).orElseThrow(() -> new RuntimeException("Campus not found"));
    }
}


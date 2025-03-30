package com.coderscampus.StudentClearanceSystem.service;

import com.coderscampus.StudentClearanceSystem.domain.Campus;
import com.coderscampus.StudentClearanceSystem.repository.CampusRepository;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;  // Import the exception
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.FileReader;
import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CampusService {

    private final CampusRepository campusRepo;

    // Method to find all campuses
    public List<Campus> findAllCampuses() {
        return campusRepo.findAll();
    }


    public Campus getCampusById(Long campusId) {
        return campusRepo.findById(campusId).orElseThrow(() -> new RuntimeException("Campus not found"));
    }
    // Method to load campuses from CSV
    public void loadCampusesFromCSV(String csvFilePath) throws IOException, CsvException {  // Declare CsvException in throws
        // Check if there are already campuses in the database
        if (campusRepo.count() > 0) {
            System.out.println("Campus data already exists in the database.");
            return;  // Don't proceed with loading if campuses already exist
        }

        // Create a CSVReader to read the campus.csv file
        try (CSVReader csvReader = new CSVReader(new FileReader(csvFilePath))) {
            List<String[]> records = csvReader.readAll();

            for (String[] record : records) {
                // Assuming the campus name is in the first column of the CSV
                String campusName = record[0].trim();
                if (!campusName.isEmpty()) {
                    Campus campus = new Campus();
                    campus.setName(campusName);
                    campusRepo.save(campus);  // Save campus to the database
                }
            }
        }
    }
}


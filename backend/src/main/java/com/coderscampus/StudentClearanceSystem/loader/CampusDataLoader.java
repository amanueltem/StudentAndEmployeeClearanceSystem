package com.coderscampus.StudentClearanceSystem.loader;

import com.coderscampus.StudentClearanceSystem.service.CampusService;
import com.opencsv.exceptions.CsvException;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CampusDataLoader implements CommandLineRunner {

    private final CampusService campusService;

    public CampusDataLoader(CampusService campusService) {
        this.campusService = campusService;
    }

    @Override
    public void run(String... args) throws IOException, CsvException {
        // Load the .env file
        Dotenv dotenv = Dotenv.load();  // Load the .env file
        
        // Get the campus CSV path from the .env file
        String csvFilePath = dotenv.get("CAMPUS_CSV_PATH");

        // Check if the path is null or empty
        if (csvFilePath == null || csvFilePath.isEmpty()) {
            throw new IllegalStateException("CSV file path not set in the environment variable.");
        }

        // Call the service to load campuses from CSV
        campusService.loadCampusesFromCSV(csvFilePath);
    }
}


package com.coderscampus.StudentClearanceSystem.loader;

import java.io.File;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.coderscampus.StudentClearanceSystem.service.CollegeService;
import io.github.cdimascio.dotenv.Dotenv;

@Component
public class CollegeDataLoader implements CommandLineRunner {
    private final CollegeService collegeService;

    public CollegeDataLoader(CollegeService collegeService) {
        this.collegeService = collegeService;
    }

    @Override
    public void run(String... args) {
        Dotenv dotenv = Dotenv.load();
        String collegeCsvPath = dotenv.get("COLLEGE_CSV_PATH");

        // Check if the CSV path is valid
        if (collegeCsvPath == null || collegeCsvPath.isEmpty()) {
            throw new IllegalStateException("CSV file path not set in the environment variable.");
        }

        File csvFile = new File(collegeCsvPath);

        if (!csvFile.exists()) {
            System.err.println("CSV file does not exist: " + collegeCsvPath);
            return;  // Early exit if the file doesn't exist
        }

        System.out.println("Loading colleges from CSV file: " + collegeCsvPath);
        try {
            collegeService.loadCollegesFromCSV(collegeCsvPath);
            System.out.println("Colleges loaded successfully.");
        } catch (Exception e) {
            System.err.println("Error loading colleges from CSV: " + e.getMessage());
        }
    }
}


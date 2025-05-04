package com.coderscampus.StudentClearanceSystem.loader;

import java.io.File;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.coderscampus.StudentClearanceSystem.service.CampusUserService;

import io.github.cdimascio.dotenv.Dotenv;

@Component
public class CampusUserDataLoader implements CommandLineRunner {
    private final CampusUserService campusUserService;
    public CampusUserDataLoader(CampusUserService campusUserService){
        this.campusUserService=campusUserService;
    }
    @Override
    public void run(String... args) {
        Dotenv dotenv = Dotenv.load();
        String campusUserCsvPath = dotenv.get("CAMPUSUSER_CSV_PATH");
          if (campusUserCsvPath== null || campusUserCsvPath.isEmpty()) {
            throw new IllegalStateException("CSV file path not set in the environment variable.");
        }

        File csvFile = new File(campusUserCsvPath);

        if (!csvFile.exists()) {
            System.err.println("CSV file does not exist: " + campusUserCsvPath);
            return;  // Early exit if the file doesn't exist
        }

        System.out.println("Loading Campus Users from CSV file: " + campusUserCsvPath);
        try {
            campusUserService.loadCampusUserFromCSV(campusUserCsvPath);
            System.out.println("Campus Users loaded successfully.");
        } catch (Exception e) {
            System.err.println("Error loading campusUsers from CSV: " + e.getMessage());
        }

    }
    
}

package com.coderscampus.StudentClearanceSystem.loader;

import java.io.File;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.coderscampus.StudentClearanceSystem.service.DepartmentService;

import io.github.cdimascio.dotenv.Dotenv;

@Component
public class DepartmentDataLoader implements CommandLineRunner {
    private final DepartmentService departmentService;
    public DepartmentDataLoader(DepartmentService departmentService){
        this.departmentService=departmentService;
    }
    @Override
    public void run(String... args) {
        Dotenv dotenv = Dotenv.load();
        String departmentCsvPath = dotenv.get("DEPARTMENT_CSV_PATH");
          if (departmentCsvPath== null || departmentCsvPath.isEmpty()) {
            throw new IllegalStateException("CSV file path not set in the environment variable.");
        }

        File csvFile = new File(departmentCsvPath);

        if (!csvFile.exists()) {
            System.err.println("CSV file does not exist: " + departmentCsvPath);
            return;  // Early exit if the file doesn't exist
        }

        System.out.println("Loading departments from CSV file: " + departmentCsvPath);
        try {
            departmentService.loadDepartmentsFromCSV(departmentCsvPath);
            System.out.println("Departments loaded successfully.");
        } catch (Exception e) {
            System.err.println("Error loading departments from CSV: " + e.getMessage());
        }

    }
    
}

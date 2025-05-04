package com.coderscampus.StudentClearanceSystem.loader;

import java.io.File;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.coderscampus.StudentClearanceSystem.service.BlockService;

import io.github.cdimascio.dotenv.Dotenv;

@Component
public class BlockDataLoader implements CommandLineRunner {
    private final BlockService blockService;
    public BlockDataLoader(BlockService blockService){
        this.blockService=blockService;
    }
    @Override
    public void run(String... args) {
        Dotenv dotenv = Dotenv.load();
        String blockCsvPath = dotenv.get("BLOCK_CSV_PATH");
          if (blockCsvPath== null || blockCsvPath.isEmpty()) {
            throw new IllegalStateException("CSV file path not set in the environment variable.");
        }

        File csvFile = new File(blockCsvPath);

        if (!csvFile.exists()) {
            System.err.println("CSV file does not exist: " + blockCsvPath);
            return;  // Early exit if the file doesn't exist
        }

        System.out.println("Loading blocks from CSV file: " + blockCsvPath);
        try {
            blockService.loadBlockFromCSV(blockCsvPath);
            System.out.println("Block loaded successfully.");
        } catch (Exception e) {
            System.err.println("Error loading block from CSV: " + e.getMessage());
        }

    }
    
}

package com.coderscampus.StudentClearanceSystem.util;
import java.util.Random;

public class IDGenerator {
    
    public static String generateID(String prefix) {
        // Create a Random object to generate random numbers
        Random random = new Random();

        // Generate a 6-digit random number
        int randomNumber = 100000 + random.nextInt(900000);

        // Get the last two digits of the current year
        int year = java.time.Year.now().getValue() % 100-8;

        // Return the formatted ID string
        return String.format("%s/%d/%02d", prefix, randomNumber, year);
    }
}


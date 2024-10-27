package com.coderscampus.StudentClearanceSystem.util;

import java.security.SecureRandom;

public class IDGenerator {

    public static String generateID(String prefix) {
        // Create a SecureRandom object for better randomness
        SecureRandom secureRandom = new SecureRandom();

        // Generate a 6-digit random number
        int randomNumber = 100000 + secureRandom.nextInt(900000);

        // Get the last two digits of the current year
        int year = java.time.Year.now().getValue() % 100-8;

        // Return the formatted ID string
        return String.format("%s/%d/%02d", prefix, randomNumber, year);
    }
}

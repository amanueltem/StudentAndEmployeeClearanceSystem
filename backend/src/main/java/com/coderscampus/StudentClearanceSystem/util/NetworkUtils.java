package com.coderscampus.StudentClearanceSystem.util;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Enumeration;
import java.util.regex.Pattern;

public class NetworkUtils {
    public static String getLocalIpAddress() {
        try {
            Enumeration<NetworkInterface> interfaces = NetworkInterface.getNetworkInterfaces();
            // Update pattern to match common private IP address ranges
           Pattern localIpPattern = Pattern.compile("^(192\\.168\\.|10\\.10\\.).*");


            while (interfaces.hasMoreElements()) {
                NetworkInterface networkInterface = interfaces.nextElement();
                Enumeration<InetAddress> addresses = networkInterface.getInetAddresses();
                while (addresses.hasMoreElements()) {
                    InetAddress address = addresses.nextElement();
                    String ipAddress = address.getHostAddress();

                    // Check if the IP is non-loopback, site-local, and matches the local IP pattern
                    if (!address.isLoopbackAddress() && address.isSiteLocalAddress() && localIpPattern.matcher(ipAddress).matches()) {
                        return ipAddress;
                    }
                }
            }
        } catch (SocketException e) {
            e.printStackTrace();
        }
        return "127.0.0.1"; // Fallback to localhost if no suitable IP is found
    }
}

package com.coderscampus.StudentClearanceSystem.util;

import java.security.Key;
import java.util.Map;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import com.coderscampus.StudentClearanceSystem.domain.Account;




@Service
public class JwtService {

    private static String SECRET_KEY;

    // Static block to load the .env file and get the JWT_SECRET
    static {
        Dotenv dotenv = Dotenv.load();  // Load the .env file
    
        SECRET_KEY = dotenv.get("JWT_SECRET");  // Get the JWT_SECRET value from the .env file
   
    }


  

    public String extractUsername(String token) {

        return extractClaim(token,Claims::getSubject);
        
    }

    public <T> T extractClaim(String token,Function<Claims,T> claimsResolver){
        final Claims claims=extractAlClaims(token);
                     
        return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails){
        return generateToken(new HashMap<>(),userDetails);
    }

    public String generateToken(
        Map<String,Object> extraClaims,
        UserDetails userDetails
    ){
        

          if (userDetails instanceof Account account) {
        extraClaims.put("authorities",userDetails.getAuthorities().
        stream().map(auth->auth.getAuthority())
        .collect(Collectors.toList()));
    }
           
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+1000*60*24))
                .signWith(getSigninKey(),SignatureAlgorithm.HS256)
                .compact();
    }


    public boolean isTokenValid(String token,UserDetails userDetails){
        final String username=extractUsername(token);
        return (username.equals(userDetails.getUsername())) &&!isTokenExpired(token);
            }
        
    private boolean isTokenExpired(String token) {

             return extractExpiration(token).before(new Date());
                         }
                     
    private Date extractExpiration(String token) {
             return extractClaim(token,Claims::getExpiration);
                 }
             
                         private Claims extractAlClaims(String token){
         return Jwts.parserBuilder()
                 .setSigningKey(getSigninKey())
                                 .build()
                                 .parseClaimsJws(token)
                                 .getBody();
                     }
                 
    private Key getSigninKey() {
           byte[] keyBytes=Decoders.BASE64.decode(SECRET_KEY);
             return Keys.hmacShaKeyFor(keyBytes);
                         
             }
     

    
}
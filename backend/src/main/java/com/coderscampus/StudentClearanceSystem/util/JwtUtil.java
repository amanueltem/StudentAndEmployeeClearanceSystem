package com.coderscampus.StudentClearanceSystem.util;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import com.coderscampus.StudentClearanceSystem.domain.*;
import com.coderscampus.StudentClearanceSystem.repository.*;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import io.jsonwebtoken.SignatureAlgorithm;
@Component
public class JwtUtil implements Serializable{
    @Autowired
    private UserRepository userRepo;
    private static final long serialVersionUID=-2550185165626007488L;
    public static final long JWT_TOKEN_VALIDITY=7*24*60*60;
    // public static final long JWT_TOKEN_VALIDITY=60;
     //public static final long JWT_TOKEN_VALIDITY=60;
    @Value("${jwt.secret}")
    private String secret;
    public String getUsernameFromToken(String token){
        return getClaimFromToken(token,Claims::getSubject);
    }
    public Date getIssusedAtDateFromToken(String token){
        return getClaimFromToken(token,Claims::getIssuedAt);
    }
    public Date getExpirationDateFromToken(String token){
        return getClaimFromToken(token,Claims::getExpiration);
    }
    public <T> T getClaimFromToken(String token,Function<Claims,T> claimsResolver){
        final Claims claims=getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }
    private Claims getAllClaimsFromToken(String token){
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }
    private Boolean isTokenExpired(String token){
        final Date expiration=getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }
    public Boolean ignoreTokenExpiration(String token){
        return false;
    }
    public String generateToken(UserDetails userDetails){
        Map<String,Object> claims=new HashMap<>();
        claims.put("authorities",userDetails.getAuthorities().
        stream().map(auth->auth.getAuthority())
        .collect(Collectors.toList()));
        if (userDetails instanceof Account) {
            Account account = (Account) userDetails;
            //claims.put("firstname", account.getUsername());
            claims.put("isdefault", account.getIsDefault());
            User user=userRepo.findUserByAccount(account).orElse(null);
            if(user!=null)
            claims.put("fname",user.getFname());
        }
        return doGenerateToken(claims,userDetails.getUsername());
    }
    private String doGenerateToken(Map<String,Object> claims,String subject){
        return Jwts.builder()
        .setClaims(claims)
        .setSubject(subject)
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis()+JWT_TOKEN_VALIDITY*1000))
        .signWith(SignatureAlgorithm.HS512,secret).compact();
    }
    public Boolean canTokenBeRefreshed(String token){
        return (!isTokenExpired(token)||ignoreTokenExpiration(token));
    }
    public Boolean validateToken(String token,UserDetails userDetails){
        final String username=getUsernameFromToken(token);
        return(username.equals(userDetails.getUsername())&&!isTokenExpired(token));
    }
}

package com.coderscampus.StudentClearanceSystem.config;

import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.coderscampus.StudentClearanceSystem.filter.JwtFilter;
import com.coderscampus.StudentClearanceSystem.util.CustomPasswordEncoder;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;


@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private CustomPasswordEncoder passwordEncoder;
    @Autowired
    private JwtFilter jwtFilter;
    @Override @Bean
    public AuthenticationManager authenticationManagerBean()throws Exception{
        return super.authenticationManagerBean();
    }
    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception{
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder.getPasswordEncoder());
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http=http.csrf().disable().cors().disable();
        http=http
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and();
        http=http.exceptionHandling()
             .authenticationEntryPoint((request,response,ex)->{
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED,ex.getMessage());
             }).and();
             
      http.authorizeRequests()
           .antMatchers("/api/auth/**","/api/tempo_students"
           ,"/api/blocks","/api/campuses","/api/colleges"
           ,"/api/departments").permitAll()
           .anyRequest().authenticated();
      http.addFilterBefore(jwtFilter,UsernamePasswordAuthenticationFilter.class);
    }
}

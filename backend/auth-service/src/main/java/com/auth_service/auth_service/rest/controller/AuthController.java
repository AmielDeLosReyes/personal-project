package com.auth_service.auth_service.rest.controller;

import com.auth_service.auth_service.config.security.JwtUtil;
import com.auth_service.auth_service.rest.model.Role;
import com.auth_service.auth_service.rest.model.UserEntity;
import com.auth_service.auth_service.rest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtil jwtUtils;

    @PostMapping("/signin")
    public String authenticateUser(@RequestBody UserEntity user) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        user.getPassword()
                )
        );
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return jwtUtils.generateToken(userDetails.getUsername(), userDetails.getAuthorities());
    }

    @PostMapping("/signup/{role}")
    public String registerUser(@PathVariable String role, @RequestBody UserEntity user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            return "Error: Username is already taken!";
        }

        Role userRole;
        try {
            userRole = Role.valueOf("ROLE_" + role.toUpperCase());
        } catch (IllegalArgumentException e) {
            return "Error: Invalid role. Allowed roles are: CONTRACTOR, REA, ADMIN";
        }

        UserEntity newUser = new UserEntity(
                null,
                user.getUsername(),
                encoder.encode(user.getPassword()),
                userRole
        );

        userRepository.save(newUser);
        return "User registered successfully with role: " + userRole.name();
    }
}
package com.auth_service.auth_service.rest.controller;

import com.auth_service.auth_service.config.security.JwtUtil;
import com.auth_service.auth_service.rest.model.enums.Role;
import com.auth_service.auth_service.rest.model.entity.UserEntity;
import com.auth_service.auth_service.rest.model.response.SignInResponse;
import com.auth_service.auth_service.rest.model.response.SignUpResponse;
import com.auth_service.auth_service.rest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.auth_service.auth_service.rest.model.enums.ResponseStatus;

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
    public ResponseEntity<SignInResponse> authenticateUser(@RequestBody UserEntity user) {
        SignInResponse response = new SignInResponse();

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getUserName(),
                            user.getPassword()
                    )
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtUtils.generateToken(userDetails.getUsername(), userDetails.getAuthorities());

            response.setRespCode(ResponseStatus.USER_SUCCESS_SIGNIN.getCode());
            response.setRespDesc(ResponseStatus.USER_SUCCESS_SIGNIN.getDescription());
            response.setUsername(userDetails.getUsername());
            response.setToken(token);

            return ResponseEntity.ok(response);

        } catch (BadCredentialsException ex) {
            response.setRespCode(ResponseStatus.FAILED_SIGNIN.getCode());
            response.setRespDesc(ResponseStatus.FAILED_SIGNIN.getDescription());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @PostMapping("/signup/{role}")
    public ResponseEntity<SignUpResponse> registerUser(
            @PathVariable String role,
            @RequestBody UserEntity user
    ) {
        SignUpResponse response = new SignUpResponse();

        if (userRepository.existsByUserName(user.getUserName())) {
            response.setRespCode(ResponseStatus.USERNAME_TAKEN.getCode());
            response.setRespDesc(ResponseStatus.USERNAME_TAKEN.getDescription());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        Role userRole;
        try {
            userRole = Role.valueOf("ROLE_" + role.toUpperCase());
        } catch (IllegalArgumentException e) {
            response.setRespCode(ResponseStatus.INVALID_ROLE.getCode());
            response.setRespDesc(ResponseStatus.INVALID_ROLE.getDescription());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        UserEntity newUser = new UserEntity(
                null,
                user.getUserName(),
                user.getEmail(),
                user.getLicenseNumber(),
                encoder.encode(user.getPassword()),
                userRole
        );

        userRepository.save(newUser);

        response.setRespCode(ResponseStatus.USER_SUCCESS_CREATE.getCode());
        response.setRespDesc(ResponseStatus.USER_SUCCESS_CREATE.getDescription() + " with role: " + userRole.name());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
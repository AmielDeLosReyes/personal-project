package com.auth_service.auth_service.rest.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("/test/all")
    public String allAccess() {
        return "Public Content.";
    }

    @GetMapping("/contractor")
    public String contractorAccess() {
        return "Contractor Content.";
    }

    @GetMapping("/rea")
    public String reaAccess() {
        return "REA Content.";
    }
}
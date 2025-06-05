package com.auth_service.auth_service.rest.model.enums;

public enum ResponseStatus {
    USER_SUCCESS_CREATE("201", "User registered successfully"),
    USERNAME_TAKEN("409", "Username is already taken!"),
    INVALID_ROLE("400", "Invalid role. Allowed roles are: CONTRACTOR, REA, ADMIN"),
    USER_SUCCESS_SIGNIN("200", "Login successful"),
    FAILED_SIGNIN("401", "Invalid username or password");

    private final String code;
    private final String description;

    ResponseStatus(String code, String description) {
        this.code = code;
        this.description = description;
    }

    public String getCode() {
        return code;
    }

    public String getDescription() {
        return description;
    }
}

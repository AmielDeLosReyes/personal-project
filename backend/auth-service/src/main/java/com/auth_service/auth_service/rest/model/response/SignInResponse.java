package com.auth_service.auth_service.rest.model.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class SignInResponse {
    @JsonProperty("resp_code")
    private String respCode;

    @JsonProperty("resp_desc")
    private String respDesc;

    @JsonProperty("username")
    private String username;

    @JsonProperty("token")
    private String token;
}

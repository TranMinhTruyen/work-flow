package com.org.workflow.controller.request;

import lombok.Data;

@Data
public class LoginRequest {

  private String userName;

  private String password;

  private Boolean isRemember;

}

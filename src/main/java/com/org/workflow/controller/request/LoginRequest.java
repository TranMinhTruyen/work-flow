package com.org.workflow.controller.request;

import lombok.Data;

@Data
public class LoginRequest {
  private String username;
  private String password;
  private Boolean isRemember;
}

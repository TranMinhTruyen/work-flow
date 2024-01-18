package com.org.workflow.controller.reponse;

import lombok.Data;

@Data
public class CreateAppUserRequest {
  private String username;
  private String loginPassword;
  private String fullName;
  private String role;
}

package com.org.workflow.controller.request;

import java.util.List;
import lombok.Data;

@Data
public class CreateAppUserRequest {

  private String username;

  private String loginPassword;

  private String fullName;

  private String role;

  private List<String> authorities;

}

package com.org.workflow.controller.request;

import java.util.List;
import lombok.Data;

@Data
public class CreateUserAccountRequest {

  private String email;

  private String username;

  private String loginPassword;

  private String fullName;

  private String role;

  private List<String> authorities;

  private byte[] image;

}

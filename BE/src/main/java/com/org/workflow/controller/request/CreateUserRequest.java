package com.org.workflow.controller.request;

import java.util.List;
import lombok.Data;

@Data
public class CreateUserRequest {

  private String email;

  private String userName;

  private String password;

  private String fullName;

  private String birthDay;

  private String role;

  private List<String> authorities;

  private FileData image;

}

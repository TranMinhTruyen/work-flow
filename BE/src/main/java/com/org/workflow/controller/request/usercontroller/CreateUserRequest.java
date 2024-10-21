package com.org.workflow.controller.request.usercontroller;

import com.org.workflow.controller.request.FileData;
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

  private Integer level;

  private FileData image;

}

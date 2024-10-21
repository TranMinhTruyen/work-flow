package com.org.workflow.controller.reponse.usercontroller;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;

@Data
public class CreateUserResponse {

  private String userName;

  private String fullName;

  private String birthDay;

  private String role;

  private List<String> authorities;

  private Integer level;

  private String imagePath;

  private LocalDateTime createDatetime;

  private String createdBy;

  private LocalDateTime updateDatetime;

  private String updateBy;

}

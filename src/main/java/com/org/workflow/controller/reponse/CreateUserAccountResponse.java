package com.org.workflow.controller.reponse;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;

@Data
public class CreateUserAccountResponse {

  private String username;

  private String fullName;

  private String role;

  private List<String> authorities;

  private LocalDateTime createDatetime;

  private String createdBy;

  private LocalDateTime updateDatetime;

  private String updateBy;

}

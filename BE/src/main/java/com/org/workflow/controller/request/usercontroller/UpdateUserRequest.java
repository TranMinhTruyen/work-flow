package com.org.workflow.controller.request.usercontroller;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;

/**
 * @author minh-truyen
 */
@Data
public class UpdateUserRequest {

  private String email;

  private String fullName;

  private String birthDay;

  private String role;

  private LocalDateTime updateDatetime;

  private List<String> authorities;

  private Boolean isActive;

}

package com.org.workflow.controller.reponse;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;

/**
 * @author minh-truyen
 */
@Data
public class UpdateUserResponse {

  private String userId;

  private String fullName;

  private String role;

  private LocalDateTime updateDatetime;

  private List<String> authorities;

}

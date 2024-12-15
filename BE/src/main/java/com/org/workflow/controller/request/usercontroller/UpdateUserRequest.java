package com.org.workflow.controller.request.usercontroller;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author minh-truyen
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserRequest implements Serializable {

  private String email;

  private String fullName;

  private String birthDay;

  private String role;

  private LocalDateTime updateDatetime;

  private List<String> authorities;

  private Boolean isActive;

}

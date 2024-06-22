package com.org.workflow.controller.reponse;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserAccountResponse implements Serializable {

  private String userId;

  private String email;

  private String username;

  private String fullName;

  private String role;

  private Integer loginFailCount;

  private Boolean isActive;

  private List<String> authorities;

  private LocalDateTime createDatetime;

  private LocalDateTime updateDatetime;

}

package com.org.workflow.controller.reponse;

import java.io.Serializable;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppUserResponse implements Serializable {

  private String username;

  private String fullName;

  private String role;

  private Integer loginFailCount;

  private Boolean isActive;

  private List<String> authorities;

}

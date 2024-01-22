package com.org.workflow.dao.repository.entity.appuser;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;

@Data
public class SelectByUserName {

  private String username;

  private String loginPassword;

  private String fullName;

  private String role;

  private Integer loginFailCount;

  private Boolean isActive;

  private String authorities;

  @QueryProjection
  public SelectByUserName(String username, String loginPassword, String fullName, String role,
      Integer loginFailCount, Boolean isActive, String authorities) {
    this.username = username;
    this.loginPassword = loginPassword;
    this.fullName = fullName;
    this.role = role;
    this.loginFailCount = loginFailCount;
    this.isActive = isActive;
    this.authorities = authorities;
  }

}

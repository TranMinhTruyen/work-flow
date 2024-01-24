package com.org.workflow.dao.repository.entity.appuser;

import com.querydsl.core.annotations.QueryProjection;
import java.time.LocalDateTime;
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

  private LocalDateTime updateDatetime;

  @QueryProjection
  public SelectByUserName(String username, String loginPassword, String fullName, String role,
      Integer loginFailCount, Boolean isActive, String authorities, LocalDateTime updateDatetime) {
    this.username = username;
    this.loginPassword = loginPassword;
    this.fullName = fullName;
    this.role = role;
    this.loginFailCount = loginFailCount;
    this.isActive = isActive;
    this.authorities = authorities;
    this.updateDatetime = updateDatetime;
  }

}

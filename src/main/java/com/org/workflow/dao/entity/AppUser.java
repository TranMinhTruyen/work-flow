package com.org.workflow.dao.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Entity(name = "app_user")
public class AppUser implements Serializable {
  
  @Id
  @Column(name = "user_name", nullable = false)
  private String username;

  @Column(name = "login_password", nullable = false)
  private String loginPassword;

  @Column(name = "full_name")
  private String fullName;
  
  @Column(name = "role")
  private String role;
  
  @Column(name="login_fail_count")
  private Integer loginFailCount;

  @Column(name = "is_active", nullable = false)
  private Boolean isActive;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "created_date_time", nullable = false)
  private LocalDateTime createDatetime;

  @Column(name = "created_by", nullable = false)
  private String createdBy;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "update_date_time", nullable = false)
  private LocalDateTime updateDatetime;

  @Column(name = "update_by", nullable = false)
  private String updateBy;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "delete_date_time")
  private LocalDateTime deleteDatetime;

  @Column(name = "delete_by")
  private String deleteBy;
}

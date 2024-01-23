package com.org.workflow.dao.entity;

import com.org.workflow.dao.id.AppUserAuthorityPk;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.io.Serializable;
import java.time.LocalDateTime;
import lombok.Data;

@Data
@Entity(name = "app_user_authority")
@IdClass(AppUserAuthorityPk.class)
public class AppUserAuthority implements Serializable {

  @Id
  private Long id;

  @Id
  @Column(name = "user_name")
  private String username;

  @Column(name = "authority")
  private String authority;

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

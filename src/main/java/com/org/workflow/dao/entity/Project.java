package com.org.workflow.dao.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.io.Serializable;
import java.time.LocalDateTime;
import lombok.Data;

@Data
@Entity(name = "project")
public class Project implements Serializable {

  @Id
  @Column(name = "project_id")
  private String projectId;

  @Column(name = "project_name", nullable = false)
  private String projectName;

  @Column(name = "project_lead", nullable = false)
  private String projectLead;

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

package com.org.workflow.dao.entity;

import com.org.workflow.dao.id.TicketPk;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Data;

@Data
@Entity(name = "ticket")
@IdClass(TicketPk.class)
public class Ticket implements Serializable {

  @Id
  @Column(name = "project_id", nullable = false)
  private String projectId;

  @Id
  @Column(name = "ticket_id", nullable = false)
  private String ticketId;

  @Column(name = "ticket_type", nullable = false)
  private String ticketType;

  @Column(name = "ticket_subject", nullable = false)
  private String ticketSubject;

  @Column(name = "assignee_id")
  private String assigneeId;

  @Column(name = "priority")
  private String priority;

  @Column(name = "status")
  private String status;

  @Column(name = "start_date")
  private LocalDate startDate;

  @Column(name = "due_date")
  private LocalDate dueDate;

  @Column(name = "estimate_hour")
  private Long estimateHour;

  @Column(name = "actual_hour")
  private Long actualHour;

  @Column(name = "is_late")
  private Boolean isLate;

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

package com.org.workflow.controller.reponse;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class NotificationResponse {

  private String userId;

  private Long id;

  private String title;

  private String message;

  private Boolean isRead;

  private LocalDateTime createDatetime;

  private String createdBy;

  private LocalDateTime updateDatetime;

  private String updateBy;

}

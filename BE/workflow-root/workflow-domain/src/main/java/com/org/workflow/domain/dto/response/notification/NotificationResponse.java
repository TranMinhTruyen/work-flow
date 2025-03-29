package com.org.workflow.domain.dto.response.notification;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotificationResponse {

  private String id;

  private String title;

  private String message;

  private LocalDateTime sendDatetime;

  private String sendBy;

  private boolean isRead;

}

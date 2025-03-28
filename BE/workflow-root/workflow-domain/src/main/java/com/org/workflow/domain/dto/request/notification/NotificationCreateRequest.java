package com.org.workflow.domain.dto.request.notification;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotificationCreateRequest implements Serializable {

  private String title;

  private String message;

  private String sendBy;

  private LocalDateTime sendDatetime;

  private boolean isRead;

}

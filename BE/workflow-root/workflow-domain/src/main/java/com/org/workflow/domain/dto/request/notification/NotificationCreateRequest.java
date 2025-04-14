package com.org.workflow.domain.dto.request.notification;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotificationCreateRequest implements Serializable {

  private String category;

  private List<NotificationContentRequest> contentList;

  private String sendBy;

  private LocalDateTime sendDatetime;

  private boolean isRead;

}

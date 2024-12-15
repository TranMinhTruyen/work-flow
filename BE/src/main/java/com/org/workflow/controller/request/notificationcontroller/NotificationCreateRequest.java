package com.org.workflow.controller.request.notificationcontroller;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotificationCreateRequest implements Serializable {

  private String userId;

  private String title;

  private String message;

}

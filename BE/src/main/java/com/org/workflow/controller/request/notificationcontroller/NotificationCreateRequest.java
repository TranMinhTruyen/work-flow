package com.org.workflow.controller.request.notificationcontroller;

import lombok.Data;

@Data
public class NotificationCreateRequest {

  private String userId;

  private String title;

  private String message;

}

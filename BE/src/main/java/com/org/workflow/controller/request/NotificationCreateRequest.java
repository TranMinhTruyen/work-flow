package com.org.workflow.controller.request;

import lombok.Data;

@Data
public class NotificationCreateRequest {

  private String userId;

  private String title;

  private String message;

}

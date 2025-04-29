package com.org.workflow.core.common.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @author minh-truyen
 */
@Getter
@AllArgsConstructor
public enum NotificationEnum {
  //@formatter:off

  NN0000001("NN0000001", "N"),
  NN0000002("NN0000002", "N"),
  NN0000003("NN0000003", "N"),

  //@formatter:on
  ;

  private final String notificationCode;

  private final String notificationCategory;
}

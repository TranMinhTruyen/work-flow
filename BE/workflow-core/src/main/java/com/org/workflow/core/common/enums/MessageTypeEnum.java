package com.org.workflow.core.common.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MessageTypeEnum {
  //@formatter:off

  SUCCESS("SUCCESS"),
  ERROR("ERROR"),
  WARN("WARN"),
  INFO("INFO"),

  //@formatter:on
  ;

  private final String typeName;
}

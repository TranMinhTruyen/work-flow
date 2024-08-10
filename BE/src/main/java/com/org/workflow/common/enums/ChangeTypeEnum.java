package com.org.workflow.common.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ChangeTypeEnum {
  //@formatter:off

  CREATE("CREATE"),
  UPDATE("UPDATE"),
  DELETE("DELETE"),
  NO_CHANGE("NO_CHANGE"),

  //@formatter:on
  ;

  private final String typeName;

}

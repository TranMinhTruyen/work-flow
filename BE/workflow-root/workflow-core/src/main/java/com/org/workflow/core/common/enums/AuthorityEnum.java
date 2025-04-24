package com.org.workflow.core.common.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @author minh-truyen
 */
@Getter
@AllArgsConstructor
public enum AuthorityEnum {
  //@formatter:off

  CREATE("CREATE"),
  GET("GET"),
  UPDATE("UPDATE"),
  DELETE("DELETE"),

  //@formatter:on
  ;

  private final String authority;
}

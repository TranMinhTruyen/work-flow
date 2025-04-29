package com.org.workflow.core.common.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @author minh-truyen
 */
@Getter
@AllArgsConstructor
public enum RoleEnum {
  //@formatter:off

  ROLE_ADMIN("ROLE_ADMIN"),
  ROLE_USER("ROLE_USER"),

  //@formatter:on
  ;

  private final String role;
}

package com.org.workflow.common.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @author minh-truyen
 */
@Getter
@AllArgsConstructor
public enum RoleEnums {
  //@formatter:off

  ROLE_ADMIN("ADMIN"),
  ROLE_USER("USER"),

  //@formatter:on
  ;

  private final String role;
}

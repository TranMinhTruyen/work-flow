package com.org.workflow.core.common.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ObjectEnums {
  //@formatter:off

  ITEM_MASTER("ItemMaster"),
  USER_ACCOUNT("UserAccount"),

  //@formatter:on
  ;

  private final String objectName;

}

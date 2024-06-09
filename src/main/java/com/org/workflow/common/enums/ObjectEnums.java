package com.org.workflow.common.enums;

import lombok.Getter;

@Getter
public enum ObjectEnums {
  //@formatter:off

  ITEM_MASTER("ItemMaster"),
  USER_ACCOUNT("UserAccount"),

  //@formatter:on
  ;

  private final String objectName;

  ObjectEnums(String objectName) {
    this.objectName = objectName;
  }
}

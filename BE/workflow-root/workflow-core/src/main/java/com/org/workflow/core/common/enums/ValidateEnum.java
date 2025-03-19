package com.org.workflow.core.common.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @author minh-truyen
 */
@Getter
@AllArgsConstructor
public enum ValidateEnum {

  //@formatter:off

  MIN_MAX_VALIDATE("V00001"),
  NUMBER_VALIDATE("V00002"),
  DECIMAL_VALIDATE("V00003"),

  //@formatter:on
  ;

  private final String messageCode;

  public static ValidateEnum fromMessageCode(String messageCode) {
    for (ValidateEnum value : ValidateEnum.values()) {
      if (value.getMessageCode().equals(messageCode)) {
        return value;
      }
    }
    return null;
  }

}

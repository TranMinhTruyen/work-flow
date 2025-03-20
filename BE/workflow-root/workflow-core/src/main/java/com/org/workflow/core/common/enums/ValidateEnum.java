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

  REQUIRED_VALIDATE("V00000"),
  MIN_MAX_VALIDATE("V00001"),
  NUMBER_VALIDATE("V00002"),
  DECIMAL_VALIDATE("V00003"),
  MAX_NUMBER_VALIDATE("V00004"),
  MAX_DECIMAL_VALIDATE("V00005"),

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

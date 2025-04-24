package com.org.workflow.core.common.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @author minh-truyen
 */
@Getter
@AllArgsConstructor
public enum LevelEnum {
  //@formatter:off

  HIGH_LEVEL(3),
  MID_LEVEL(2),
  LOW_LEVEL(1),

  //@formatter:on
  ;

  private final int level;

  public static LevelEnum fromInt(int value) {
    for (LevelEnum levelEnum : LevelEnum.values()) {
      if (levelEnum.getLevel() == value) {
        return levelEnum;
      }
    }
    return null;
  }
}

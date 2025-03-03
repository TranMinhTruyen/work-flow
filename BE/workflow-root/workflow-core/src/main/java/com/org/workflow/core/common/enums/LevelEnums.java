package com.org.workflow.core.common.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @author minh-truyen
 */
@Getter
@AllArgsConstructor
public enum LevelEnums {
  //@formatter:off

  HIGH_LEVEL(3),
  MID_LEVEL(2),
  LOW_LEVEL(1),

  //@formatter:on
  ;

  private final int level;
}

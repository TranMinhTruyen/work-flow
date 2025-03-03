package com.org.workflow.domain.utils;


import com.org.workflow.core.common.enums.ChangeTypeEnum;

import java.util.List;
import java.util.Objects;

public class HistoryUtil {

  public static String checkChangeType(Object before, Object after, ChangeTypeEnum changeType) {
    if (before != null && Objects.isNull(after)) {
      return ChangeTypeEnum.DELETE.toString();
    }

    if (before instanceof List<?> && after instanceof List<?>) {
      if (!Objects.deepEquals(before, after)) {
        return changeType.getTypeName();
      } else {
        return ChangeTypeEnum.NO_CHANGE.getTypeName();
      }
    }

    if (!Objects.equals(before, after)) {
      return changeType.getTypeName();
    } else {
      return ChangeTypeEnum.NO_CHANGE.getTypeName();
    }
  }

}

package com.org.workflow.common.utils;

import static com.org.workflow.common.enums.MessageEnum.AUTHENTICATION_ERROR;
import static com.org.workflow.common.enums.MessageEnum.AUTHORITY_ERROR;
import static com.org.workflow.common.enums.MessageEnum.LEVEL_ERROR;
import static com.org.workflow.common.enums.MessageEnum.ROLE_ERROR;

import com.org.workflow.core.exception.WorkFlowException;
import com.org.workflow.core.security.CustomUserDetail;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class AuthUtil {

  public static CustomUserDetail getAuthentication() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    return (CustomUserDetail) authentication.getPrincipal();
  }

  public static void checkAuthentication(String role, String authority, int level)
      throws WorkFlowException {
    CustomUserDetail userDetail = getAuthentication();
    if (userDetail == null) {
      throw new WorkFlowException(AUTHENTICATION_ERROR);
    }

    if (!StringUtils.equals(userDetail.getUserAccount().getRole(), role)) {
      throw new WorkFlowException(ROLE_ERROR);
    }

    if (!userDetail.getUserAccount().getAuthorities().contains(authority)) {
      throw new WorkFlowException(AUTHORITY_ERROR);
    }

    if (userDetail.getUserAccount().getLevel() != level) {
      throw new WorkFlowException(LEVEL_ERROR);
    }
  }

}

package com.org.workflow.domain.utils;

import com.org.workflow.core.common.exception.ErrorDetail;
import com.org.workflow.core.common.exception.WFException;
import com.org.workflow.domain.dto.common.CustomUserDetail;
import jakarta.annotation.Nullable;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import static com.org.workflow.core.common.enums.MessageEnum.AUTHENTICATION_ERROR;
import static com.org.workflow.core.common.enums.MessageEnum.AUTHORITY_ERROR;
import static com.org.workflow.core.common.enums.MessageEnum.LEVEL_ERROR;
import static com.org.workflow.core.common.enums.MessageEnum.ROLE_ERROR;

public class AuthUtil {

  private AuthUtil() {
  }

  public static CustomUserDetail getAuthentication() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    return (CustomUserDetail) authentication.getPrincipal();
  }

  public static void checkAuthentication(@Nullable String role, @Nullable String authority,
                                         int level) throws WFException {
    CustomUserDetail userDetail = getAuthentication();
    if (userDetail == null) {
      throw new WFException(new ErrorDetail(AUTHENTICATION_ERROR));
    }

    if (role != null && !StringUtils.equals(userDetail.getUserAccount().getRole(), role)) {
      throw new WFException(new ErrorDetail(ROLE_ERROR));
    }

    if (authority != null && !userDetail.getUserAccount().getAuthorities().contains(authority)) {
      throw new WFException(new ErrorDetail(AUTHORITY_ERROR));
    }

    if (level != 0 && userDetail.getUserAccount().getLevel() <= level) {
      throw new WFException(new ErrorDetail(LEVEL_ERROR));
    }
  }

}

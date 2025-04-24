package com.org.workflow.domain.utils;

import static com.org.workflow.core.common.enums.MessageEnum.AUTHENTICATION_ERROR;
import static com.org.workflow.core.common.enums.MessageEnum.AUTHORITY_ERROR;
import static com.org.workflow.core.common.enums.MessageEnum.LEVEL_ERROR;
import static com.org.workflow.core.common.enums.MessageEnum.ROLE_ERROR;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.org.workflow.core.common.enums.AuthorityEnum;
import com.org.workflow.core.common.enums.LevelEnum;
import com.org.workflow.core.common.enums.RoleEnum;
import com.org.workflow.core.common.exception.WFException;
import com.org.workflow.domain.dto.common.CustomUserDetail;

import jakarta.annotation.Nullable;

public class AuthUtil {

  private AuthUtil() {
  }

  public static CustomUserDetail getAuthentication() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    return (CustomUserDetail) authentication.getPrincipal();
  }

  public static void checkAuthentication(@Nullable List<RoleEnum> role,
      @Nullable List<AuthorityEnum> authority, @Nullable LevelEnum level) throws WFException {
    CustomUserDetail userDetail = getAuthentication();
    if (userDetail == null) {
      throw new WFException(AUTHENTICATION_ERROR);
    }

    if (role != null && !role.stream().map(RoleEnum::getRole).toList()
        .contains(userDetail.getUserAccount().getRole().getRole())) {
      throw new WFException(ROLE_ERROR);
    }

    if (authority != null) {
      List<AuthorityEnum> userAuthorities = userDetail.getUserAccount().getAuthorities();
      boolean hasMatchingAuthority = userAuthorities.stream().anyMatch(authority::contains);
      if (!hasMatchingAuthority) {
        throw new WFException(AUTHORITY_ERROR);
      }
    }

    if (level != null && userDetail.getUserAccount().getLevel().getLevel() < level.getLevel()) {
      throw new WFException(LEVEL_ERROR);
    }
  }

}

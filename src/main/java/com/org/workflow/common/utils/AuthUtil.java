package com.org.workflow.common.utils;

import com.org.workflow.core.security.AppUserDetail;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class AuthUtil {

  public static AppUserDetail getAuthentication() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    return (AppUserDetail) authentication.getPrincipal();
  }

}

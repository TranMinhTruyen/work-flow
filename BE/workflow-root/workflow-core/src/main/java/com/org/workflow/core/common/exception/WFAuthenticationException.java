package com.org.workflow.core.common.exception;

import org.springframework.security.core.AuthenticationException;

/**
 * @author minh-truyen
 */
public class WFAuthenticationException extends AuthenticationException {
  
  public WFAuthenticationException(String msg, Throwable cause) {
    super(msg, cause);
  }

  public WFAuthenticationException(String msg) {
    super(msg);
  }

}

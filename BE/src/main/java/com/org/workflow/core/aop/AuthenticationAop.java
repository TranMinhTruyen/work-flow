package com.org.workflow.core.aop;

import static com.org.workflow.common.enums.MessageEnum.AUTHENTICATION_FAILED;

import com.org.workflow.common.annotation.Authentication;
import com.org.workflow.common.utils.AuthUtil;
import com.org.workflow.core.exception.ErrorDetail;
import com.org.workflow.core.exception.WorkFlowException;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * @author minh-truyen
 */
@Aspect
@Component
public class AuthenticationAop {

  private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationAop.class);

  @Around("@annotation(authentication)")
  public Object checkAuthentication(ProceedingJoinPoint joinPoint, Authentication authentication)
    throws WorkFlowException {
    Object value;

    try {
      String role = authentication.role();
      String authority = authentication.authority();
      int level = authentication.level();

      AuthUtil.checkAuthentication(role, authority, level);

      value = joinPoint.proceed();
      return value;
    } catch (WorkFlowException error) {
      ErrorDetail errorDetail = error.getErrorDetail();
      LOGGER.error("Authentication error: {}", errorDetail);
      throw new WorkFlowException(errorDetail);
    } catch (Throwable e) {
      ErrorDetail errorDetail = new ErrorDetail(AUTHENTICATION_FAILED);
      LOGGER.error("Authentication error: {}", errorDetail);
      throw new WorkFlowException(errorDetail);
    }
  }

}

package com.org.workflow.domain.aop;

import static com.org.workflow.domain.utils.AuthUtil.checkAuthentication;

import java.lang.reflect.Method;
import java.util.List;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import com.org.workflow.core.common.enums.AuthorityEnum;
import com.org.workflow.core.common.enums.LevelEnum;
import com.org.workflow.core.common.enums.RoleEnum;
import com.org.workflow.domain.annotation.Authentication;

/**
 * @author minh-truyen
 */
@Aspect
@Component
public class AuthenticationAop {

  @Around("@annotation(com.org.workflow.domain.annotation.Authentication)")
  public Object checkAuthenticationController(ProceedingJoinPoint joinPoint) throws Throwable {
    MethodSignature signature = (MethodSignature) joinPoint.getSignature();
    Method method = signature.getMethod();

    Authentication authentication = method.getAnnotation(Authentication.class);
    if (authentication != null) {
      List<RoleEnum> role = List.of(authentication.role());
      List<AuthorityEnum> authority = List.of(authentication.authority());
      LevelEnum level = authentication.level();
      checkAuthentication(role, authority, level);
    }

    return joinPoint.proceed();
  }

}

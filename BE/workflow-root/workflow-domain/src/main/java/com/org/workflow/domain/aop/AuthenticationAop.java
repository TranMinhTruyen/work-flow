package com.org.workflow.domain.aop;

import static com.org.workflow.domain.utils.AuthUtil.checkAuthentication;

import java.lang.reflect.Method;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import com.org.workflow.core.common.enums.AuthorityEnums;
import com.org.workflow.core.common.enums.LevelEnums;
import com.org.workflow.core.common.enums.RoleEnums;
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
      RoleEnums role = authentication.role();
      AuthorityEnums authority = authentication.authority();
      LevelEnums level = authentication.level();
      checkAuthentication(role.getRole(), authority.getAuthority(), level.getLevel());
    }

    return joinPoint.proceed();
  }

}

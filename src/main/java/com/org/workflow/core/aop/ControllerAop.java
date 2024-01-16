package com.org.workflow.core.aop;

import com.org.workflow.core.exception.AppException;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Aspect
@Component
@RequiredArgsConstructor
public class ControllerAop {
  
  private static final Logger LOGGER = LoggerFactory.getLogger(ControllerAop.class);

  @Around(value = "execution(* com.org.workflow.controller.*.*(..))", argNames = "joinPoint")
  public Object controllerLogger(ProceedingJoinPoint joinPoint) throws Throwable {
    Object value = null;
    long startTime = System.currentTimeMillis();
    final String methodName = joinPoint.getSignature().getName();
    final String controllerName = joinPoint.getTarget().getClass().getName();
    LOGGER.info("Start time taken by controller: {}", controllerName);
    try {
      LOGGER.info("Run controller {}, method {}.", controllerName, methodName);
      value = joinPoint.proceed();
    } catch (Throwable throwable) {
      LOGGER.error("Controller name {}, method {} has error: {} do rollback", controllerName, methodName, throwable.getMessage());
    } finally {
      Long timeTaken = System.currentTimeMillis() - startTime;
      LOGGER.info("Controller name {}, method {} time taken {} ms", controllerName, methodName, timeTaken);
    }
    return value;
  }

  @Around(value = "execution(* com.org.workflow.controller.*.*(..))", argNames = "joinPoint")
  public Object transaction(ProceedingJoinPoint joinPoint) throws AppException {
    Object value;
    try {
      value = joinPoint.proceed();
    } catch (Throwable e) {
      throw new AppException(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, e.getStackTrace());
    }
    return value;
  }
}

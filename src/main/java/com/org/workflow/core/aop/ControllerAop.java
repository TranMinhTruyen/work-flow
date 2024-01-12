package com.org.workflow.core.aop;

import lombok.RequiredArgsConstructor;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
@RequiredArgsConstructor
public class ControllerAop {
  
  private static final Logger LOGGER = LoggerFactory.getLogger(ControllerAop.class);

  @Around(value = "execution(* com.org.workflow.controller.*.*(..))", argNames = "joinPoint")
  public Object controllerLogger(ProceedingJoinPoint joinPoint) throws Throwable {
    Object value;
    long startTime = System.currentTimeMillis();
    final String methodName = joinPoint.getSignature().getName();
    final String controllerName = joinPoint.getTarget().getClass().getName();
    LOGGER.info("Start time taken by controller: {}", controllerName);
    try {
      LOGGER.info("Run controller {} method {}.", controllerName, methodName);
      value = joinPoint.proceed();
    } finally {
      Long timeTaken = System.currentTimeMillis() - startTime;
      LOGGER.info("Controller name {} method {} time taken {} ms", controllerName, methodName, timeTaken);
    }
    return value;
  }
}

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
public class ServiceAop {

  private static final Logger LOGGER = LoggerFactory.getLogger(ServiceAop.class);

  @Around(value = "execution(* com.org.workflow.service.*.*(..))", argNames = "joinPoint")
  public Object serviceLogger(ProceedingJoinPoint joinPoint) throws Throwable {
    Object value = null;
    long startTime = System.currentTimeMillis();
    final String methodName = joinPoint.getSignature().getName();
    final String serviceName = joinPoint.getTarget().getClass().getName();
    LOGGER.info("Start time taken by service: {}", serviceName);
    try {
      LOGGER.info("Run service {}, method {}.", serviceName, methodName);
      value = joinPoint.proceed();
    } catch (Throwable throwable) {
      LOGGER.error("Service name {}, method {} has error: {} do rollback", serviceName, methodName, throwable.getMessage());
    } finally {
      Long timeTaken = System.currentTimeMillis() - startTime;
      LOGGER.info("Service name {}, method {} time taken {} ms", serviceName, methodName, timeTaken);
    }
    return value;
  }
  
}

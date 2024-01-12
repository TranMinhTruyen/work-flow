package com.org.workflow.core.aop;

import lombok.RequiredArgsConstructor;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

@Aspect
@Component
@RequiredArgsConstructor
public class ServiceAop {

  private static final Logger LOGGER = LoggerFactory.getLogger(ServiceAop.class);

  private final PlatformTransactionManager transactionManager;

  @Around(value = "execution(* com.org.workflow.dao.*.*(..))", argNames = "joinPoint")
  public Object controllerLogger(ProceedingJoinPoint joinPoint) throws Throwable {
    Object value;
    long startTime = System.currentTimeMillis();
    final String methodName = joinPoint.getSignature().getName();
    final String controllerName = joinPoint.getTarget().getClass().getName();
    LOGGER.info("Start time taken by service: {}", controllerName);
    try {
      LOGGER.info("Run service {} method {}.", controllerName, methodName);
      value = joinPoint.proceed();
    } finally {
      Long timeTaken = System.currentTimeMillis() - startTime;
      LOGGER.info("Service name {} method {} time taken {} ms", controllerName, methodName, timeTaken);
    }
    return value;
  }

  @Around(value = "execution(* com.org.workflow.dao.*.*(..))", argNames = "joinPoint")
  public Object transaction(ProceedingJoinPoint joinPoint) throws Exception {
    long startTime = System.currentTimeMillis();
    final String methodName = joinPoint.getSignature().getName();
    final String serviceName = joinPoint.getTarget().getClass().getName();
    LOGGER.info("Start time taken by service: {}", serviceName);
    DefaultTransactionDefinition definition = new DefaultTransactionDefinition();
    definition.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
    TransactionStatus transactionStatus = transactionManager.getTransaction(definition);
    Object value = null;
    try {
      value = joinPoint.proceed();
      transactionManager.commit(transactionStatus);
      LOGGER.info("Service name {} method {} do commit", serviceName, methodName);
    } catch (Throwable e) {
      LOGGER.error("Service name {} method {} has error: {} do rollback", serviceName, methodName, e.getMessage());
      throw new Exception(e.getMessage(), e);
    } finally {
      Long timeTaken = System.currentTimeMillis() - startTime;
      LOGGER.info("Service name {} method {} time taken {} ms", serviceName, methodName, timeTaken);
    }
    return value;
  }
  
}

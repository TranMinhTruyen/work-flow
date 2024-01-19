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
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

@Aspect
@Component
@RequiredArgsConstructor
public class ServiceAop {
  
  private static final String JOIN_POINT = "joinPoint";

  private static final Logger LOGGER = LoggerFactory.getLogger(ServiceAop.class);

  private final PlatformTransactionManager transactionManager;

  @Around(value = "execution(* com.org.workflow.service.*.*(..))", argNames = JOIN_POINT)
  public Object serviceLogger(ProceedingJoinPoint joinPoint) throws Throwable {
    long startTime = System.currentTimeMillis();
    final String methodName = joinPoint.getSignature().getName();
    final String serviceName = joinPoint.getTarget().getClass().getName();
    LOGGER.info("Start time taken by service: {}", serviceName);
    try {
      LOGGER.info("Run service {}, method {}.", serviceName, methodName);
    } catch (Exception exception) {
      LOGGER.error("Service name {}, method {} has error: {} do rollback", serviceName, methodName,
          exception.getMessage());
    } finally {
      Long timeTaken = System.currentTimeMillis() - startTime;
      LOGGER.info("Service name {}, method {} time taken {} ms", serviceName, methodName,
          timeTaken);
    }
    return joinPoint.proceed();
  }

  @Around(value = "execution(* com.org.workflow.service.*.*(..))", argNames = JOIN_POINT)
  public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
    DefaultTransactionDefinition definition = new DefaultTransactionDefinition();
    definition.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
    TransactionStatus transactionStatus = transactionManager.getTransaction(definition);
    Object value;
    try {
      value = joinPoint.proceed();
      transactionManager.commit(transactionStatus);
    } catch (AppException exception) {
      transactionManager.rollback(transactionStatus);
      throw exception;
    } catch (Throwable e) {
      transactionManager.rollback(transactionStatus);
      throw new AppException(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return value;
  }

}

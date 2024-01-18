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
public class RepositoryAop {

  private static final Logger LOGGER = LoggerFactory.getLogger(RepositoryAop.class);

  private final PlatformTransactionManager transactionManager;

  @Around(value = "execution(* com.org.workflow.dao.*.*(..))", argNames = "joinPoint")
  public Object serviceLogger(ProceedingJoinPoint joinPoint) throws Throwable {
    long startTime = System.currentTimeMillis();
    final String methodName = joinPoint.getSignature().getName();
    final String repositoryName = joinPoint.getTarget().getClass().getName();
    LOGGER.info("Start time taken by repository: {}", repositoryName);
    try {
      LOGGER.info("Repository name {}, method {} do commit", repositoryName, methodName);
    } catch (Exception exception) {
      LOGGER.error("Repository name {}, method {} has error: {} do rollback", repositoryName, methodName, exception.getMessage());
    } finally {
      Long timeTaken = System.currentTimeMillis() - startTime;
      LOGGER.info("Repository name {}, method {} time taken {} ms", repositoryName, methodName, timeTaken);
    }
    return joinPoint.proceed();
  }

  @Around(value = "execution(* com.org.workflow.service.*.*(..))", argNames = "joinPoint")
  public Object transaction(ProceedingJoinPoint joinPoint) throws AppException {
    DefaultTransactionDefinition definition = new DefaultTransactionDefinition();
    definition.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
    TransactionStatus transactionStatus = transactionManager.getTransaction(definition);
    Object value;
    try {
      transactionManager.commit(transactionStatus);
      value = joinPoint.proceed();
    } catch (Throwable e) {
      transactionManager.rollback(transactionStatus);
      throw new AppException(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, e.getStackTrace());
    }
    return value;
  }

}

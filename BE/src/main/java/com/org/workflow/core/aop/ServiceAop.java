package com.org.workflow.core.aop;

import com.org.workflow.core.exception.ErrorDetail;
import com.org.workflow.core.exception.WorkFlowException;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class ServiceAop {

  private static final String JOIN_POINT = "joinPoint";

  private static final Logger LOGGER = LoggerFactory.getLogger(ServiceAop.class);

  @Around(value = "execution(* com.org.workflow.service.*.*(..))", argNames = JOIN_POINT)
  public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
    final String methodName = joinPoint.getSignature().getName();
    final String serviceName = joinPoint.getTarget().getClass().getName();
    long startTime = System.currentTimeMillis();
    Object value;
    LOGGER.info("Start time taken by service: {}", serviceName);
    try {
      value = joinPoint.proceed();
      LOGGER.info("Service name: [{}], run method: [{}] do commit.", serviceName, methodName);
    } catch (WorkFlowException error) {
      LOGGER.error("Service name: [{}], method: [{}] has error: [{}] do rollback", serviceName,
        methodName, error.getErrorDetail().getMessage());
      ErrorDetail errorDetail = error.getErrorDetail();
      throw new WorkFlowException(errorDetail);
    } catch (RuntimeException error) {
      LOGGER.error("Service name: [{}], method: [{}] has error: [{}] do rollback", serviceName,
        methodName, error.getMessage());
      throw error;
    } finally {
      Long timeTaken = System.currentTimeMillis() - startTime;
      LOGGER.info("Service name: [{}], method: [{}] time taken {} ms", serviceName, methodName,
        timeTaken);
    }
    return value;
  }

}

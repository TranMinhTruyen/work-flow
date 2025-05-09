package com.org.workflow.domain.aop;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import com.org.workflow.core.common.cnst.CommonConst;
import com.org.workflow.core.common.exception.ErrorMessage;
import com.org.workflow.core.common.exception.WFException;

@Aspect
@Component
public class ServiceAop {

  public static final String SERVICE_POINTCUT =
      "execution(* " + CommonConst.BASE_PACKAGE_NAME + ".domain.service.*.*(..))";
  private static final String JOIN_POINT = "joinPoint";
  private static final Logger LOGGER = LogManager.getLogger(ServiceAop.class);

  @Around(value = SERVICE_POINTCUT, argNames = JOIN_POINT)
  public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
    final String methodName = joinPoint.getSignature().getName();
    final String serviceName = joinPoint.getTarget().getClass().getName();
    long startTime = System.currentTimeMillis();
    Object value;
    LOGGER.info("Start time taken by service: {}", serviceName);
    try {
      value = joinPoint.proceed();
      LOGGER.info("Service name: [{}], run method: [{}] do commit.", serviceName, methodName);
    } catch (WFException error) {
      if (error.getErrorDetail() != null && !error.getErrorDetail().isEmpty()) {
        for (ErrorMessage errorMessage : error.getErrorDetail()) {
          LOGGER.error("Service name: [{}], method: [{}] has error: [{}] do rollback", serviceName,
              methodName, errorMessage);
        }
      }
      throw error;
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

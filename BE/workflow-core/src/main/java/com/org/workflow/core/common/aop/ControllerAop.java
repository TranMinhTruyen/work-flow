package com.org.workflow.core.common.aop;

import com.org.workflow.core.common.cnst.CommonConst;
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

  public static final String CONTROLLER_POINTCUT = "execution(* " + CommonConst.BASE_PACKAGE_NAME + ".controller.*.*(..))";

  private static final Logger LOGGER = LoggerFactory.getLogger(ControllerAop.class);

  @Around(value = CONTROLLER_POINTCUT, argNames = "joinPoint")
  public Object controllerLogger(ProceedingJoinPoint joinPoint) throws Throwable {
    long startTime = System.currentTimeMillis();
    final String methodName = joinPoint.getSignature().getName();
    final String controllerName = joinPoint.getTarget().getClass().getName();
    LOGGER.info("Start time taken by controller: {}", controllerName);
    try {
      LOGGER.info("Controller name: [{}], run method: [{}].", controllerName, methodName);
    } catch (Throwable exception) {
      LOGGER.error("Controller name: [{}], method: [{}] has error: [{}] do rollback",
          controllerName,
          methodName, exception.getMessage());
    } finally {
      Long timeTaken = System.currentTimeMillis() - startTime;
      LOGGER.info("Controller name: [{}], method: [{}] time taken {} ms", controllerName,
          methodName,
          timeTaken);
    }
    return joinPoint.proceed();
  }

}

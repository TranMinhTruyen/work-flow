package com.org.workflow.core.exception;

import com.org.workflow.common.cnst.CoreConst;
import com.org.workflow.controller.AbstractController;
import com.org.workflow.controller.reponse.BaseResponse;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@ControllerAdvice
@RestControllerAdvice
public class ExceptionInterceptor extends AbstractController {

  private static final Logger LOGGER = LoggerFactory.getLogger(ExceptionInterceptor.class);

  @ExceptionHandler(value = WorkFlowException.class)
  public ResponseEntity<BaseResponse> handleAppException(WorkFlowException workFlowException) {
    List<StackTrace> stackTraceList = new ArrayList<>();
    if (workFlowException.getStackTrace() != null && Arrays.stream(
            workFlowException.getStackTrace())
        .findAny().isPresent()) {
      StackTrace stackTrace;
      for (StackTraceElement item : workFlowException.getStackTrace()) {
        if (item.getClassName().contains(CoreConst.CLASS_NAME)) {
          stackTrace = new StackTrace();
          stackTrace.setClassName(item.getClassName());
          stackTrace.setMethodName(item.getMethodName());
          stackTrace.setLineNumber(item.getLineNumber());
          stackTraceList.add(stackTrace);
          LOGGER.error("Class name {}, method {}, line {} has error: {} do rollback",
              item.getClassName(), item.getMethodName(), item.getLineNumber(),
              workFlowException.getErrorDetail().getMessage());
        }
      }
    }
    return returnBaseResponse(stackTraceList, workFlowException.getErrorDetail().getMessage(),
        workFlowException.getErrorDetail().getHttpStatus());
  }

  @ExceptionHandler(Throwable.class)
  public ResponseEntity<BaseResponse> handleException(Throwable exception) {
    BaseResponse baseResponse = BaseResponse.builder().message(exception.getMessage()).build();

    List<StackTrace> stackTraceList = new ArrayList<>();
    if (exception.getStackTrace() != null && Arrays.stream(exception.getStackTrace()).findAny()
        .isPresent()) {
      StackTrace stackTrace;
      for (StackTraceElement item : exception.getStackTrace()) {
        if (item.getClassName().contains(CoreConst.CLASS_NAME)) {
          stackTrace = new StackTrace();
          stackTrace.setClassName(item.getClassName());
          stackTrace.setMethodName(item.getMethodName());
          stackTrace.setLineNumber(item.getLineNumber());
          stackTraceList.add(stackTrace);
          LOGGER.error("Class name {}, method {}, line {} has error: {} do rollback",
              item.getClassName(), item.getMethodName(), item.getLineNumber(),
              exception.getMessage());
        }
      }
      baseResponse.setBody(stackTraceList);
    }
    return returnBaseResponse(stackTraceList, null,
        !(exception instanceof AccessDeniedException) ? HttpStatus.INTERNAL_SERVER_ERROR
            : HttpStatus.UNAUTHORIZED);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<BaseResponse> handleValidationExceptions(
      MethodArgumentNotValidException exception) {
    BaseResponse baseResponse = new BaseResponse();
    Map<String, String> errors = new HashMap<>();
    exception.getBindingResult().getAllErrors().forEach((error) -> {
      String fieldName = ((FieldError) error).getField();
      String errorMessage = error.getDefaultMessage();
      errors.put(fieldName, errorMessage);
    });
    baseResponse.setMessage("Validation failed");
    baseResponse.setBody(errors);
    return new ResponseEntity<>(baseResponse, HttpStatus.BAD_REQUEST);
  }

}

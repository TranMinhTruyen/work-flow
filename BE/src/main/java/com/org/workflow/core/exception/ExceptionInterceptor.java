package com.org.workflow.core.exception;

import static com.org.workflow.common.cnst.CommonConst.CLASS_NAME;

import com.org.workflow.controller.AbstractController;
import com.org.workflow.controller.reponse.BaseResponse;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    if (workFlowException.getStackTrace() != null && Arrays.stream(
        workFlowException.getStackTrace()).findAny().isPresent()) {
      for (StackTraceElement item : workFlowException.getStackTrace()) {
        if (item.getClassName().contains(CLASS_NAME)) {
          LOGGER.error("Class name {}, method {}, line {} has error: {} do rollback",
              item.getClassName(), item.getMethodName(), item.getLineNumber(),
              workFlowException.getErrorDetail().getMessage());
        }
      }
    }
    return returnErrorBaseResponse(workFlowException);
  }

  @ExceptionHandler(Throwable.class)
  public ResponseEntity<BaseResponse> handleException(Throwable exception) {
    if (exception.getStackTrace() != null && Arrays.stream(exception.getStackTrace()).findAny()
        .isPresent()) {
      for (StackTraceElement item : exception.getStackTrace()) {
        if (item.getClassName().contains(CLASS_NAME)) {
          LOGGER.error("Class name {}, method {}, line {} has error: {} do rollback",
              item.getClassName(), item.getMethodName(), item.getLineNumber(),
              exception.getMessage());
        }
      }
    }
    return returnErrorBaseResponse(exception, HttpStatus.INTERNAL_SERVER_ERROR);
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
    baseResponse.setErrorList(errors);
    return new ResponseEntity<>(baseResponse, HttpStatus.BAD_REQUEST);
  }

}

package com.org.workflow.core.exception;

import com.org.workflow.controller.reponse.BaseResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
@RestControllerAdvice
public class AppExceptionHandler {
  
  private static final String CLASS_NAME = "com.org.workflow";
  
  @ExceptionHandler(value = AppException.class)
  public ResponseEntity<BaseResponse> handleAppException(AppException appException) {
    BaseResponse baseResponse = BaseResponse.builder().message(appException.getMessage()).build();
    if (appException.getStackTraceElement() != null && Arrays.stream(appException.getStackTraceElement()).findAny().isPresent()) {
      List<StackTrace> stackTraceList = new ArrayList<>();
      StackTrace stackTrace;
      for(StackTraceElement item: appException.getStackTraceElement()) {
        if (CLASS_NAME.equals(item.getClassName())) {
          stackTrace = new StackTrace();
          stackTrace.setClassName(item.getClassName());
          stackTrace.setMethodName(item.getMethodName());
          stackTrace.setLineNumber(item.getLineNumber());
          stackTraceList.add(stackTrace);
        }
      }
      baseResponse.setBody(stackTraceList);
    }
    return new ResponseEntity<>(baseResponse, HttpStatus.valueOf(appException.getErrorCode().value()));
  }

  @ExceptionHandler({Throwable.class, Exception.class})
  public ResponseEntity<BaseResponse> handleException(Exception exception) {
    BaseResponse baseResponse = BaseResponse.builder().message(exception.getMessage()).build();
    if (exception.getStackTrace() != null && Arrays.stream(exception.getStackTrace()).findAny().isPresent()) {
      List<StackTrace> stackTraceList = new ArrayList<>();
      StackTrace stackTrace;
      for(StackTraceElement item: exception.getStackTrace()) {
        if (CLASS_NAME.equals(item.getClassName())) {
          stackTrace = new StackTrace();
          stackTrace.setClassName(item.getClassName());
          stackTrace.setMethodName(item.getMethodName());
          stackTrace.setLineNumber(item.getLineNumber());
          stackTraceList.add(stackTrace);
        }
      }
      baseResponse.setBody(stackTraceList);
    }
    return new ResponseEntity<>(baseResponse, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<BaseResponse> handleValidationExceptions(MethodArgumentNotValidException exception) {
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

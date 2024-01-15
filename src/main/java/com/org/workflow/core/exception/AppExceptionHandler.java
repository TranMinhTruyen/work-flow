package com.org.workflow.core.exception;

import com.org.workflow.controller.reponse.BaseResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@ControllerAdvice
@RestControllerAdvice
public class AppExceptionHandler {
  
  private static final String CLASS_NAME = "com.org.workflow";
  
  @ExceptionHandler({AppException.class})
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
}

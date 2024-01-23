package com.org.workflow.core.exception;

import com.org.workflow.common.cnst.CoreConst;
import com.org.workflow.controller.reponse.BaseResponse;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
public class AppExceptionHandler {

  @ExceptionHandler(value = AppException.class)
  public ResponseEntity<BaseResponse> handleAppException(AppException appException) {
    BaseResponse baseResponse = BaseResponse.builder()
        .message(appException.getErrorDetail().getMessage()).build();
    if (appException.getStackTrace() != null && Arrays.stream(appException.getStackTrace())
        .findAny().isPresent()) {
      List<StackTrace> stackTraceList = new ArrayList<>();
      StackTrace stackTrace;
      for (StackTraceElement item : appException.getStackTrace()) {
        if (item.getClassName().contains(CoreConst.CLASS_NAME)) {
          stackTrace = new StackTrace();
          stackTrace.setClassName(item.getClassName());
          stackTrace.setMethodName(item.getMethodName());
          stackTrace.setLineNumber(item.getLineNumber());
          stackTraceList.add(stackTrace);
        }
      }
      baseResponse.setBody(stackTraceList);
    }
    return new ResponseEntity<>(baseResponse,
        HttpStatus.valueOf(appException.getErrorDetail().getHttpStatus().value()));
  }

  @ExceptionHandler(Throwable.class)
  public ResponseEntity<BaseResponse> handleException(Throwable exception) {
    BaseResponse baseResponse = BaseResponse.builder().message(exception.getMessage()).build();
    if (exception.getStackTrace() != null && Arrays.stream(exception.getStackTrace()).findAny()
        .isPresent()) {
      List<StackTrace> stackTraceList = new ArrayList<>();
      StackTrace stackTrace;
      for (StackTraceElement item : exception.getStackTrace()) {
        if (item.getClassName().contains(CoreConst.CLASS_NAME)) {
          stackTrace = new StackTrace();
          stackTrace.setClassName(item.getClassName());
          stackTrace.setMethodName(item.getMethodName());
          stackTrace.setLineNumber(item.getLineNumber());
          stackTraceList.add(stackTrace);
        }
      }
      baseResponse.setBody(stackTraceList);
    }
    return new ResponseEntity<>(baseResponse,
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

package com.org.workflow.core.exception;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@Data
@Builder
@EqualsAndHashCode(callSuper = true)
public class AppException extends Exception {
  private final HttpStatus errorCode;
  private final StackTraceElement[] stackTraceElement;

  public AppException(HttpStatus errorCode, StackTraceElement[] stackTraceElement) {
    this.errorCode = errorCode;
    this.stackTraceElement = stackTraceElement;
  }

  public AppException(String message, HttpStatus errorCode, StackTraceElement[] stackTraceElement) {
    super(message);
    this.errorCode = errorCode;
    this.stackTraceElement = stackTraceElement;
  }

  public AppException(String message, Throwable cause, HttpStatus errorCode, StackTraceElement[] stackTraceElement) {
    super(message, cause);
    this.errorCode = errorCode;
    this.stackTraceElement = stackTraceElement;
  }

  public AppException(Throwable cause, HttpStatus errorCode, StackTraceElement[] stackTraceElement) {
    super(cause);
    this.errorCode = errorCode;
    this.stackTraceElement = stackTraceElement;
  }

  public AppException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace, HttpStatus errorCode, StackTraceElement[] stackTraceElement) {
    super(message, cause, enableSuppression, writableStackTrace);
    this.errorCode = errorCode;
    this.stackTraceElement = stackTraceElement;
  }
}

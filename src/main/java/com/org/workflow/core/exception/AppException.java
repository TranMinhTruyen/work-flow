package com.org.workflow.core.exception;

import org.springframework.http.HttpStatus;

public class AppException extends Exception {
  
  private HttpStatus errorCode;
  private StackTraceElement[] stackTraceElement;

  public AppException() {
    super();
  }

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

  public AppException(String message, HttpStatus errorCode) {
    super(message);
    this.errorCode = errorCode;
  }

  public HttpStatus getErrorCode() {
    return errorCode;
  }

  public void setErrorCode(HttpStatus errorCode) {
    this.errorCode = errorCode;
  }

  public StackTraceElement[] getStackTraceElement() {
    return stackTraceElement;
  }

  public void setStackTraceElement(StackTraceElement[] stackTraceElement) {
    this.stackTraceElement = stackTraceElement;
  }
}

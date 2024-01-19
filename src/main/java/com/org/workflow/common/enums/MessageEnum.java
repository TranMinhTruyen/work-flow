package com.org.workflow.common.enums;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum MessageEnum {
  
  ANY_MESSAGE("{0}", null),
  NOT_FOUND("Not found {0}", HttpStatus.NOT_FOUND);

  private final String message;

  private final HttpStatus httpStatus;

  MessageEnum(String message, HttpStatus httpStatus) {
    this.message = message;
    this.httpStatus = httpStatus;
  }
  
}

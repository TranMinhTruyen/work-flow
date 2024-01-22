package com.org.workflow.common.enums;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum MessageEnum {

  //@formatter:off
  
  ANY_MESSAGE("{0}", null),

  UTILITY_CLASS("Utility class", HttpStatus.INTERNAL_SERVER_ERROR),
  
  NOT_FOUND("Not found {0}", HttpStatus.NOT_FOUND),
  
  REQUEST_SUCCESS("Success", HttpStatus.OK),
  
  REQUEST_FAILED("{0} failed", HttpStatus.INTERNAL_SERVER_ERROR),
  
  CREATE_SUCCESS("Create {0} success", HttpStatus.OK),
  
  GET_SUCCESS("Get {0} success", HttpStatus.OK),


  //@formatter:on
  ;

  private final String message;

  private final HttpStatus httpStatus;

  MessageEnum(String message, HttpStatus httpStatus) {
    this.message = message;
    this.httpStatus = httpStatus;
  }

}

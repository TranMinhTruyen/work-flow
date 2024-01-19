package com.org.workflow.core.exception;

import com.org.workflow.common.enums.MessageEnum;
import java.io.Serializable;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class ErrorDetail implements Serializable {

  private String message;

  private HttpStatus httpStatus;

  public ErrorDetail(String message, HttpStatus httpStatus) {
    this.message = message;
    this.httpStatus = httpStatus;
  }

  public ErrorDetail(MessageEnum messageEnum) {
    this.message = messageEnum.getMessage();
    this.httpStatus = messageEnum.getHttpStatus();
  }

  public ErrorDetail(MessageEnum messageEnum, HttpStatus httpStatus) {
    this.message = messageEnum.getMessage();
    this.httpStatus = httpStatus;
  }

}

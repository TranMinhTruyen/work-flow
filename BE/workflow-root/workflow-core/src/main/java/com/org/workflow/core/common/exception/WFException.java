package com.org.workflow.core.common.exception;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class WFException extends AbstractException {

  private ErrorDetail errorDetail;
  
  private String messageCode;

  public WFException(ErrorDetail errorDetail) {
    this.errorDetail = errorDetail;
  }

  public WFException(ErrorDetail errorDetail, String messageCode) {
    this.errorDetail = errorDetail;
    this.messageCode = messageCode;
  }

}

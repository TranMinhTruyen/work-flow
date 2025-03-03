package com.org.workflow.core.common.exception;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class WFException extends AbstractException {

  private final ErrorDetail errorDetail;

  public WFException(ErrorDetail errorDetail) {
    this.errorDetail = errorDetail;
  }

}

package com.org.workflow.core.exception;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class WorkFlowException extends AbstractException {

  private final ErrorDetail errorDetail;

  public WorkFlowException(ErrorDetail errorDetail) {
    this.errorDetail = errorDetail;
  }

}

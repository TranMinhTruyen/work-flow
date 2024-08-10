package com.org.workflow.core.exception;

import com.org.workflow.common.enums.MessageEnum;
import java.text.MessageFormat;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class WorkFlowException extends AbstractException {

  private final ErrorDetail errorDetail;

  public WorkFlowException(ErrorDetail errorDetail) {
    this.errorDetail = errorDetail;
  }

  public WorkFlowException(MessageEnum messageEnum, Object... args) {
    this.errorDetail = new ErrorDetail(MessageFormat.format(messageEnum.getMessage(), args),
        messageEnum.getHttpStatus());
  }

}

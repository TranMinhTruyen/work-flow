package com.org.workflow.core.exception;

import java.text.MessageFormat;

import com.org.workflow.common.enums.MessageEnum;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AppException extends AbstractException {

  private final ErrorDetail errorDetail;

  public AppException(ErrorDetail errorDetail) {
    this.errorDetail = errorDetail;
  }

  public AppException(MessageEnum messageEnum, Object... args) {
    this.errorDetail = new ErrorDetail(MessageFormat.format(messageEnum.getMessage(), args),
        messageEnum.getHttpStatus());
  }

}

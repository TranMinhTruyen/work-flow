package com.org.workflow.core.exception;

import com.org.workflow.common.enums.MessageEnum;
import java.io.Serializable;
import java.text.MessageFormat;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AppException extends AbstractException implements Serializable {

  private final ErrorDetail errorDetail;

  public AppException(ErrorDetail errorDetail) {
    this.errorDetail = errorDetail;
  }

  public AppException(MessageEnum messageEnum, Object... args) {
    this.errorDetail = new ErrorDetail(MessageFormat.format(messageEnum.getMessage(), args),
        messageEnum.getHttpStatus());
  }

}

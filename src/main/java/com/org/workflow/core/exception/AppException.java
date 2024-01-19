package com.org.workflow.core.exception;

import com.org.workflow.common.enums.MessageEnum;
import java.text.MessageFormat;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;

@Setter
@Getter
public class AppException extends AbstractException {

  private ErrorDetail errorDetail;

  public AppException(ErrorDetail errorDetail) {
    this.errorDetail = errorDetail;
  }

  public AppException(String message, HttpStatus errorCode) {
    this.errorDetail = new ErrorDetail(message, errorCode);
  }

  public AppException(MessageEnum messageEnum) {
    this.errorDetail = new ErrorDetail(messageEnum.getMessage(), messageEnum.getHttpStatus());
  }

  public AppException(MessageEnum messageEnum, HttpStatus httpStatus) {
    this.errorDetail = new ErrorDetail(messageEnum.getMessage(), httpStatus);
  }

  public AppException(MessageEnum messageEnum, HttpStatus httpStatus, Object... args) {
    this.errorDetail = new ErrorDetail(MessageFormat.format(messageEnum.getMessage(), args),
        httpStatus);
  }

  public AppException(MessageEnum messageEnum, HttpStatus httpStatus, String prefix,
      Object... args) {
    if (StringUtils.isBlank(prefix)) {
      this.errorDetail = new ErrorDetail(MessageFormat.format(messageEnum.getMessage(), args),
          httpStatus);
    } else {
      String message = MessageFormat.format(messageEnum.getMessage(), args);
      this.errorDetail = new ErrorDetail(prefix.concat(message), httpStatus);
    }
  }

}

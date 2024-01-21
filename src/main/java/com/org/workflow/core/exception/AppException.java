package com.org.workflow.core.exception;

import com.org.workflow.common.enums.MessageEnum;
import java.io.Serializable;
import java.text.MessageFormat;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;

@Setter
@Getter
public class AppException extends AbstractException implements Serializable {

  private final ErrorDetail errorDetail;

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

  public AppException(String message, HttpStatus httpStatus, String prefix, Object... args) {
    if (StringUtils.isBlank(prefix)) {
      this.errorDetail = new ErrorDetail(MessageFormat.format(message, args), httpStatus);
    } else {
      this.errorDetail = new ErrorDetail(prefix.concat(MessageFormat.format(message, args)),
          httpStatus);
    }
  }

  public AppException(MessageEnum messageEnum, String prefix) {
    if (StringUtils.isBlank(prefix)) {
      this.errorDetail = new ErrorDetail(messageEnum.getMessage(), messageEnum.getHttpStatus());
    } else {
      this.errorDetail = new ErrorDetail(prefix.concat(messageEnum.getMessage()),
          messageEnum.getHttpStatus());
    }
  }

  public AppException(MessageEnum messageEnum, Object... args) {
    this.errorDetail = new ErrorDetail(MessageFormat.format(messageEnum.getMessage(), args),
        messageEnum.getHttpStatus());
  }

  public AppException(MessageEnum messageEnum, String prefix, Object... args) {
    if (StringUtils.isBlank(prefix)) {
      this.errorDetail = new ErrorDetail(MessageFormat.format(messageEnum.getMessage(), args),
          messageEnum.getHttpStatus());
    } else {
      this.errorDetail = new ErrorDetail(
          prefix.concat(MessageFormat.format(messageEnum.getMessage(), args)),
          messageEnum.getHttpStatus());
    }
  }

  public AppException(MessageEnum messageEnum, HttpStatus httpStatus, String prefix,
      Object... args) {
    if (StringUtils.isBlank(prefix)) {
      this.errorDetail = new ErrorDetail(MessageFormat.format(messageEnum.getMessage(), args),
          httpStatus);
    } else {
      this.errorDetail = new ErrorDetail(
          prefix.concat(MessageFormat.format(messageEnum.getMessage(), args)), httpStatus);
    }
  }

}

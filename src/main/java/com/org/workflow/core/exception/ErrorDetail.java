package com.org.workflow.core.exception;

import com.org.workflow.common.enums.MessageEnum;
import java.io.Serializable;
import java.text.MessageFormat;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;

@Data
public class ErrorDetail implements Serializable {

  private String message;

  private HttpStatus httpStatus;

  public ErrorDetail() {
  }

  public ErrorDetail(String message, HttpStatus httpStatus) {
    this.message = message;
    this.httpStatus = httpStatus;
  }

  public ErrorDetail(MessageEnum messageEnum) {
    this.message = messageEnum.getMessage();
    this.httpStatus = messageEnum.getHttpStatus();
  }

  public ErrorDetail(MessageEnum messageEnum, Object... args) {
    this.message = MessageFormat.format(messageEnum.getMessage(), args);
    this.httpStatus = messageEnum.getHttpStatus();
  }

  public ErrorDetail(MessageEnum messageEnum, String prefix, Object... args) {
    if (StringUtils.isBlank(prefix)) {
      this.message = MessageFormat.format(messageEnum.getMessage(), args);
    } else {
      this.message = prefix.concat(MessageFormat.format(messageEnum.getMessage(), args));
    }
    this.httpStatus = messageEnum.getHttpStatus();
  }

}

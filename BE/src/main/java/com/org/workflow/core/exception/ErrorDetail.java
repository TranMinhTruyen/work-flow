package com.org.workflow.core.exception;

import com.org.workflow.common.enums.MessageEnum;
import java.io.Serializable;
import java.text.MessageFormat;
import java.util.List;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;

@Data
public class ErrorDetail implements Serializable {

  private List<Error> message;

  private HttpStatus httpStatus;

  public ErrorDetail() {
  }

  public ErrorDetail(MessageEnum messageEnum) {
    Error error = new Error();
    error.setErrorCode(messageEnum.getMessageCode());
    error.setErrorMessage(messageEnum.getMessage());
    this.message.add(error);
    this.httpStatus = messageEnum.getHttpStatus();
  }

  public ErrorDetail(MessageEnum messageEnum, String prefix, Object... args) {
    String value;
    if (StringUtils.isBlank(prefix)) {
      value = MessageFormat.format(messageEnum.getMessage(), args);
    } else {
      value = prefix.concat(MessageFormat.format(messageEnum.getMessage(), args));
    }
    Error error = new Error();
    error.setErrorCode(messageEnum.getMessageCode());
    error.setErrorMessage(value);
    this.message.add(error);
    this.httpStatus = messageEnum.getHttpStatus();
  }

}

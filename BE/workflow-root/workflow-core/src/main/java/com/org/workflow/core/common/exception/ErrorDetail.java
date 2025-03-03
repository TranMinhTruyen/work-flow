package com.org.workflow.core.common.exception;

import com.org.workflow.core.common.enums.MessageEnum;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;

import java.io.Serializable;
import java.text.MessageFormat;
import java.util.List;

@Data
public class ErrorDetail implements Serializable {

  private List<ErrorMessage> errorMessageList;

  private HttpStatus httpStatus;

  public ErrorDetail() {
  }

  public ErrorDetail(MessageEnum messageEnum) {
    ErrorMessage errorMessage = new ErrorMessage();
    errorMessage.setErrorCode(messageEnum.getMessageCode());
    errorMessage.setErrorMessage(messageEnum.getMessage());
    this.errorMessageList.add(errorMessage);
    this.httpStatus = messageEnum.getHttpStatus();
  }

  public ErrorDetail(MessageEnum messageEnum, String prefix, Object... args) {
    String value;
    if (StringUtils.isBlank(prefix)) {
      value = MessageFormat.format(messageEnum.getMessage(), args);
    } else {
      value = prefix.concat(MessageFormat.format(messageEnum.getMessage(), args));
    }
    ErrorMessage errorMessage = new ErrorMessage();
    errorMessage.setErrorCode(messageEnum.getMessageCode());
    errorMessage.setErrorMessage(value);
    this.errorMessageList.add(errorMessage);
    this.httpStatus = messageEnum.getHttpStatus();
  }

}

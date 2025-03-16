package com.org.workflow.core.common.exception;

import java.io.Serializable;
import java.util.List;

import org.springframework.http.HttpStatus;

import com.org.workflow.core.common.enums.MessageEnum;

import lombok.Data;

@Data
public class ErrorDetail implements Serializable {

  private List<ErrorMessage> errorMessageList;

  private HttpStatus httpStatus;

  public ErrorDetail() {
  }

  public ErrorDetail(MessageEnum messageEnum) {
    ErrorMessage errorMessage = new ErrorMessage();
    errorMessage.setErrorCode(messageEnum.getMessageCode());
    this.errorMessageList.add(errorMessage);
    this.httpStatus = messageEnum.getHttpStatus();
  }

}

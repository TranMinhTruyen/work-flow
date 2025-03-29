package com.org.workflow.core.common.exception;

import java.util.List;

import org.springframework.http.HttpStatus;

import com.org.workflow.core.common.enums.MessageEnum;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class WFException extends AbstractException {

  private List<ErrorMessage> errorDetail;

  private HttpStatus httpStatus;

  private String messageCode;

  private MessageEnum messageEnum;

  public WFException(MessageEnum messageEnum) {
    this.messageCode = messageEnum.getMessageCode();
    this.httpStatus = messageEnum.getHttpStatus();
    this.messageEnum = messageEnum;
  }

  public WFException(List<ErrorMessage> errorDetail, MessageEnum messageEnum) {
    this.errorDetail = errorDetail;
    this.messageCode = messageEnum.getMessageCode();
    this.httpStatus = messageEnum.getHttpStatus();
    this.messageEnum = messageEnum;
  }

}

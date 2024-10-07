package com.org.workflow.core.exception;

import com.org.workflow.common.enums.MessageEnum;
import java.io.Serializable;
import java.text.MessageFormat;
import java.util.HashMap;
import java.util.Map;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;

@Data
public class ErrorDetail implements Serializable {

  private Map<String, String> message;

  private HttpStatus httpStatus;

  public ErrorDetail(Map<String, String> message, HttpStatus httpStatus) {
    this.message = message;
    this.httpStatus = httpStatus;
  }

  public ErrorDetail(MessageEnum messageEnum) {
    Map<String, String> messageMap = new HashMap<>();
    messageMap.put(messageEnum.getMessageCode(), messageEnum.getMessage());
    this.message = messageMap;
    this.httpStatus = messageEnum.getHttpStatus();
  }

  public ErrorDetail(MessageEnum messageEnum, Object... args) {
    Map<String, String> messageMap = new HashMap<>();
    messageMap.put(messageEnum.getMessageCode(),
      MessageFormat.format(messageEnum.getMessage(), args));
    this.message = messageMap;
    this.httpStatus = messageEnum.getHttpStatus();
  }

  public ErrorDetail(MessageEnum messageEnum, String prefix, Object... args) {
    String value;
    if (StringUtils.isBlank(prefix)) {
      value = MessageFormat.format(messageEnum.getMessage(), args);
    } else {
      value = prefix.concat(MessageFormat.format(messageEnum.getMessage(), args));
    }
    Map<String, String> messageMap = new HashMap<>();
    messageMap.put(messageEnum.getMessageCode(), value);
    this.message = messageMap;
    this.httpStatus = messageEnum.getHttpStatus();
  }

}

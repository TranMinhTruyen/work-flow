package com.org.workflow.common.utils;

import com.org.workflow.common.enums.MessageEnum;
import com.org.workflow.core.exception.ErrorDetail;
import com.org.workflow.service.MessageService;
import java.text.MessageFormat;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ErrorDetailUtil {

  private final MessageService messageService;

  public ErrorDetail setErrorDetail(MessageEnum messageEnum, String language, Object... args) {
    String value = MessageFormat.format(messageService.getMessage(messageEnum, language), args);
    Map<String, String> messageMap = new HashMap<>();
    messageMap.put(messageEnum.getMessageCode(), value);

    ErrorDetail errorDetail = new ErrorDetail();

    errorDetail.setMessage(messageMap);
    errorDetail.setHttpStatus(messageEnum.getHttpStatus());

    return errorDetail;
  }

}

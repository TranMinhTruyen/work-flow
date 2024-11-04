package com.org.workflow.service;

import com.org.workflow.common.enums.MessageEnum;
import com.org.workflow.core.exception.ErrorDetail;
import com.org.workflow.core.exception.WorkFlowException;
import java.text.MessageFormat;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

/**
 * @author minh-truyen
 */
@Service
@RequiredArgsConstructor
public class ExceptionService {

  private final MessageSource messageSource;

  /**
   * @param messageEnum MessageEnum
   * @param language    String
   * @return String
   */
  private String getMessage(MessageEnum messageEnum, String language) {
    Locale locale = Locale.forLanguageTag(language);
    return messageSource.getMessage(messageEnum.getMessageCode(), null, locale);
  }

  /**
   * @param messageEnum MessageEnum
   * @param language    String
   * @param args        Object
   * @return WorkFlowException
   */
  public WorkFlowException getWorkFlowException(MessageEnum messageEnum, String language,
      Object... args) {
    String value = MessageFormat.format(this.getMessage(messageEnum, language), args);
    Map<String, String> messageMap = new HashMap<>();
    messageMap.put(messageEnum.getMessageCode(), value);

    ErrorDetail errorDetail = new ErrorDetail();

    errorDetail.setMessage(messageMap);
    errorDetail.setHttpStatus(messageEnum.getHttpStatus());

    return new WorkFlowException(errorDetail);
  }

}

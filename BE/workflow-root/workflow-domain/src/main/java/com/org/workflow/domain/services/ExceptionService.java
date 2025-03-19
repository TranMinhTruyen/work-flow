package com.org.workflow.domain.services;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang3.StringUtils;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import com.org.workflow.core.common.enums.MessageEnum;
import com.org.workflow.core.common.exception.ErrorMessage;
import com.org.workflow.core.common.exception.WFException;

import lombok.RequiredArgsConstructor;

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
  private String getMessage(MessageEnum messageEnum, String language, Object... args) {
    Locale locale = Locale.forLanguageTag(language);
    return messageSource.getMessage(messageEnum.getMessageCode(), args, locale);
  }

  /**
   * @param messageEnum MessageEnum
   * @param language    String
   * @param args        Object
   * @return WorkFlowException
   */
  public WFException getWFException(MessageEnum messageEnum, String language, Object... args) {
    String value = getMessage(messageEnum, language, args);
    ErrorMessage error = new ErrorMessage();
    error.setErrorCode(messageEnum.getMessageCode());
    error.setErrorMessage(value);

    List<ErrorMessage> errorDetail = new ArrayList<>();
    errorDetail.add(error);

    return new WFException(errorDetail, messageEnum);
  }

  /**
   * throw WorkFlowException
   *
   * @param messageList Map<MessageEnum, List<String>> key: MessageEnum, value: List<String> args of
   *                    MessageEnum
   * @param language    String
   * @param messageEnum MessageEnum
   * @return WorkFlowException
   */
  public WFException getWFException(Map<MessageEnum, List<String>> messageList, String language,
      MessageEnum messageEnum) {
    List<ErrorMessage> errorDetail = new ArrayList<>();

    for (Entry<MessageEnum, List<String>> entry : messageList.entrySet()) {
      String value = getMessage(entry.getKey(), language, entry.getValue());
      ErrorMessage error = new ErrorMessage();
      error.setErrorCode(entry.getKey().getMessageCode());
      error.setErrorMessage(value);
      errorDetail.add(error);
    }

    return new WFException(errorDetail, messageEnum);
  }

  public WFException getWFException(MessageEnum messageEnum, String language, String prefix,
      Object... args) {
    String message = getMessage(messageEnum, language, args);
    String value;
    if (StringUtils.isBlank(prefix)) {
      value = MessageFormat.format(message, args);
    } else {
      value = prefix.concat(MessageFormat.format(message, args));
    }
    ErrorMessage error = new ErrorMessage();
    error.setErrorCode(messageEnum.getMessageCode());
    error.setErrorMessage(value);

    List<ErrorMessage> errorDetail = new ArrayList<>();
    errorDetail.add(error);

    return new WFException(errorDetail, messageEnum);
  }

}

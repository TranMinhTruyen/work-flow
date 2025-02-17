package com.org.workflow.domain.services;

import com.org.workflow.core.common.enums.MessageEnum;
import com.org.workflow.core.common.exception.ErrorDetail;
import com.org.workflow.core.common.exception.ErrorMessage;
import com.org.workflow.core.common.exception.WFException;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Map.Entry;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
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
  public WFException getWFException(MessageEnum messageEnum, String language,
      Object... args) {
    String value = getMessage(messageEnum, language, args);
    ErrorMessage error = new ErrorMessage();
    error.setErrorCode(messageEnum.getMessageCode());
    error.setErrorMessage(value);

    List<ErrorMessage> errorMessageList = new ArrayList<>();
    errorMessageList.add(error);

    ErrorDetail errorDetail = new ErrorDetail();
    errorDetail.setErrorMessageList(errorMessageList);
    errorDetail.setHttpStatus(messageEnum.getHttpStatus());

    return new WFException(errorDetail);
  }

  /**
   * throw WorkFlowException
   *
   * @param messageList Map<MessageEnum, List<String>> key: MessageEnum, value: List<String> args of
   *                    MessageEnum
   * @param language    String
   * @param httpStatus  HttpStatus
   * @return WorkFlowException
   */
  public WFException getWFException(Map<MessageEnum, List<String>> messageList,
      String language, HttpStatus httpStatus) {
    List<ErrorMessage> errorMessageList = new ArrayList<>();

    for (Entry<MessageEnum, List<String>> entry : messageList.entrySet()) {
      String value = getMessage(entry.getKey(), language, entry.getValue());
      ErrorMessage error = new ErrorMessage();
      error.setErrorCode(entry.getKey().getMessageCode());
      error.setErrorMessage(value);
      errorMessageList.add(error);
    }

    ErrorDetail errorDetail = new ErrorDetail();
    errorDetail.setErrorMessageList(errorMessageList);
    errorDetail.setHttpStatus(httpStatus);

    return new WFException(errorDetail);
  }

}

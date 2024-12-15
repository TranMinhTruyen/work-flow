package com.org.workflow.service;

import com.org.workflow.common.enums.MessageEnum;
import com.org.workflow.controller.reponse.common.Error;
import com.org.workflow.core.exception.ErrorDetail;
import com.org.workflow.core.exception.WorkFlowException;
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
  public WorkFlowException getWorkFlowException(MessageEnum messageEnum, String language,
      Object... args) {
    String value = getMessage(messageEnum, language, args);
    Error error = new Error();
    error.setErrorCode(messageEnum.getMessageCode());
    error.setErrorMessage(value);

    List<Error> errorList = new ArrayList<>();
    errorList.add(error);

    ErrorDetail errorDetail = new ErrorDetail();
    errorDetail.setMessage(errorList);
    errorDetail.setHttpStatus(messageEnum.getHttpStatus());

    return new WorkFlowException(errorDetail);
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
  public WorkFlowException getWorkFlowException(Map<MessageEnum, List<String>> messageList,
      String language, HttpStatus httpStatus) {
    List<Error> errorList = new ArrayList<>();

    for (Entry<MessageEnum, List<String>> entry : messageList.entrySet()) {
      String value = getMessage(entry.getKey(), language, entry.getValue());
      Error error = new Error();
      error.setErrorCode(entry.getKey().getMessageCode());
      error.setErrorMessage(value);
      errorList.add(error);
    }

    ErrorDetail errorDetail = new ErrorDetail();
    errorDetail.setMessage(errorList);
    errorDetail.setHttpStatus(httpStatus);

    return new WorkFlowException(errorDetail);
  }

}

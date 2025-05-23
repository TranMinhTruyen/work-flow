package com.org.workflow.interceptor;

import static com.org.workflow.core.common.cnst.CommonConst.BASE_PACKAGE_NAME;
import static com.org.workflow.core.common.enums.MessageTypeEnum.WARN;
import static com.org.workflow.domain.utils.CommonUtil.getAttributes;
import static com.org.workflow.domain.utils.CommonUtil.getLanguageFromRequest;
import static com.org.workflow.domain.utils.ValidateUtil.formatValidateMessage;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.org.workflow.controller.AbstractController;
import com.org.workflow.core.common.enums.MessageEnum;
import com.org.workflow.core.common.enums.MessageTypeEnum;
import com.org.workflow.core.common.enums.ValidateEnum;
import com.org.workflow.core.common.exception.ErrorMessage;
import com.org.workflow.core.common.exception.WFException;
import com.org.workflow.domain.dto.response.common.BaseResponse;

import lombok.RequiredArgsConstructor;

@RestControllerAdvice
@RequiredArgsConstructor
public class ExceptionInterceptor extends AbstractController {

  private static final Logger LOGGER = LogManager.getLogger(ExceptionInterceptor.class);

  private final MessageSource messageSource;

  @ExceptionHandler(value = WFException.class)
  public ResponseEntity<BaseResponse> handleAppException(WFException WFException) {
    if (WFException.getMessageEnum().getMessageType().equals(WARN)) {
      for (StackTraceElement item : WFException.getStackTrace()) {
        if (item.getClassName().contains(BASE_PACKAGE_NAME)) {
          LOGGER.warn("Class name {}, method {}, line {} has error: {} do rollback",
              item.getClassName(), item.getMethodName(), item.getLineNumber(),
              WFException.getErrorDetail());
        }
      }
      return returnWarnBaseResponse(WFException);
    }
    if (WFException.getStackTrace() != null && Arrays.stream(WFException.getStackTrace()).findAny()
        .isPresent()) {
      for (StackTraceElement item : WFException.getStackTrace()) {
        if (item.getClassName().contains(BASE_PACKAGE_NAME)) {
          LOGGER.error("Class name {}, method {}, line {} has error: {} do rollback",
              item.getClassName(), item.getMethodName(), item.getLineNumber(),
              WFException.getErrorDetail());
        }
      }
    }
    return returnErrorBaseResponse(WFException);
  }

  @ExceptionHandler(Throwable.class)
  public ResponseEntity<BaseResponse> handleException(Throwable exception) {
    if (exception.getStackTrace() != null && Arrays.stream(exception.getStackTrace()).findAny()
        .isPresent()) {
      for (StackTraceElement item : exception.getStackTrace()) {
        if (item.getClassName().contains(BASE_PACKAGE_NAME)) {
          LOGGER.error("Class name {}, method {}, line {} has error: {} do rollback",
              item.getClassName(), item.getMethodName(), item.getLineNumber(),
              exception.getMessage());
        }
      }
    }
    return returnErrorBaseResponse(exception, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<BaseResponse> handleException(RuntimeException exception) {
    if (exception.getCause() != null && exception.getCause() instanceof WFException) {
      return returnErrorBaseResponse((WFException) exception.getCause());
    }
    if (exception.getStackTrace() != null && Arrays.stream(exception.getStackTrace()).findAny()
        .isPresent()) {
      for (StackTraceElement item : exception.getStackTrace()) {
        if (item.getClassName().contains(BASE_PACKAGE_NAME)) {
          LOGGER.error("Class name {}, method {}, line {} has error: {} do rollback",
              item.getClassName(), item.getMethodName(), item.getLineNumber(),
              exception.getMessage());
        }
      }
    }
    return returnErrorBaseResponse(exception, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<BaseResponse> handleValidationExceptions(
      MethodArgumentNotValidException exception) {
    BindingResult bindingResult = exception.getBindingResult();

    String language = getLanguageFromRequest(bindingResult.getTarget());
    Locale locale = Locale.forLanguageTag(language);

    BaseResponse baseResponse = new BaseResponse();
    List<ErrorMessage> errorList = bindingResult.getAllErrors().stream().map(error -> {
          FieldError fieldError = (FieldError) error;
          ErrorMessage errorItem = new ErrorMessage();

          // Get field name
          String fieldName = fieldError.getField().replace("payload", "");

          // Get messageId from annotation
          String messageId = fieldError.getDefaultMessage();

          // Get all attribute from annotation
          Map<String, Object> attr = getAttributes(fieldError);

          // format message
          String errorMessage =
              formatValidateMessage(fieldName, ValidateEnum.fromMessageCode(messageId), attr,
                  messageSource, locale);

          errorItem.setErrorOrder(attr.get("order").toString());
          errorItem.setErrorCode(error.getDefaultMessage());
          errorItem.setErrorMessage(errorMessage);
          return errorItem;
        }).sorted(Comparator.comparing((ErrorMessage x) -> Integer.parseInt(x.getErrorOrder())))
        .toList();

    baseResponse.setMessageType(MessageTypeEnum.ERROR);
    baseResponse.setMessageCode(MessageEnum.VALIDATION_FAILED.getMessageCode());
    baseResponse.setErrorList(errorList);
    return new ResponseEntity<>(baseResponse, HttpStatus.BAD_REQUEST);
  }

}

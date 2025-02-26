package com.org.workflow.interceptor;


import static com.org.workflow.core.common.cnst.CommonConst.CLASS_NAME;
import static com.org.workflow.domain.utils.CommonUtil.getAttributes;
import static com.org.workflow.domain.utils.CommonUtil.getLanguageFromRequest;
import static com.org.workflow.domain.utils.ValidateUtil.formatValidateMessage;

import com.org.workflow.controller.AbstractController;
import com.org.workflow.core.common.enums.MessageTypeEnum;
import com.org.workflow.core.common.exception.ErrorMessage;
import com.org.workflow.core.common.exception.WFException;
import com.org.workflow.domain.dto.response.common.BaseResponse;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@ControllerAdvice
@RestControllerAdvice
@RequiredArgsConstructor
public class ExceptionInterceptor extends AbstractController {

  private static final Logger LOGGER = LoggerFactory.getLogger(ExceptionInterceptor.class);

  private final MessageSource messageSource;

  private final DefaultErrorAttributes errorAttributes;


  @ExceptionHandler(value = WFException.class)
  public ResponseEntity<BaseResponse> handleAppException(WFException WFException) {
    if (WFException.getStackTrace() != null && Arrays.stream(
        WFException.getStackTrace()).findAny().isPresent()) {
      for (StackTraceElement item : WFException.getStackTrace()) {
        if (item.getClassName().contains(CLASS_NAME)) {
          LOGGER.error("Class name {}, method {}, line {} has error: {} do rollback",
              item.getClassName(), item.getMethodName(), item.getLineNumber(),
              WFException.getErrorDetail().getErrorMessageList());
        }
      }
    }
    return returnErrorBaseResponse(WFException);
  }

//  @ExceptionHandler(Throwable.class)
//  public ResponseEntity<BaseResponse> handleException(Throwable exception) {
//    if (exception.getStackTrace() != null && Arrays.stream(exception.getStackTrace()).findAny()
//        .isPresent()) {
//      for (StackTraceElement item : exception.getStackTrace()) {
//        if (item.getClassName().contains(CLASS_NAME)) {
//          LOGGER.error("Class name {}, method {}, line {} has error: {} do rollback",
//              item.getClassName(), item.getMethodName(), item.getLineNumber(),
//              exception.getMessage());
//        }
//      }
//    }
//    return returnErrorBaseResponse(exception, HttpStatus.INTERNAL_SERVER_ERROR);
//  }


  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<BaseResponse> handleValidationExceptions(
      MethodArgumentNotValidException exception) {
    BindingResult bindingResult = exception.getBindingResult();

    String language = getLanguageFromRequest(bindingResult.getTarget());
    Locale locale = Locale.forLanguageTag(language);

    BaseResponse baseResponse = new BaseResponse();
    List<ErrorMessage> errorList = bindingResult.getAllErrors().stream()
        .map(error -> {
          FieldError fieldError = (FieldError) error;
          ErrorMessage errorItem = new ErrorMessage();

          // Get field name
          String fieldName = fieldError.getField();

          // Get messageId from annotation
          String messageId = fieldError.getDefaultMessage();

          // Get all attribute from annotation
          Map<String, Object> attr = getAttributes(fieldError);

          // format message
          String errorMessage = formatValidateMessage(fieldName, messageId, attr, messageSource,
              locale);

          errorItem.setErrorOrder(attr.get("order").toString());
          errorItem.setErrorCode(error.getDefaultMessage());
          errorItem.setErrorMessage(errorMessage);
          return errorItem;
        }).sorted(Comparator.comparing((ErrorMessage x) -> Integer.parseInt(x.getErrorOrder())))
        .toList();

    baseResponse.setMessageType(MessageTypeEnum.ERROR);
    baseResponse.setMessage("Validation failed");
    baseResponse.setErrorList(errorList);
    return new ResponseEntity<>(baseResponse, HttpStatus.BAD_REQUEST);
  }

}

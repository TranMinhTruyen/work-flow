package com.org.workflow.core.exception;

import static com.org.workflow.common.cnst.CommonConst.CLASS_NAME;

import com.org.workflow.controller.AbstractController;
import com.org.workflow.controller.reponse.common.BaseResponse;
import com.org.workflow.controller.reponse.common.Error;
import com.org.workflow.controller.request.BaseRequest;
import jakarta.validation.ConstraintViolation;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

  @ExceptionHandler(value = WorkFlowException.class)
  public ResponseEntity<BaseResponse> handleAppException(WorkFlowException workFlowException) {
    if (workFlowException.getStackTrace() != null && Arrays.stream(
        workFlowException.getStackTrace()).findAny().isPresent()) {
      for (StackTraceElement item : workFlowException.getStackTrace()) {
        if (item.getClassName().contains(CLASS_NAME)) {
          LOGGER.error("Class name {}, method {}, line {} has error: {} do rollback",
              item.getClassName(), item.getMethodName(), item.getLineNumber(),
              workFlowException.getErrorDetail().getMessage());
        }
      }
    }
    return returnErrorBaseResponse(workFlowException);
  }

  @ExceptionHandler(Throwable.class)
  public ResponseEntity<BaseResponse> handleException(Throwable exception) {
    if (exception.getStackTrace() != null && Arrays.stream(exception.getStackTrace()).findAny()
        .isPresent()) {
      for (StackTraceElement item : exception.getStackTrace()) {
        if (item.getClassName().contains(CLASS_NAME)) {
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
    List<Error> errorList = bindingResult.getAllErrors().stream()
        .map(error -> {
          Error errorItem = new Error();

          String fieldName = ((FieldError) error).getField();
          String errorMessage = messageSource.getMessage(
              Objects.requireNonNull(error.getDefaultMessage()),
              new Object[]{fieldName},
              locale);

          errorItem.setErrorCode(error.getDefaultMessage());
          errorItem.setErrorMessage(errorMessage);
          return errorItem;
        }).toList();

    baseResponse.setMessage("Validation failed");
    baseResponse.setErrorList(errorList);
    return new ResponseEntity<>(baseResponse, HttpStatus.BAD_REQUEST);
  }

  /**
   * Get language from payload.
   *
   * @param target Object
   * @return String
   */
  private String getLanguageFromRequest(Object target) {
    try {
      if (target instanceof BaseRequest<?> baseRequest) {
        return baseRequest.getLanguage();
      }
      return "en";
    } catch (Exception e) {
      return "en";
    }
  }

  private List<Object> getAttributes(FieldError error) {
    List<Object> returnAttributes = new ArrayList<>();
    Map<String, Object> attributes = null;
    if (error.unwrap(ConstraintViolation.class) != null) {
      ConstraintViolation<?> violation = error.unwrap(ConstraintViolation.class);
      attributes = violation.getConstraintDescriptor().getAttributes();
    }

    for (Entry<String, Object> item : attributes.entrySet()) {
      if (item.getKey().equals("message") || item.getKey().equals("groups") || item.getKey()
          .equals("payload")) {
        continue;
      }

      returnAttributes.add(item.getValue());
    }

    return returnAttributes;
  }

}

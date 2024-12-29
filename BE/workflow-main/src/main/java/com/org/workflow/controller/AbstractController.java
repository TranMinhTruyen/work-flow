package com.org.workflow.controller;

import com.org.workflow.core.common.enums.MessageEnum;
import com.org.workflow.core.common.enums.MessageTypeEnum;
import com.org.workflow.core.common.exception.WFException;
import com.org.workflow.domain.dto.reponse.common.BaseResponse;
import jakarta.annotation.Nullable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.text.MessageFormat;

import static com.org.workflow.core.common.enums.MessageEnum.SERVER_ERROR;
import static org.springframework.http.MediaType.APPLICATION_JSON;

/**
 *
 */
@CrossOrigin
public abstract class AbstractController {

  /**
   * @param body       Object
   * @param message    String
   * @param httpStatus HttpStatus
   * @return BaseResponse
   */
  protected ResponseEntity<BaseResponse> returnBaseResponse(@Nullable Object body,
                                                            @Nullable String message, @Nullable MessageTypeEnum messageType, HttpStatus httpStatus) {
    BaseResponse baseResponse = new BaseResponse();
    baseResponse.setMessageType(messageType);
    baseResponse.setMessage(message);
    baseResponse.setBody(body);
    HttpHeaders header = new HttpHeaders();
    header.setContentType(APPLICATION_JSON);
    return new ResponseEntity<>(baseResponse, header, httpStatus);
  }

  /**
   * @param body        Object
   * @param messageEnum MessageEnum
   * @param messageArgs Object
   * @return BaseResponse
   */
  protected ResponseEntity<BaseResponse> returnBaseResponse(HttpStatus httpStatus,
                                                            @Nullable Object body, MessageEnum messageEnum, Object... messageArgs) {
    BaseResponse baseResponse = new BaseResponse();
    baseResponse.setMessageType(messageEnum.getMessageType());
    baseResponse.setMessageCode(messageEnum.getMessageCode());
    baseResponse.setMessage(MessageFormat.format(messageEnum.getMessage(), messageArgs));
    baseResponse.setBody(body);
    HttpHeaders header = new HttpHeaders();
    header.setContentType(APPLICATION_JSON);
    return new ResponseEntity<>(baseResponse, header, httpStatus);
  }

  /**
   * @param body        Object
   * @param messageEnum MessageEnum
   * @param messageArgs Object[]
   * @return ResponseEntity<BaseResponse>
   */
  protected ResponseEntity<BaseResponse> returnBaseResponse(@Nullable Object body,
      MessageEnum messageEnum, Object... messageArgs) {
    BaseResponse baseResponse = new BaseResponse();
    baseResponse.setMessageType(messageEnum.getMessageType());
    baseResponse.setMessageCode(messageEnum.getMessageCode());
    baseResponse.setMessage(MessageFormat.format(messageEnum.getMessage(), messageArgs));
    baseResponse.setBody(body);
    HttpHeaders header = new HttpHeaders();
    header.setContentType(APPLICATION_JSON);
    return new ResponseEntity<>(baseResponse, header, messageEnum.getHttpStatus());
  }

  protected ResponseEntity<BaseResponse> returnErrorBaseResponse(
      WFException WFException) {
    BaseResponse baseResponse = new BaseResponse();
    baseResponse.setMessageType(SERVER_ERROR.getMessageType());
    baseResponse.setMessageCode(SERVER_ERROR.getMessageCode());
    baseResponse.setMessage(SERVER_ERROR.getMessage());
    baseResponse.setErrorList(WFException.getErrorDetail().getErrorMessageList());
    HttpHeaders header = new HttpHeaders();
    header.setContentType(APPLICATION_JSON);
    return new ResponseEntity<>(baseResponse, header,
        WFException.getErrorDetail().getHttpStatus());
  }

  protected ResponseEntity<BaseResponse> returnErrorBaseResponse(Throwable exception,
      HttpStatus httpStatus) {
    BaseResponse baseResponse = new BaseResponse();
    baseResponse.setMessageType(SERVER_ERROR.getMessageType());
    baseResponse.setMessageCode(SERVER_ERROR.getMessageCode());
    baseResponse.setMessage(SERVER_ERROR.getMessage());
    baseResponse.setErrorList(null);
    HttpHeaders header = new HttpHeaders();
    header.setContentType(APPLICATION_JSON);
    return new ResponseEntity<>(baseResponse, header, httpStatus);
  }

}

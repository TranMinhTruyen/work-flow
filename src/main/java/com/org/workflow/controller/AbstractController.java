package com.org.workflow.controller;

import java.text.MessageFormat;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.org.workflow.common.enums.MessageEnum;
import com.org.workflow.controller.reponse.BaseResponse;

import jakarta.annotation.Nullable;

@CrossOrigin
public abstract class AbstractController {

  /**
   * @param body       Object
   * @param message    String
   * @param httpStatus HttpStatus
   * @return BaseResponse
   */
  protected ResponseEntity<BaseResponse> returnBaseResponse(@Nullable Object body,
      @Nullable String message, HttpStatus httpStatus) {
    BaseResponse baseResponse = new BaseResponse();
    baseResponse.setMessage(message);
    baseResponse.setBody(body);
    HttpHeaders header = new HttpHeaders();
    header.setContentType(APPLICATION_JSON);
    return new ResponseEntity<>(baseResponse, header, httpStatus);
  }

  /**
   * @param body        Object
   * @param messageEnum MessageEnum
   * @param args        Object
   * @return BaseResponse
   */
  protected ResponseEntity<BaseResponse> returnBaseResponse(@Nullable Object body,
      MessageEnum messageEnum, Object... args) {
    BaseResponse baseResponse = new BaseResponse();
    baseResponse.setMessage(MessageFormat.format(messageEnum.getMessage(), args));
    baseResponse.setBody(body);
    HttpHeaders header = new HttpHeaders();
    header.setContentType(APPLICATION_JSON);
    return new ResponseEntity<>(baseResponse, header, messageEnum.getHttpStatus());
  }

}

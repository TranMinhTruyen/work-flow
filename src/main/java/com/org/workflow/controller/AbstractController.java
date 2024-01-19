package com.org.workflow.controller;

import static org.springframework.http.MediaType.APPLICATION_JSON;

import com.org.workflow.common.cnst.CoreConst;
import com.org.workflow.controller.reponse.BaseResponse;
import jakarta.annotation.Nullable;
import lombok.NonNull;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin
@RequestMapping(path = CoreConst.API_PREFIX)
public abstract class AbstractController {

  /**
   * @param body       Object
   * @param message    String
   * @param httpStatus HttpStatus
   * @return BaseResponse
   */
  protected ResponseEntity<BaseResponse> returnBaseResponse(@Nullable Object body,
      @Nullable String message, @NonNull HttpStatus httpStatus) {
    BaseResponse baseResponse = new BaseResponse();
    baseResponse.setMessage(message);
    baseResponse.setBody(body);
    HttpHeaders header = new HttpHeaders();
    header.setContentType(APPLICATION_JSON);
    return new ResponseEntity<>(baseResponse, header, httpStatus);
  }

}

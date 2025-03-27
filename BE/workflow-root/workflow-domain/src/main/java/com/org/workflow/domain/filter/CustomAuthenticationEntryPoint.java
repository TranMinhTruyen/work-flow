package com.org.workflow.domain.filter;

import java.io.IOException;

import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.org.workflow.core.common.enums.MessageEnum;
import com.org.workflow.core.common.enums.MessageTypeEnum;
import com.org.workflow.core.common.exception.WFException;
import com.org.workflow.domain.dto.response.common.BaseResponse;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response,
      AuthenticationException authException) throws IOException {
    WFException cause = (WFException) authException.getCause();
    ObjectMapper objectMapper = new ObjectMapper();
    BaseResponse baseResponse = new BaseResponse();
    baseResponse.setMessageType(MessageTypeEnum.ERROR);
    if (cause != null) {
      baseResponse.setMessageCode(cause.getMessageCode());
      baseResponse.setMessage(cause.getMessage());
      baseResponse.setErrorList(cause.getErrorDetail());
    }
    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
    response.setStatus(MessageEnum.ACCESS_DENIED.getHttpStatus().value());
    response.getWriter().write(objectMapper.writeValueAsString(baseResponse));
  }

}

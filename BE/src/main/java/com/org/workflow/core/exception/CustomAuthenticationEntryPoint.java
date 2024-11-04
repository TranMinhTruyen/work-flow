package com.org.workflow.core.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.org.workflow.controller.reponse.BaseResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response,
      AuthenticationException authException) throws IOException {
    ObjectMapper objectMapper = new ObjectMapper();
    BaseResponse baseResponse = new BaseResponse();
    baseResponse.setMessage("Access denied");
    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
    response.setStatus(HttpStatus.UNAUTHORIZED.value());
    response.getWriter().write(objectMapper.writeValueAsString(baseResponse));
  }

}

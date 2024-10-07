package com.org.workflow.core.exception;

import static com.org.workflow.common.cnst.CommonConst.CLASS_NAME;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.org.workflow.controller.reponse.BaseResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response,
    AuthenticationException authException) throws IOException, ServletException {
    ObjectMapper objectMapper = new ObjectMapper();
    BaseResponse baseResponse = new BaseResponse();

    if (authException.getStackTrace() != null && Arrays.stream(authException.getStackTrace())
      .findAny().isPresent()) {
      List<StackTrace> stackTraceList = new ArrayList<>();
      StackTrace stackTrace;
      for (StackTraceElement item : authException.getStackTrace()) {
        if (item.getClassName().contains(CLASS_NAME)) {
          stackTrace = new StackTrace();
          stackTrace.setMethodName(item.getMethodName());
          stackTrace.setClassName(item.getClassName());
          stackTrace.setLineNumber(item.getLineNumber());
          stackTraceList.add(stackTrace);
        }
      }
      baseResponse.setBody(stackTraceList);
    }
    baseResponse.setMessage("Access denied");
    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
    response.setStatus(HttpStatus.UNAUTHORIZED.value());
    response.getWriter().write(objectMapper.writeValueAsString(baseResponse));
  }

}

package com.org.workflow.core.security;

import static com.org.workflow.common.utils.CommonUtil.getLanguageFromRequest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.org.workflow.core.exception.WorkFlowException;
import com.org.workflow.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * @author minh-truyen
 */
@Component
public class JwtFilter extends OncePerRequestFilter {

  private final JwtProvider jwtProvider;

  private final UserService userService;

  private final ObjectMapper objectMapper;

  public JwtFilter(JwtProvider jwtProvider, UserService userService,
      ObjectMapper objectMapper) {
    this.jwtProvider = jwtProvider;
    this.userService = userService;
    this.objectMapper = objectMapper;
  }

  /**
   * Filter when request.
   *
   * @param request     HttpServletRequest
   * @param response    HttpServletResponse
   * @param filterChain FilterChain
   */
  @Override
  public void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    String token = getJwtFromRequest(request);

    if (!StringUtils.isBlank(token) && jwtProvider.validateToken(token)) {
      String language = getLanguageFromRequest(request, objectMapper);
      String username = jwtProvider.getUserNameFromToken(token);
      try {
        CustomUserDetail customUserDetail = userService.loadByUserName(username, language);
        if (customUserDetail.isEnabled()) {
          UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
              customUserDetail, null, customUserDetail.getAuthorities());
          authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
          SecurityContextHolder.getContext().setAuthentication(authentication);
        }
      } catch (WorkFlowException e) {
        SecurityContextHolder.clearContext();
        response.setStatus(HttpStatus.NOT_ACCEPTABLE.value());
      }
    }
    filterChain.doFilter(request, response);
  }

  /**
   * Get Jwt from request header.
   *
   * @param request HttpServletRequest
   * @return String
   */
  public String getJwtFromRequest(HttpServletRequest request) {
    String bearerToken = request.getHeader(HttpHeaders.AUTHORIZATION);
    if (!StringUtils.isBlank(bearerToken) && bearerToken.startsWith("Bearer ")) {
      return bearerToken.substring(7);
    }
    return null;
  }

}

package com.org.workflow.domain.filter;

import com.org.workflow.core.common.exception.WFException;
import com.org.workflow.domain.dto.common.CustomUserDetail;
import com.org.workflow.domain.services.UserService;
import com.org.workflow.domain.utils.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * @author minh-truyen
 */
public class SecurityFilter extends OncePerRequestFilter {


  @Autowired
  private UserService userService;


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

    if (!StringUtils.isBlank(token) && JwtUtil.validateToken(token)) {
      String language = "en";
      String username = JwtUtil.getUserNameFromToken(token);
      try {
        CustomUserDetail customUserDetail = userService.loadByUserName(username, language);
        if (customUserDetail.isEnabled()) {
          UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
              customUserDetail, null, customUserDetail.getAuthorities());
          authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
          SecurityContextHolder.getContext().setAuthentication(authentication);
        }
      } catch (WFException e) {
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

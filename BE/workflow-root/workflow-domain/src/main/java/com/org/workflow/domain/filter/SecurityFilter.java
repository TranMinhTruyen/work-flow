package com.org.workflow.domain.filter;

import static com.org.workflow.core.common.enums.MessageEnum.ACCESS_DENIED;
import static com.org.workflow.core.common.enums.MessageEnum.SESSION_TIME_OUT;

import java.io.IOException;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.org.workflow.core.common.exception.WFAuthenticationException;
import com.org.workflow.core.common.exception.WFException;
import com.org.workflow.dao.document.UserAccount;
import com.org.workflow.domain.dto.common.CustomUserDetail;
import com.org.workflow.domain.services.UserService;
import com.org.workflow.domain.utils.JwtUtil;

import io.jsonwebtoken.Claims;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * @author minh-truyen
 */
@Component
public class SecurityFilter extends OncePerRequestFilter {

  @Autowired
  private UserService userService;

  @Autowired
  private CustomAuthenticationEntryPoint authenticationEntryPoint;

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

    try {
      if (!StringUtils.isBlank(token)) {
        if (JwtUtil.validateToken(token)) {
          Claims claims = JwtUtil.extractClaims(token).getPayload();
          UserAccount userAccount = userService.loadByUserName((String) claims.get("userName"));
          if (userAccount != null && userAccount.isActive()) {
            CustomUserDetail customUserDetail = new CustomUserDetail(userAccount);
            UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(customUserDetail, null,
                    customUserDetail.getAuthorities());
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);
          } else {
            throw new WFException(ACCESS_DENIED);
          }
        } else {
          throw new WFException(SESSION_TIME_OUT);
        }
      }
    } catch (WFException e) {
      authenticationEntryPoint.commence(request, response,
          new WFAuthenticationException(e.getMessageCode(), e));
      return;
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

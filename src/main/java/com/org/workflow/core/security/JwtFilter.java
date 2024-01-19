package com.org.workflow.core.security;

import com.org.workflow.core.exception.AppException;
import com.org.workflow.service.AppUserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

public class JwtFilter extends OncePerRequestFilter {

  @Autowired
  private JwtProvider jwtProvider;

  @Autowired
  private AppUserService appUserService;

  @Override
  public void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    String token = getJwtFromRequest(request);
    if (!StringUtils.isBlank(token) && jwtProvider.validateToken(token)) {
      String username = jwtProvider.getUserNameFromToken(token);
      try {
        AppUserDetail appUserDetail = appUserService.loadByUserName(username);
        if (appUserDetail.isEnabled()) {
          UsernamePasswordAuthenticationToken authentication =
              new UsernamePasswordAuthenticationToken(appUserDetail, null,
                  appUserDetail.getAuthorities());
          authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
          SecurityContextHolder.getContext().setAuthentication(authentication);
        }
      } catch (AppException e) {
        SecurityContextHolder.clearContext();
      }
    }
    filterChain.doFilter(request, response);
  }

  public String getJwtFromRequest(HttpServletRequest request) {
    String bearerToken = request.getHeader(HttpHeaders.AUTHORIZATION);
    if (!StringUtils.isBlank(bearerToken) && bearerToken.startsWith("Bearer ")) {
      return bearerToken.substring(7);
    }
    return null;
  }

}

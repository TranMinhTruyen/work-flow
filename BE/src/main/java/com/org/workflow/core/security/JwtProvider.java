package com.org.workflow.core.security;

import com.org.workflow.common.cnst.CommonConst;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class JwtProvider {

  private static final Logger LOGGER = LoggerFactory.getLogger(JwtProvider.class);

  public String generateAccessToken(CustomUserDetail userDetail, boolean isRemember) {
    long now = (new Date()).getTime();
    Date expiryDate;
    if (!isRemember) {
      expiryDate = new Date(now + CommonConst.EXPIRATIONTIME);
    } else {
      expiryDate = new Date(now + CommonConst.EXPIRATIONTIME_FOR_REMEMBER);
    }
    Claims claims = Jwts.claims()
        .id(userDetail.getUserAccount().getUserId())
        .subject(userDetail.getUsername())
        .audience()
        .and()
        .expiration(expiryDate)
        .build();
    return Jwts.builder().claims(claims).issuedAt(new Date()).expiration(expiryDate)
        .signWith(getSigningKey()).compact();
  }

  public String getUserNameFromToken(String token) {
    return extractClaims(token).getPayload().getSubject();
  }

  private Jws<Claims> extractClaims(String token) {
    return Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(token);
  }

  private SecretKey getSigningKey() {
    return Keys.hmacShaKeyFor(
        CommonConst.ACCESS_TOKEN_SECRET_KEY.getBytes(StandardCharsets.UTF_16));
  }

  public boolean validateToken(String token) {
    try {
      Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(token);
      return true;
    } catch (JwtException ex) {
      LOGGER.error("Invalid JWT token");
    } catch (IllegalArgumentException ex) {
      LOGGER.error("JWT claims string is empty.");
    }
    return false;
  }

}

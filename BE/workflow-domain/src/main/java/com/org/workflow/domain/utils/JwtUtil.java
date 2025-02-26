package com.org.workflow.domain.utils;

import com.org.workflow.core.common.cnst.CommonConst;
import com.org.workflow.domain.dto.common.CustomUserDetail;
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


public class JwtUtil {

  private static final Logger LOGGER = LoggerFactory.getLogger(JwtUtil.class);


  public static String generateAccessToken(CustomUserDetail userDetail, boolean isRemember) {
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


  private static SecretKey getSigningKey() {
    return Keys.hmacShaKeyFor(
        CommonConst.ACCESS_TOKEN_SECRET_KEY.getBytes(StandardCharsets.UTF_16));
  }


  public static boolean validateToken(String token) {
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


  public static String getUserNameFromToken(String token) {
    return extractClaims(token).getPayload().getSubject();
  }


  private static Jws<Claims> extractClaims(String token) {
    return Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(token);
  }

}

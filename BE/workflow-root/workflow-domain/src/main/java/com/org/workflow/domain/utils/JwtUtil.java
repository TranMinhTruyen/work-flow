package com.org.workflow.domain.utils;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.org.workflow.core.common.cnst.CommonConst;
import com.org.workflow.domain.dto.common.CustomUserDetail;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;


public class JwtUtil {

  private static final Logger LOGGER = LogManager.getLogger(JwtUtil.class);


  public static String generateAccessToken(CustomUserDetail userDetail, boolean isRemember) {
    long now = (new Date()).getTime();
    Date expiryDate;
    if (!isRemember) {
      expiryDate = new Date(now + CommonConst.EXPIRATION_TIME);
    } else {
      expiryDate = new Date(now + CommonConst.EXPIRATION_TIME_FOR_REMEMBER);
    }
    Map<String, Object> claims = new HashMap<>();
    claims.put("userName", userDetail.getUserAccount().getUserName());
    return Jwts.builder().claims(claims).subject(userDetail.getUsername()).issuedAt(new Date())
        .expiration(expiryDate).signWith(getSigningKey()).compact();
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


  public static Jws<Claims> extractClaims(String token) {
    return Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(token);
  }

}

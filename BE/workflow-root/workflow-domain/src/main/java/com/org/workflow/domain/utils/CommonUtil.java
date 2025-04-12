package com.org.workflow.domain.utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.org.workflow.domain.dto.request.common.BaseRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolation;
import org.springframework.validation.FieldError;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author minh-truyen
 */
public class CommonUtil {

  private CommonUtil() {
  }

  /**
   * Get language from payload.
   *
   * @param request HttpServletRequest
   * @return String
   */
  public static String getLanguageFromRequest(HttpServletRequest request) {
    StringBuilder stringBuilder = new StringBuilder();
    try {
      BufferedReader bufferedReader = new BufferedReader(
          new InputStreamReader(request.getInputStream(), StandardCharsets.UTF_8));
      String line;
      while ((line = bufferedReader.readLine()) != null) {
        stringBuilder.append(line);
      }
      ObjectMapper mapper = new ObjectMapper();
      JsonNode jsonNode = mapper.readTree(stringBuilder.toString());

      return jsonNode.has("language") ? jsonNode.get("language").asText() : "en";
    } catch (Exception e) {
      return "en";
    }
  }


  /**
   * Get language from payload.
   *
   * @param target Object
   * @return String
   */
  public static String getLanguageFromRequest(Object target) {
    try {
      if (target instanceof BaseRequest<?> baseRequest) {
        return baseRequest.getLanguage();
      }
      return "en";
    } catch (Exception e) {
      return "en";
    }
  }


  /**
   * @param error
   * @return
   */
  public static Map<String, Object> getAttributes(FieldError error) {
    Map<String, Object> attributes;
    error.unwrap(ConstraintViolation.class);
    ConstraintViolation<?> violation = error.unwrap(ConstraintViolation.class);

    attributes = violation.getConstraintDescriptor().getAttributes();

    // exclude attribute
    List<String> keyToRemove = List.of("message", "groups", "payload");

    attributes = attributes.entrySet().stream()
        .filter(item -> !keyToRemove.contains(item.getKey()))
        .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

    return attributes;
  }

}

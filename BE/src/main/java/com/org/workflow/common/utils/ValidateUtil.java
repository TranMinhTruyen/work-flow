package com.org.workflow.common.utils;

import jakarta.annotation.Nullable;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import org.springframework.context.MessageSource;

/**
 * @author minh-truyen
 */
public class ValidateUtil {

  private ValidateUtil() {
  }

  /**
   * Get field name and field value from validate annotation.
   *
   * @param fieldName       String
   * @param messageId       String
   * @param errorAttributes Map<String, Object>
   * @param messageSource   MessageSource
   * @param locale          Locale
   * @return String
   */
  public static String formatValidateMessage(String fieldName, @Nullable String messageId,
      Map<String, Object> errorAttributes,
      MessageSource messageSource, Locale locale) {
    if (messageId == null) {
      return "";
    }

    // Format message from messageId and return
    switch (messageId) {
      // Check length validate
      case "V0001":
        String minLength = errorAttributes.get("minLength").toString();
        String maxLength = errorAttributes.get("maxLength").toString();
        return messageSource.getMessage(
            Objects.requireNonNull(messageId),
            new Object[]{fieldName, minLength, maxLength},
            locale);
      case "V0002":
        return "V0002";
      default:
        return "";
    }
  }

}

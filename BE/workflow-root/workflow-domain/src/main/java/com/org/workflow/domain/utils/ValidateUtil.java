package com.org.workflow.domain.utils;

import java.util.Locale;
import java.util.Map;

import org.springframework.context.MessageSource;

import com.org.workflow.core.common.enums.ValidateEnum;

import jakarta.annotation.Nullable;

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
  public static String formatValidateMessage(String fieldName, @Nullable ValidateEnum messageId,
      Map<String, Object> errorAttributes, MessageSource messageSource, Locale locale) {
    if (messageId == null) {
      return "";
    }

    // Format message from messageId and return

    return switch (messageId) {
      case REQUIRED_VALIDATE:
        yield messageSource.getMessage(ValidateEnum.REQUIRED_VALIDATE.getMessageCode(),
            new Object[] {fieldName}, locale);
      case ValidateEnum.MIN_MAX_VALIDATE:
        String minLength = errorAttributes.get("minLength").toString();
        String maxLength = errorAttributes.get("maxLength").toString();
        yield messageSource.getMessage(ValidateEnum.MIN_MAX_VALIDATE.getMessageCode(),
            new Object[] {fieldName, minLength, maxLength}, locale);
      case ValidateEnum.NUMBER_VALIDATE:
        yield messageSource.getMessage(ValidateEnum.NUMBER_VALIDATE.getMessageCode(),
            new Object[] {fieldName}, locale);
      case DECIMAL_VALIDATE:
        yield null;
      case MAX_NUMBER_VALIDATE:
        yield null;
      case MAX_DECIMAL_VALIDATE:
        yield null;
    };
  }

}

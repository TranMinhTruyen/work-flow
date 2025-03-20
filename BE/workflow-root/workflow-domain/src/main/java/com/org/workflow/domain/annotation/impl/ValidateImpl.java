package com.org.workflow.domain.annotation.impl;


import java.math.BigDecimal;

import org.apache.commons.lang3.StringUtils;

import com.org.workflow.core.common.enums.ValidateEnum;
import com.org.workflow.domain.annotation.Validate;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

/**
 * @author minh-truyen
 */
public class ValidateImpl implements ConstraintValidator<Validate, String> {

  private ValidateEnum errorCode;

  private boolean required;

  private int minLength;

  private int maxLength;

  private int numberMax;

  private int decimalPartNumber;

  public static boolean isValidDecimal(String input, int decimalPartNumber) {
    if (input == null || input.isEmpty()) {
      return false;
    }
    if (decimalPartNumber < 1) {
      return input.matches("^[+-]?\\d+$");
    }
    String regex = "^[+-]?\\d+(\\.\\d{" + decimalPartNumber + "})?$";
    return input.matches(regex);
  }

  public static boolean isValidDecimalMax(String input, int decimalPartNumber, int numberMax) {
    if (input == null || input.isEmpty()) {
      return false;
    }

    String regex;
    if (decimalPartNumber < 1) {
      regex = "^[+-]?\\d+$";
    } else {
      regex = "^[+-]?\\d+\\.\\d{" + decimalPartNumber + "}$";
    }

    if (!input.matches(regex)) {
      return false;
    }

    try {
      BigDecimal value = new BigDecimal(input);
      BigDecimal max = BigDecimal.valueOf(numberMax);
      return value.compareTo(max) <= 0;
    } catch (NumberFormatException e) {
      return false;
    }
  }

  @Override
  public void initialize(Validate constraintAnnotation) {
    this.errorCode = constraintAnnotation.errorCode();
    this.required = constraintAnnotation.required();
    this.minLength = constraintAnnotation.minLength();
    this.maxLength = constraintAnnotation.maxLength();
    this.numberMax = constraintAnnotation.numberMax();
    this.decimalPartNumber = constraintAnnotation.decimalPartNumber();
  }

  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    context.disableDefaultConstraintViolation();

    boolean valid = switch (errorCode) {
      case REQUIRED_VALIDATE -> {
        if (required) {
          yield !StringUtils.isEmpty(value);
        } else {
          yield true;
        }
      }
      case MIN_MAX_VALIDATE -> value.length() >= this.minLength && value.length() <= this.maxLength;
      case NUMBER_VALIDATE -> isValidDecimal(value, 0);
      case DECIMAL_VALIDATE -> isValidDecimal(value, this.decimalPartNumber);
      case MAX_NUMBER_VALIDATE -> isValidDecimalMax(value, 0, this.numberMax);
      case MAX_DECIMAL_VALIDATE -> isValidDecimalMax(value, this.decimalPartNumber, this.numberMax);
    };

    if (!valid) {
      context.buildConstraintViolationWithTemplate(errorCode.getMessageCode())
          .addConstraintViolation();
    }

    return valid;
  }

}

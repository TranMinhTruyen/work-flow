package com.org.workflow.domain.annotation.impl;


import com.org.workflow.core.common.enums.ValidateEnum;
import com.org.workflow.domain.annotation.Validate;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

/**
 * @author minh-truyen
 */
public class ValidateImpl implements ConstraintValidator<Validate, String> {

  private ValidateEnum errorCode;

  private int maxLength;

  private int minLength;

  private int decimalPartNumber;

  private static boolean isValidNumber(String value) {
    return value.matches("[-+]?\\d*\\.?\\d+");
  }

  public static boolean isValidDecimal(String input, int decimalPartNumber) {
    if (input == null || input.isEmpty() || decimalPartNumber < 1) {
      return false;
    }
    String regex = "^[+-]?\\d+(\\.\\d{" + decimalPartNumber + "})?$";
    return input.matches(regex);
  }

  @Override
  public void initialize(Validate constraintAnnotation) {
    this.maxLength = constraintAnnotation.maxLength();
    this.minLength = constraintAnnotation.minLength();
    this.decimalPartNumber = constraintAnnotation.decimalPartNumber();
    this.errorCode = constraintAnnotation.errorCode();
  }

  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    if (value == null || value.isEmpty()) {
      return false;
    }

    boolean valid = switch (errorCode) {
      case MIN_MAX_VALIDATE -> value.length() >= minLength && value.length() <= maxLength;
      case NUMBER_VALIDATE -> isValidNumber(value);
      case DECIMAL_VALIDATE -> isValidDecimal(value, decimalPartNumber);
    };

    if (!valid) {
      context.disableDefaultConstraintViolation();
      context.buildConstraintViolationWithTemplate(errorCode.getMessageCode())
          .addConstraintViolation();
    }

    return valid;
  }

}

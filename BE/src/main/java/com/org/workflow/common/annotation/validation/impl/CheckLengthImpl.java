package com.org.workflow.common.annotation.validation.impl;

import com.org.workflow.common.annotation.validation.CheckLength;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

/**
 * @author minh-truyen
 */
public class CheckLengthImpl implements ConstraintValidator<CheckLength, String> {

  private int maxLength;

  private int minLength;

  @Override
  public void initialize(CheckLength constraintAnnotation) {
    this.maxLength = constraintAnnotation.maxLength();
    this.minLength = constraintAnnotation.minLength();
  }

  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    if (value == null || value.isEmpty()) {
      return false;
    }

    return value.length() >= minLength && value.length() <= maxLength;
  }

}

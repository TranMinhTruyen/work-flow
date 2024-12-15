package com.org.workflow.common.annotation.validation.impl;

import com.org.workflow.common.annotation.validation.MaxLength;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

/**
 * @author minh-truyen
 */
public class MaxLengthCheck implements ConstraintValidator<MaxLength, String> {

  private int maxLength;

  @Override
  public void initialize(MaxLength constraintAnnotation) {
    this.maxLength = constraintAnnotation.maxLength();
  }

  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    if (value == null || value.isEmpty()) {
      return false;
    }

    return value.length() <= maxLength;
  }
}

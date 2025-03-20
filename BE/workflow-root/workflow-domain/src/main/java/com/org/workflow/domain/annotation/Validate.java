package com.org.workflow.domain.annotation;


import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.org.workflow.core.common.enums.ValidateEnum;
import com.org.workflow.domain.annotation.impl.ValidateImpl;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

/**
 * @author minh-truyen
 */
@Documented
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ValidateImpl.class)
public @interface Validate {

  String message() default "";


  ValidateEnum errorCode() default ValidateEnum.REQUIRED_VALIDATE;


  boolean required() default false;


  int order() default 0;


  int minLength() default 0;


  int maxLength() default Integer.MAX_VALUE;


  int numberMax() default Integer.MAX_VALUE;


  int decimalPartNumber() default 0;


  Class<?>[] groups() default {};


  Class<? extends Payload>[] payload() default {};

}

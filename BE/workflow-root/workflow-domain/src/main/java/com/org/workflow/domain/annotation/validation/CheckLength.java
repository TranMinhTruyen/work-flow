package com.org.workflow.domain.annotation.validation;


import com.org.workflow.domain.annotation.validation.impl.CheckLengthImpl;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @author minh-truyen
 */
@Documented
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = CheckLengthImpl.class)
public @interface CheckLength {

  String message() default "V0001";

  int order() default 0;

  int minLength() default 0;

  int maxLength();

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};

}

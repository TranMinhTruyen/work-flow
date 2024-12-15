package com.org.workflow.common.annotation.validation;

import com.org.workflow.common.annotation.validation.impl.MaxLengthCheck;
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
@Constraint(validatedBy = MaxLengthCheck.class)
public @interface MaxLength {

  String message() default "V0001";

  int maxLength();

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};

}

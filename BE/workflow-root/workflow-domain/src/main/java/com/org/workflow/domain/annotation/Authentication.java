package com.org.workflow.domain.annotation;


import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.org.workflow.core.common.enums.AuthorityEnum;
import com.org.workflow.core.common.enums.LevelEnum;
import com.org.workflow.core.common.enums.RoleEnum;

/**
 * @author minh-truyen
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Authentication {

  RoleEnum[] role() default {};


  AuthorityEnum[] authority() default {};


  LevelEnum level() default LevelEnum.LOW_LEVEL;

}

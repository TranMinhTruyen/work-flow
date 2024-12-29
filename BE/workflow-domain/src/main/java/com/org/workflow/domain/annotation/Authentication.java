package com.org.workflow.domain.annotation;


import com.org.workflow.core.common.enums.AuthorityEnums;
import com.org.workflow.core.common.enums.LevelEnums;
import com.org.workflow.core.common.enums.RoleEnums;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @author minh-truyen
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Authentication {

  RoleEnums role();

  AuthorityEnums authority();

  LevelEnums level();

}

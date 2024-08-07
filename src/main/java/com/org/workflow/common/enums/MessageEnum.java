package com.org.workflow.common.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum MessageEnum {

  //@formatter:off

  ANY_MESSAGE("", "", "{0}", null),

  UTILITY_CLASS("", "", "Utility class", HttpStatus.INTERNAL_SERVER_ERROR),

  NOT_FOUND("ERROR", "E0001", "Not found {0}", HttpStatus.NOT_FOUND),

  REQUEST_SUCCESS("SUCCESS", "S0001", "Success", HttpStatus.OK),

  REQUEST_FAILED("ERROR", "EC001", "{0} failed", HttpStatus.INTERNAL_SERVER_ERROR),

  CREATE_SUCCESS("SUCCESS", "S0002" ,"Create {0} success", HttpStatus.OK),

  GET_SUCCESS("SUCCESS", "S0003", "Get {0} success", HttpStatus.OK),

  UPDATE_FAILED("ERROR", "E0002", "Can't update data because it has been update by another. Please reload page again!", HttpStatus.CONFLICT),

  NEW_PASSWORD_AND_CURRENT_PASSWORD_NOT_EQUAL("ERROR", "E0003", "New password and current password not equal", HttpStatus.BAD_REQUEST),

  USER_NAME_EXISTS("ERROR", "E0004", "Username already exists", HttpStatus.CONFLICT),

  CREATE_USER_ACCOUNT_SUCCESS("SUCCESS", "UA001", "Create username: {0} success!", HttpStatus.OK),


  //@formatter:on
  ;
  private final String messageType;

  private final String messageCode;

  private final String message;

  private final HttpStatus httpStatus;

}

package com.org.workflow.core.common.enums;

import static com.org.workflow.core.common.enums.MessageTypeEnum.ERROR;
import static com.org.workflow.core.common.enums.MessageTypeEnum.INFO;
import static com.org.workflow.core.common.enums.MessageTypeEnum.SUCCESS;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public enum MessageEnum {

  //@formatter:off

  //region COMMON_MESSAGE
  ANY_MESSAGE(INFO, "ANY", null),
  UTILITY_CLASS(ERROR, "UTILITY", HttpStatus.INTERNAL_SERVER_ERROR),
  //endregion
  
  //region COMMON_SUCCESS
  REQUEST_SUCCESS(SUCCESS, "S0001", HttpStatus.OK),
  CREATE_SUCCESS(SUCCESS, "S0002" , HttpStatus.OK),
  GET_SUCCESS(SUCCESS, "S0003", HttpStatus.OK),
  //endregion

  //region COMMON_ERROR
  NOT_FOUND(ERROR, "E0001", HttpStatus.NOT_FOUND),
  UPDATE_FAILED(ERROR, "E0002", HttpStatus.CONFLICT),
  NEW_PASSWORD_AND_CURRENT_PASSWORD_NOT_EQUAL(ERROR, "E0003", HttpStatus.BAD_REQUEST),
  USER_NAME_EXISTS(ERROR, "E0004", HttpStatus.CONFLICT),
  ITEM_MASTER_EXISTS(ERROR, "E0005", HttpStatus.CONFLICT),
  REQUEST_FAILED(ERROR, "E0006", HttpStatus.INTERNAL_SERVER_ERROR),
  AUTHENTICATION_FAILED(ERROR, "E0007", HttpStatus.UNAUTHORIZED),
  VALIDATION_FAILED(ERROR, "E0008", HttpStatus.BAD_REQUEST),
  WRITE_FILE_ERROR(ERROR, "E1000", HttpStatus.INTERNAL_SERVER_ERROR),
  READ_FILE_ERROR(ERROR, "E1001", HttpStatus.INTERNAL_SERVER_ERROR),
  SERVER_ERROR(ERROR, "E9999", HttpStatus.INTERNAL_SERVER_ERROR),
  //endregion

  //region USER_ACCOUNT_SUCCESS
  CREATE_USER_ACCOUNT_SUCCESS(SUCCESS, "UA001", HttpStatus.OK),
  //endregion
  
  //region USER_ACCOUNT_ERROR
  ACCESS_DENIED(ERROR, "EA0000", HttpStatus.UNAUTHORIZED),
  AUTHENTICATION_ERROR(ERROR, "EA001", HttpStatus.UNAUTHORIZED),
  ROLE_ERROR(ERROR, "EA002", HttpStatus.UNAUTHORIZED),
  AUTHORITY_ERROR(ERROR, "EA003", HttpStatus.UNAUTHORIZED),
  LEVEL_ERROR(ERROR, "EA004", HttpStatus.UNAUTHORIZED),
  ACCOUNT_NOT_FOUND(ERROR, "EA005", HttpStatus.NOT_FOUND),
  ACCOUNT_PASSWORD_INVALID(ERROR, "EA006", HttpStatus.UNAUTHORIZED),
  ACCOUNT_INACTIVE(ERROR, "EA007", HttpStatus.UNAUTHORIZED),
  //endregion

  //@formatter:on
  ;

  private final MessageTypeEnum messageType;

  private final String messageCode;

  private final HttpStatus httpStatus;

}

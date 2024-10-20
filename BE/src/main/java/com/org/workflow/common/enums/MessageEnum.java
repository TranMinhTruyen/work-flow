package com.org.workflow.common.enums;

import static com.org.workflow.common.enums.MessageTypeEnum.ERROR;
import static com.org.workflow.common.enums.MessageTypeEnum.INFO;
import static com.org.workflow.common.enums.MessageTypeEnum.SUCCESS;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum MessageEnum {

  //@formatter:off

  //region COMMON_MESSAGE
  ANY_MESSAGE(INFO, "", "{0}", null),
  UTILITY_CLASS(ERROR, "", "Utility class", HttpStatus.INTERNAL_SERVER_ERROR),
  //endregion
  
  //region COMMON_SUCCESS
  REQUEST_SUCCESS(SUCCESS, "S0001", "Success", HttpStatus.OK),
  CREATE_SUCCESS(SUCCESS, "S0002" ,"Create {0} success", HttpStatus.OK),
  GET_SUCCESS(SUCCESS, "S0003", "Get {0} success", HttpStatus.OK),
  //endregion

  //region COMMON_ERROR
  NOT_FOUND(ERROR, "E0001", "Not found {0}", HttpStatus.NOT_FOUND),
  UPDATE_FAILED(ERROR, "E0002", "Can't update data because it has been update by another. Please reload page again!", HttpStatus.CONFLICT),
  NEW_PASSWORD_AND_CURRENT_PASSWORD_NOT_EQUAL(ERROR, "E0003", "New password and current password not equal", HttpStatus.BAD_REQUEST),
  USER_NAME_EXISTS(ERROR, "E0004", "Username already exists", HttpStatus.CONFLICT),
  ITEM_MASTER_EXISTS(ERROR, "E0005", "Item master already exists", HttpStatus.CONFLICT),
  REQUEST_FAILED(ERROR, "E0006", "{0} failed", HttpStatus.INTERNAL_SERVER_ERROR),
  AUTHENTICATION_FAILED(ERROR, "E0007", "Authentication failed", HttpStatus.UNAUTHORIZED),
  WRITE_FILE_ERROR(ERROR, "E1000", "Write file: {0} error!", HttpStatus.INTERNAL_SERVER_ERROR),
  READ_FILE_ERROR(ERROR, "E1001", "Read file: {0} error!", HttpStatus.INTERNAL_SERVER_ERROR),
  SERVER_ERROR(ERROR, "E9999", "Server has error!", HttpStatus.INTERNAL_SERVER_ERROR),
  //endregion

  //region USER_ACCOUNT_SUCCESS
  CREATE_USER_ACCOUNT_SUCCESS(SUCCESS, "UA001", "Create username: {0} success!", HttpStatus.OK),
  //endregion
  
  //region USER_ACCOUNT_ERROR
  AUTHENTICATION_ERROR(ERROR, "EA001", "Authority not found!", HttpStatus.UNAUTHORIZED),
  ROLE_ERROR(ERROR, "EA002", "Role not accept!", HttpStatus.UNAUTHORIZED),
  AUTHORITY_ERROR(ERROR, "EA003", "Authority not accept!", HttpStatus.UNAUTHORIZED),
  LEVEL_ERROR(ERROR, "EA004", "Level not accept!", HttpStatus.UNAUTHORIZED),
  ACCOUNT_NOT_FOUND(ERROR, "EA005", "Username or email [{0}] not found.", HttpStatus.UNAUTHORIZED),
  ACCOUNT_PASSWORD_INVALID(ERROR, "EA006", "Wrong password with username or email [{0}].", HttpStatus.UNAUTHORIZED),
  ACCOUNT_INACTIVE(ERROR, "EA007", "Account is inactive!", HttpStatus.UNAUTHORIZED),
  //endregion

  //@formatter:on
  ;

  private final MessageTypeEnum messageType;

  private final String messageCode;

  private final String message;

  private final HttpStatus httpStatus;

}

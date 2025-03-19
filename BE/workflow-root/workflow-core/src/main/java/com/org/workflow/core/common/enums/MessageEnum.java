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
  REQUEST_SUCCESS(SUCCESS, "S00001", HttpStatus.OK),
  CREATE_SUCCESS(SUCCESS, "S00002" , HttpStatus.OK),
  GET_SUCCESS(SUCCESS, "S00003", HttpStatus.OK),
  //endregion

  //region COMMON_ERROR
  NOT_FOUND(ERROR, "E00001", HttpStatus.NOT_FOUND),
  UPDATE_FAILED(ERROR, "E00002", HttpStatus.CONFLICT),
  NEW_PASSWORD_AND_CURRENT_PASSWORD_NOT_EQUAL(ERROR, "E0003", HttpStatus.BAD_REQUEST),
  USER_NAME_EXISTS(ERROR, "E00004", HttpStatus.BAD_REQUEST),
  ITEM_MASTER_EXISTS(ERROR, "E00005", HttpStatus.BAD_REQUEST),
  REQUEST_FAILED(ERROR, "E00006", HttpStatus.INTERNAL_SERVER_ERROR),
  AUTHENTICATION_FAILED(ERROR, "E00007", HttpStatus.UNAUTHORIZED),
  VALIDATION_FAILED(ERROR, "E00008", HttpStatus.BAD_REQUEST),
  WRITE_FILE_ERROR(ERROR, "E10000", HttpStatus.INTERNAL_SERVER_ERROR),
  READ_FILE_ERROR(ERROR, "E10001", HttpStatus.INTERNAL_SERVER_ERROR),
  SERVER_ERROR(ERROR, "E99999", HttpStatus.INTERNAL_SERVER_ERROR),
  //endregion

  //region USER_ACCOUNT_SUCCESS
  CREATE_USER_ACCOUNT_SUCCESS(SUCCESS, "UA001", HttpStatus.OK),
  //endregion
  
  //region USER_ACCOUNT_ERROR
  ACCESS_DENIED(ERROR, "EA0000", HttpStatus.UNAUTHORIZED),
  AUTHENTICATION_ERROR(ERROR, "EA0001", HttpStatus.UNAUTHORIZED),
  ROLE_ERROR(ERROR, "EA0002", HttpStatus.UNAUTHORIZED),
  AUTHORITY_ERROR(ERROR, "EA0003", HttpStatus.UNAUTHORIZED),
  LEVEL_ERROR(ERROR, "EA0004", HttpStatus.UNAUTHORIZED),
  ACCOUNT_NOT_FOUND(ERROR, "EA0005", HttpStatus.NOT_FOUND),
  ACCOUNT_PASSWORD_INVALID(ERROR, "EA0006", HttpStatus.UNAUTHORIZED),
  ACCOUNT_INACTIVE(ERROR, "EA0007", HttpStatus.UNAUTHORIZED),
  SESSION_TIME_OUT(ERROR, "EA0008", HttpStatus.UNAUTHORIZED),
  //endregion

  //@formatter:on
  ;

  private final MessageTypeEnum messageType;

  private final String messageCode;

  private final HttpStatus httpStatus;

  public static MessageEnum fromMessageCode(String messageCode) {
    for (MessageEnum value : MessageEnum.values()) {
      if (value.getMessageCode().equals(messageCode)) {
        return value;
      }
    }
    return null;
  }

}

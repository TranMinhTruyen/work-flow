package com.org.workflow.domain.dto.reponse.common;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.org.workflow.core.common.enums.MessageTypeEnum;
import com.org.workflow.core.common.exception.ErrorMessage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static com.org.workflow.core.common.cnst.CommonConst.DATE_TIME_FORMAT_PATTERN;
import static com.org.workflow.core.common.cnst.CommonConst.ZONE_ID;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonPropertyOrder(value = {"timestamp", "messageType", "messageCode", "message", "errorList",
    "body"})
public class BaseResponse implements Serializable {

  private final String timestamp = DateTimeFormatter.ofPattern(DATE_TIME_FORMAT_PATTERN)
      .format(ZonedDateTime.of(LocalDateTime.now(), ZoneId.of(ZONE_ID)));

  private MessageTypeEnum messageType;

  private String messageCode;

  private String message;

  private List<ErrorMessage> errorList;

  private transient Object body;

}

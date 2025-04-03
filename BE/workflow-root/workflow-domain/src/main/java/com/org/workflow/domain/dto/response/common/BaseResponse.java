package com.org.workflow.domain.dto.response.common;

import static com.org.workflow.core.common.cnst.CommonConst.FULL_DATE_TIME_FORMAT_PATTERN;
import static com.org.workflow.core.common.cnst.CommonConst.ZONE_ID;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.org.workflow.core.common.enums.MessageTypeEnum;
import com.org.workflow.core.common.exception.ErrorMessage;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonPropertyOrder(
    value = {"timestamp", "messageType", "messageCode", "message", "errorList", "body"})
public class BaseResponse implements Serializable {

  @JsonFormat(pattern = FULL_DATE_TIME_FORMAT_PATTERN, timezone = ZONE_ID)
  private final String timestamp = DateTimeFormatter.ofPattern(FULL_DATE_TIME_FORMAT_PATTERN)
      .format(ZonedDateTime.of(LocalDateTime.now(), ZoneId.of(ZONE_ID)));

  private MessageTypeEnum messageType;

  private String messageCode;

  private String message;

  private List<ErrorMessage> errorList;

  private transient Object body;

}

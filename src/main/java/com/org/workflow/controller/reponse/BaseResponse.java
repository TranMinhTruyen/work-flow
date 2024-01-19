package com.org.workflow.controller.reponse;

import static com.org.workflow.common.cnst.CommonConst.DATE_TIME_FORMAT_PATTERN;
import static com.org.workflow.common.cnst.CommonConst.ZONE_ID;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.annotation.Nullable;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatusCode;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonPropertyOrder(value = {"status", "timestamp", "message", "body"})
public class BaseResponse implements Serializable {

  private HttpStatusCode status;

  private final String timestamp = DateTimeFormatter.ofPattern(DATE_TIME_FORMAT_PATTERN)
      .format(ZonedDateTime.of(LocalDateTime.now(), ZoneId.of(ZONE_ID)));

  private String message;

  @Nullable
  private Object body;

}

package com.org.workflow.controller.reponse;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatusCode;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

import static com.org.workflow.common.cnst.CommonCnst.DATE_TIME_FORMAT_PATTERN;
import static com.org.workflow.common.cnst.CommonCnst.ZONE_ID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonPropertyOrder(value = {
    "status",
    "timestamp",
    "message",
    "body"
})
public class BaseResponse implements Serializable {
  private HttpStatusCode status;
  private String timestamp = DateTimeFormatter.ofPattern(DATE_TIME_FORMAT_PATTERN)
      .format(ZonedDateTime.of(LocalDateTime.now(), ZoneId.of(ZONE_ID)));
  private String message;
  @Nullable
  private Object body;
}
